// settings.js
import { auth } from './firebase.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";

document.getElementById('logout').addEventListener('click', () => {
  signOut(auth).then(() => {
    alert("Logged out successfully!");
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Logout failed: " + error.message);
  });
});

// Function for account deletion will go here (optional)
