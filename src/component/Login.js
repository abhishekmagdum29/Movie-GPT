import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../utils/firabase";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/redux/userSlice";
import { profileImage_URL } from "../utils/constants";
import language from "../utils/languageConstants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  let myName = useRef(null);
  let email = useRef(null);
  let password = useRef(null);

  const languageKey = useSelector((store) => store?.config?.lang);

  const googleProvider = new GoogleAuthProvider();

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormValidation = () => {
    if (email.current.value === "" || password.current.value === "") {
      setErrorMessage("Please enter email & password");
      return null;
    }

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
          setErrorMessage("invalid-login-credentials");
        });
    }
  };

  const signInwithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // eslint-disable-next-line no-unused-vars
        const token = credential.accessToken;
        // eslint-disable-next-line no-unused-vars
        const user = result.user;
      })
      .catch((error) => {
        setErrorMessage("");
      });
  };

  return (
    <div className=" bg-[url('/assets/bg.jpg')] h-screen">
      <Header />

      <div className="bg-black h-full opacity-[0.5] "></div>

      <form
        className="absolute -top-[40px] w-[90%] md:w-[28%] p-6 md:px-12 mx-auto my-24 md:my-32 right-0 left-0 bg-black text-white bg-opacity-[0.65] rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-2xl md:text-3xl pt-3">
          {isSignIn
            ? `${language[languageKey]?.signIn}`
            : `${language[languageKey]?.signUp}`}
        </h1>

        {!isSignIn && (
          <input
            ref={myName}
            type="text"
            placeholder={language[languageKey]?.placeholder}
            className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder={language[languageKey]?.email}
          className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
        />
        <input
          ref={password}
          type="password"
          placeholder={language[languageKey]?.password}
          className="p-4 my-4 w-full bg-[#333333] outline-none rounded-md"
        />
        {errorMessage ? (
          <p className="text-red-600 font-medium ml-1">{errorMessage}</p>
        ) : (
          <p className="text-[#a4a3a3] font-semibold text-[13px] ml-2">
            {language[languageKey]?.description}
          </p>
        )}

        <button
          className="p-4 my-6 text-lg bg-red-600 cursor-pointer w-full rounded-md transition delay-150 hover:bg-red-700 duration-200"
          onClick={handleFormValidation}
        >
          {isSignIn
            ? `${language[languageKey]?.signIn}`
            : `${language[languageKey]?.signUp}`}
        </button>
        <p
          className="my-1 cursor-pointer text-center hover:underline"
          onClick={toggleSignIn}
        >
          {isSignIn
            ? `${language[languageKey]?.footNote1}`
            : `${language[languageKey]?.footNote2}`}
        </p>
        <p className="text-center ">{language[languageKey]?.or}</p>
        <p
          className="my-2  cursor-pointer text-center underline decoration-1 hover:text-blue-500"
          onClick={signInwithGoogle}
        >
          {language[languageKey]?.signWithGoogle}
        </p>
      </form>
    </div>
  );
};

export default Login;
