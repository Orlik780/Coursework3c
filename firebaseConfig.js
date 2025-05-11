import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn5C6XGy9DTeKf14sLRr5Cqo4mPrLql0s",
  authDomain: "hotel-cocktail-1cab5.firebaseapp.com",
  projectId: "hotel-cocktail-1cab5",
  storageBucket: "hotel-cocktail-1cab5.firebasestorage.app",
  messagingSenderId: "626125104133",
  appId: "1:626125104133:web:003d2fa9733ed50eb8a86c",
  measurementId: "G-TJY17245XK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);