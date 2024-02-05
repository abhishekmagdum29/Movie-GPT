import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firabase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { profileImage_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  let myName = useRef(null);
  let email = useRef(null);
  let password = useRef(null);

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormValidation = () => {
    let message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return null;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: myName.current.value,
            photoURL: profileImage_URL,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Login
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className=" bg-[url('/assets/bg.jpg')] h-screen">
      <Header />

      <div className="bg-black h-full opacity-[0.5] "></div>

      <form
        className="absolute -top-[40px] w-[90%] md:w-[28%] p-8 md:p-12 mx-auto my-24 md:my-32 right-0 left-0 bg-black text-white bg-opacity-[0.65] rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-2xl md:text-3xl py-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={myName}
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
        {errorMessage ? (
          <p className="text-red-600 font-medium">{errorMessage}</p>
        ) : (
          <p className="text-[#c1c0c0] font-semibold text-[13px] ml-2">
            ( password must be of 8 characters. must include
            uppercase,lowercase,special char & number )
          </p>
        )}

        <button
          className="p-4 my-6 text-lg bg-red-600 cursor-pointer w-full rounded-md transition delay-150 hover:bg-red-700 duration-200"
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
