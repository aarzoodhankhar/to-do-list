// Import Firebase SDK and initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js"; // Firebase Storage


const firebaseConfig = {
    apiKey: "AIzaSyDoSrJ_mRer1bU0ef-P9MtkOu9NKooHhSE",
    authDomain: "taskmanager-263a7.firebaseapp.com",
    projectId: "taskmanager-263a7",
    databaseURL: "https://taskmanager-263a7-default-rtdb.firebaseio.com"
,
    storageBucket: "taskmanager-263a7.firebasestorage.app",
    messagingSenderId: "652382812596",
    appId: "1:652382812596:web:14fa9d1f9d283d9fb45ae1",
    measurementId: "G-FBCJGQ4CXP"
  };
  

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db };
export { auth, storage };
