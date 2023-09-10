import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      published
      title
    }
  }
`;

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  if (!props.show) {
    return null;
  } else if (result.loading) {
    return <div>Loading...</div>;
  }

  const books = result.data.allBooks;
  console.log(books);
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
