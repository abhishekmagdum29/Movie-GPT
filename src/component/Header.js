import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firabase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/redux/userSlice";
import { LOGO_URL } from "../utils/constants";
import { toggleGptButton } from "../utils/redux/gptSlice";
import { SUPPORTED_LANGUAGE } from "../utils/constants";
import { changeLanguage } from "../utils/redux/configSlice";
import language from "../utils/languageConstants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptButton = useSelector((store) => store.gpt.showGptSearch);
  const languageKey = useSelector((store) => store.config.lang);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse")
      } else {
        // user is signed out
        dispatch(removeUser());
        navigate("/")
      }
    });

    // unSubscribe when component unmounts
    return () => unSubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGptSearch = () => {
    dispatch(toggleGptButton());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-5 bg-gradient-to-b from-black z-10 md:justify-between items-center flex flex-col md:flex-row ">
      <img className="w-44 md:w-52 px-2 py-2 " src={LOGO_URL} alt="img" />

      {user && (
        <div className=" flex mt-1 md:mt-0 md:mr-10">
          <select
            className="md:mr-6 w-20 h-7 text-sm md:text-base md:w-24 md:h-8 bg-gray-900 rounded-md text-white outline-none"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGE.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            className="text-white  text-xs md:text-sm font-medium ml-3 h-7 w-20 md:w-24 md:h-8  md:mr-7  outline-none bg-purple-700 hover:bg-purple-600 rounded-md"
            onClick={handleGptSearch}
          >
            {showGptButton ? `Home` : `GPT ${language[languageKey]?.search}`}
          </button>
          <img
            className="hidden md:block w-9 h-9 mr-2 "
            src={user?.photoURL}
            alt="img"
          />

          <button
            className="ml-16 text-xs md:text-sm md:ml-0 font-semibold  text-white hover:text-gray-300"
            onClick={handleSignOut}
          >
            ({language[languageKey]?.signOut})
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
