// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBosOR2QPkjLLJSJpCxKNthFLK0r-m31Zg",
  authDomain: "updaily-a396f.firebaseapp.com",
  projectId: "updaily-a396f",
  storageBucket: "updaily-a396f.appspot.com",
  messagingSenderId: "194421539776",
  appId: "1:194421539776:web:26c75e79e1d5859e5bbe25",
  measurementId: "G-WPTW9HEP07",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
