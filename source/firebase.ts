// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDTU0tHcYMaN0nU_jWXFt7IjyesGgDF9mE",
    authDomain: "kiwibot-api-6b8d6.firebaseapp.com",
    projectId: "kiwibot-api-6b8d6",
    storageBucket: "kiwibot-api-6b8d6.appspot.com",
    messagingSenderId: "196533926684",
    appId: "1:196533926684:web:c34d749e58b70a3dcd58d9",
    measurementId: "G-CEY0HRPK2N"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const firestoreInstance = getFirestore(app)

export const firestore = firestoreInstance;
export default app