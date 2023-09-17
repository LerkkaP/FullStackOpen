import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";

const ALL_GENRES = gql`
  query {
    allGenres
  }
`;

const BOOKS_BY_GENRE = gql`
  query BooksByGenre($genre: String!) {
    booksByGenre(genre: $genre) {
      author {
        name
      }
      published
      title
    }
  }
`;

const Books = (props) => {
  const [genre, setGenre] = useState("all");

  const handleGenre = (g) => {
    setGenre(g);
  };

  const client = useApolloClient();

  const cacheContent = client.cache.extract();
  console.log("Cache Content:", cacheContent);

  const { loading, error, data } = useQuery(ALL_GENRES);

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  });

  if (!props.show) {
    return null;
  } else if (loading || booksLoading) {
    return <div>Loading...</div>;
  } else if (error || booksError) {
    return (
      <div>
        Error fetching books: {error ? error.message : booksError.message}
      </div>
    );
  }

  const genres = data.allGenres;

  const books = genre ? booksData.booksByGenre : [];

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => handleGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => handleGenre("all")}>Show all genres</button>
      </div>
    </div>
  );
};

export default Books;
