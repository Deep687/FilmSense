// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0ei4OWbXWf3iivZKY9Zq_dLSCRW2lRoc",
  authDomain: "filmsense-9ba8b.firebaseapp.com",
  projectId: "filmsense-9ba8b",
  storageBucket: "filmsense-9ba8b.appspot.com",
  messagingSenderId: "148885582476",
  appId: "1:148885582476:web:6b5ead5eb38ff228c681a9",
  measurementId: "G-G21B5FSGX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
