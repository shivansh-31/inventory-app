// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Replace below config with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCF-LWgL8aEYNQc_cEjSmjs9pKqy9F63Cs",
  authDomain: "inventory-management-40725.firebaseapp.com",
  projectId: "inventory-management-40725",
  storageBucket: "inventory-management-40725.appspot.com",
  messagingSenderId: "737347135047",
  appId: "1:737347135047:web:20ea48e3f38a7da25a7362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
