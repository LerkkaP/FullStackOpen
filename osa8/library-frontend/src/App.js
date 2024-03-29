import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommends from "./components/Recommends";
import { useApolloClient } from "@apollo/client";

import { useEffect } from "react";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("user-token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>Login</button>
        </div>
        <Authors show={page === "authors"} />

        <Books show={page === "books"} />

        {page === "login" && (
          <LoginForm setToken={setToken} show={page === "login"} />
        )}
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommends show={page === "recommend"} />
    </div>
  );
};

export default App;
