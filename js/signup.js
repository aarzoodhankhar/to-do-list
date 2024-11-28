import { auth } from "./firebase.js"; // Import Firebase Authentication
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Signup Form
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
        
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const username = document.getElementById("username").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's display name
        await updateProfile(userCredential.user, {
            displayName: username,
        });

        alert("Sign-up successful! Please log in.");
        window.location.href = "../html/index.html"; // Redirect to login page
    } catch (error) {
        console.error("Error during sign-up:", error.message);
        alert("Signup Failed: " + error.message);
    }
});