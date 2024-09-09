import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrEwqTid-zZaxOOZpcVcbFfhWBsIDHXYM",
  authDomain: "ticketsb-dfb9a.firebaseapp.com",
  projectId: "ticketsb-dfb9a",
  storageBucket: "ticketsb-dfb9a.appspot.com",
  messagingSenderId: "886048720033",
  appId: "1:886048720033:web:efce3400f7e723023c5ce0"
};

const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp);
const auth = getAuth(firebaseapp);

export {db,auth};