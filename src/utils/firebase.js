// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZSMM1NzXvzCzgWbk5OBIa9DNvh40eWRs",
  authDomain: "netflix-gpt-f8b0d.firebaseapp.com",
  projectId: "netflix-gpt-f8b0d",
  storageBucket: "netflix-gpt-f8b0d.appspot.com",
  messagingSenderId: "152662581811",
  appId: "1:152662581811:web:2fdd737e2a2625de0c3946",
  measurementId: "G-Q9H0RXTCHE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();