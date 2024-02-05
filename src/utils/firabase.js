// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa12hGeV7Cgk1dFG5laK1c3y5eRwwjJZU",
  authDomain: "netflix-gpt-43fbd.firebaseapp.com",
  projectId: "netflix-gpt-43fbd",
  storageBucket: "netflix-gpt-43fbd.appspot.com",
  messagingSenderId: "244794249160",
  appId: "1:244794249160:web:556016404dd4074729bafd",
  measurementId: "G-CFRYFKW5MG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth();
