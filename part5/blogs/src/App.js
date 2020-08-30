import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      console.log("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    window.localStorage.setItem("credentials", JSON.stringify(user));
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("credentials");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginDisplay = () => {
    return (
      <>
        <h1>Log into app</h1>
        <form onSubmit={(event) => handleLogin(event)}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => updateUsername(event)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => updatePassword(event)}
            />
          </label>
          <br />
          <button type="submit">login </button>
        </form>
      </>
    );
  };

  const blogDisplay = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return <>{user == null ? loginDisplay() : blogDisplay()}</>;
};

export default App;
