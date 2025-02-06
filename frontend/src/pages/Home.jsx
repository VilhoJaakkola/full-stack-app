import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

import { endpoints } from "../apiConfig";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // lisättu useEffect
  useEffect(() => {
    // Make a GET request to the backend
    // axios
    //   .get("http://localhost:5000/api/driver")
    //   .then((response) => {
    //     setDriver(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data from backend", error);
    //   });
  }, []);

  const loginHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios
      .post(`${endpoints.user}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setLoggedIn(true);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error("Error logging in", error);
      });

  }

  return (
    <>
      <div className="container">
        {loggedIn && <h1>Home page</h1>}
        {loggedIn && <p>Welcome to the home page</p>}

        <div>
          {!loggedIn && <p className="login-text">Login</p>}
          {!loggedIn && <form onSubmit={loginHandler} className="login-form">
            <label htmlFor="email" className="email-label">Email</label>
            <input type="email" id="email" name="email" required  className="email-input"/>
            <label htmlFor="password" className="password-label">Password</label>
            <input type="password" id="password" name="password" required className="password-input"/>
            <button type="submit" className="login-button">Login</button>
          </form>}
          {/* <h2>Driver List</h2>
        {driver.length > 0 ? (
          <ul>
            {driver.map((driver) => (
              <li key={driver._id}>
                <p>Name: {driver.firstName + " " + driver.lastName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading driver data...</p>
        )} */}
        </div>
      </div>
    </>
  );
};

export default Home;
