import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoints from "../apiConfig.ts";
import { useAuth } from "../AuthContext.tsx";

const Home = () => {
  const { login, loggedIn } = useAuth();
  // const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // useEffect(() => {
  //   const token: String | null = localStorage.getItem("token");
  //   if (token) {
  //     setLoggedIn(true);
  //   }
  // }, []);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await axios.post(`${endpoints.user}/login`, {
        email,
        password,
      });
      login(response.data.token, response.data.user.role);
      console.log("Login attempted with email:", email);
    } catch (error) {
      console.log("Error logging in", error);
    }

    // axios
    //   .post(`${endpoints.user}/login`, {
    //     email: email,
    //     password: password,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setLoggedIn(true);
    //     localStorage.setItem("token", response.data.token);
    //   })
    //   .catch((error) => {
    //     console.error("Error logging in", error);
    //   });
  };

  // Käyttöliittymä
  return (
    <div className="px-10 py-5">
      {loggedIn ? ( // Tarkistetaan onko käyttäjä kirjautunut sisään
        <div>
          <h1>Home page</h1>
          <p>Welcome to the home page</p>
        </div>
      ) : (
        // Jos käyttäjä ei ole kirjautunut sisään, näytetään kirjautumislomake
        <div className="flex flex-col w-auto max-w-sm m-10 py-4 px-8 rounded-3xl shadow-lg shadow-black font-semibold border border-black border-4 bg-neutral-300">
          <p className="text-center text-xl pb-1 border-black border-b-2">
            Login
          </p>
          <form onSubmit={loginHandler}>
            <div className="p-3">
              <label htmlFor="email">Email</label>
              <input
                className="w-full"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="px-3 pb-6">
              <label htmlFor="password">Password</label>
              <input
                className="w-full"
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button
              className="w-full bg-neutral-500 hover:bg-amber-500 hover:text-black text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out"
              type="submit" >
              Login
            </button>
          </form>

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
      )}
    </div>
  );
};

export default Home;
