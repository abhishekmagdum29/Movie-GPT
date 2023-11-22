import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  let email = useRef(null);
  let password = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormValidation = () => {
    let message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a09bb938-2d90-42ae-986e-5a3e4abf9e77/8eb1e781-3494-4aa4-9405-268ca6473e4c/IN-en-20231113-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>

      <form
        className="absolute w-[28%] p-12 mx-auto my-32 right-0 left-0 bg-black text-white bg-opacity-80 rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            type="text"
            placeholder="Enter name"
            className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
        />
        <p className="text-red-600 ">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-600 w-full rounded-md"
          onClick={handleFormValidation}
        >
          {isSignIn ? "Sign in" : "Sign Up "}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New to Netflix? Sign Up now"
            : "Already registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
