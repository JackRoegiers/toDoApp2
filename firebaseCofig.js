import { initializeApp } from 'firebase/app';
//import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC8oxp4SeRw2hxD6VaNwjBbLngYauxAXeA",
    authDomain: "sanboxapp-8654d.firebaseapp.com",
    projectId: "sanboxapp-8654d",
    storageBucket: "sanboxapp-8654d.appspot.com",
    messagingSenderId: "521314368265",
    appId: "1:521314368265:web:443b0f730e7c580d97b1d8",
    measurementId: "G-C4DE0ENL5V"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);