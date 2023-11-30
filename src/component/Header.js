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

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptButton = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
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
    <div className="absolute w-screen px-5 bg-gradient-to-b from-black z-10  flex justify-between items-center">
      <img className="w-44 px-2 py-2 " src={LOGO_URL} alt="img" />

      {user && (
        <div className="flex mr-8">
          {showGptButton && (
            <select
              className="mr-6 px-2 py1 bg-gray-900 rounded-md text-white outline-none"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGE.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="text-white mr-7 px-2 py-1 outline-none bg-purple-700 hover:bg-purple-600 rounded-md"
            onClick={handleGptSearch}
          >
            {showGptButton ? "Home" : "GPT Search"}
          </button>
          <img className="w-9 h-9 mr-2 " src={user?.photoURL} alt="img" />

          <button
            className="font-semibold text-sm text-white hover:text-gray-300"
            onClick={handleSignOut}
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
