// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAsqD9-fcRXZqf509a19c7CafDcfxVmRI4",
  authDomain: "api-medicina-abf75.firebaseapp.com",
  databaseURL: "https://api-medicina-abf75-default-rtdb.firebaseio.com",
  projectId: "api-medicina-abf75",
  storageBucket: "api-medicina-abf75.appspot.com",
  messagingSenderId: "518848907135",
  appId: "1:518848907135:web:facca82fd291c2cc65fc4a",
  measurementId: "G-P3XDY5RG06"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDataBase = getDatabase(app);
