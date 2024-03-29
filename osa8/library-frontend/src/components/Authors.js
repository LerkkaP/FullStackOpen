import { useQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

import { useState } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const edit = async (event) => {
    event.preventDefault();

    changeAuthor({
      variables: { name, setBornTo: parseInt(born) },
    });

    setName("");
    setBorn("");
  };

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  } else if (result.loading) {
    return <div>Loading...</div>;
  }
  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={edit}>
        <div>
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
          <div>
            born
            <input
              type="number"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  );
};

export default Authors;
