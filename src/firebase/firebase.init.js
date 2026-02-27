
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrX1BuwmwBxrtFvRa3WT_Ehhemviusdgg",
  authDomain: "smaart-deals.firebaseapp.com",
  projectId: "smaart-deals",
  storageBucket: "smaart-deals.firebasestorage.app",
  messagingSenderId: "563851816234",
  appId: "1:563851816234:web:50c7dbdf7fd3df597fc253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);