import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      published
      title
      genres
    }
  }
`;

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const handleGenre = (g) => {
    setGenre(g);
  };

  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  } else if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;

  console.log(books);

  const genres = books
    .map((b) => b.genres)
    .flat()
    .filter(
      (genre, index, self) => genre !== "" && self.indexOf(genre) === index
    );

  const filteredBooks = genre
    ? books.filter((b) => b.genres.includes(genre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => handleGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => handleGenre(null)}>Show all genres</button>
    </div>
  );
};

export default Books;
