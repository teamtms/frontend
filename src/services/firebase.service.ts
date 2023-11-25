// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAF11X8psRyUd-y97wnYpvqmj_i3Rwmk6Q",
	authDomain: "fb24m-6c83c.firebaseapp.com",
	databaseURL: "https://fb24m-6c83c-default-rtdb.firebaseio.com",
	projectId: "fb24m-6c83c",
	storageBucket: "fb24m-6c83c.appspot.com",
	messagingSenderId: "779116236174",
	appId: "1:779116236174:web:a0386631243a36d75128df",
	measurementId: "G-RLG04CQLQP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);