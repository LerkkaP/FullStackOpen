const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
        query.genres = { $in: [args.genre] };
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
    me: (root, args, context) => {
      return context.currentUser;
    },
    booksByGenre: async (root, args) => {
      if (args.genre === "all") {
        return await Book.find({}).populate("author");
      }

      return await Book.find({ genres: { $in: [args.genre] } }).populate(
        "author"
      );
    },
    allGenres: async () => {
      const books = await Book.find({});
      const genres = [...new Set(books.flatMap((book) => book.genres))];
      return genres;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Authentication required", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
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
      pubsub.publish("bookAdded", { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Authentication required", {
          extensions: {
            code: "UNAUTHORIZED",
          },
        });
      }
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
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          code: "BAD_USER_INPUT",
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["bookAdded"]),
    },
  },
};

module.exports = resolvers;
