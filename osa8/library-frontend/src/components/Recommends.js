import { gql, useQuery } from "@apollo/client";
import { FAVORITE_GENRE } from "../queries";

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

const Recommends = (props) => {
  const favoriteGenreResult = useQuery(FAVORITE_GENRE);
  const allBooksResult = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  } else if (favoriteGenreResult.loading || allBooksResult.loading) {
    return <div>Loading...</div>;
  }

  const favoriteGenre = favoriteGenreResult.data.me.favoriteGenre;
  const books = allBooksResult.data.allBooks;
  console.log(books);

  const recommendedBooks = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <b>{favoriteGenre}</b>:
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommends;
