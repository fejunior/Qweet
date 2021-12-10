import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMrvGxMNlmVo0ZxHbKZLUQEpwmvL0m6is",
  authDomain: "qweet-63cbb.firebaseapp.com",
  projectId: "qweet-63cbb",
  storageBucket: "qweet-63cbb.appspot.com",
  messagingSenderId: "873028550345",
  appId: "1:873028550345:web:635baedd4ada31661bd718",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
