import { initializeApp, getApps, getApp } from "firebase/app"; // Import getApp
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXFXkAUiQsVXTbkee8sEufERiih_AG69k",
    authDomain: "michelle-13e3d.firebaseapp.com",
    projectId: "michelle-13e3d",
    storageBucket: "michelle-13e3d.firebasestorage.app",
    messagingSenderId: "330626987742",
    appId: "1:330626987742:web:316a80a71e05c9fedfb44f"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp(); // Use getApp() to retrieve the existing app
}

const db = getDatabase(firebaseApp);

export { db, firebaseApp }; // Export the database instance and the app