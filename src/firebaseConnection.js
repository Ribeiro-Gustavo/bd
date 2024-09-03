import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-n6OI-jh-Nf-9b8Vc16pkp59LQJGE5uw",
  authDomain: "banco-27538.firebaseapp.com",
  projectId: "banco-27538",
  storageBucket: "banco-27538.appspot.com",
  messagingSenderId: "657206983237",
  appId: "1:657206983237:web:7a21d1dcc4f8e84958012c"
  };

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const auth = getAuth(firebaseapp);

export {db,auth};