const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const { GraphQLError } = require("graphql");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }



  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          query.author = author._id;
        } else {
          return [];
        }
      }
      if (args.genre) {
        query.genres = args.genre;
      }

      return await Book.find(query).populate("author");
    },
    allAuthors: async () => {
      try {
        const authors = await Author.find({});
        const authorIds = authors.map((author) => author._id);

        const books = await Book.find({ author: { $in: authorIds } });

        return authors.map((author) => {
          const bookCount = books.filter((book) =>
            book.author.equals(author._id)
          ).length;
          return {
            name: author.name,
            born: author.born,
            bookCount: bookCount,
          };
        });
      } catch (error) {
        console.error("Error fetching authors:", error);
        throw new Error("Could not fetch authors.");
      }
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const existingBook = await Book.findOne({ title: args.title });

      if (existingBook) {
        throw new GraphQLError("Title must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const existingAuthor = await Author.findOne({ name: args.author });

      if (existingAuthor) {
        throw new GraphQLError("Author's name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (args.title.length < 5) {
        throw new GraphQLError("Title must have at least 5 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.author.length < 4) {
        throw new GraphQLError(
          "Author's name must have at least 4 characters",
          {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          }
        );
      }

      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
        author = newAuthor;
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres,
      });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name });

        if (!author) {
          return null;
        }

        author.born = args.setBornTo;
        await author.save();

        return author;
      } catch (error) {
        console.error("Error editing author:", error);
        throw new Error("Could not edit author.");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
