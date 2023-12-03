// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpFU2H6-twoag5ymbleehD7XHi_pDS_2k",
  authDomain: "chat-46a96.firebaseapp.com",
  dataBaseURL:"https://console.firebase.google.com/project/chat-46a96/database/chat-46a96-default-rtdb/data/~2F",
  projectId: "chat-46a96",
  storageBucket: "chat-46a96.appspot.com",
  messagingSenderId: "112922348377",
  appId: "1:112922348377:web:de6446c6fcc53617145a48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataApp = getDatabase(app)
export const auth = getAuth(app);

