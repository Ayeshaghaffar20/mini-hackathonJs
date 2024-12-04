
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp, getDoc, where, query, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEEWlv44q4ndUKPYAdc_2t0Jaeapo7Zxc",
    authDomain: "first-firebase-f5c17.firebaseapp.com",
    projectId: "first-firebase-f5c17",
    storageBucket: "first-firebase-f5c17.firebasestorage.app",
    messagingSenderId: "780299460321",
    appId: "1:780299460321:web:e9bea570fdb0fcffa3a1a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, collection, getDocs, serverTimestamp, db, getDoc, where, query }