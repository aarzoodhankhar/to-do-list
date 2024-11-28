import { auth, storage } from "./firebase.js"; // Import Firebase Authentication and Storage
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Fetch user data and display it
function fetchUserData() {
    const user = auth.currentUser;
    if (user) {
        // Set user information on the profile page
        const userName = user.displayName || "User"; 
        document.getElementById("user-name").innerText = userName;
        document.getElementById("user-email").innerText = user.email;

        // Display profile picture if available
        if (user.photoURL) {
            document.getElementById("profile-image").src = user.photoURL;
        }
    }
}

// Run fetchUserData when the profile page loads
document.addEventListener('DOMContentLoaded', fetchUserData);

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Login form submitted", email, password); // Log the email and password

    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Login successful");
        window.location.href = "../html/home.html"; // Redirect to home after successful login
    } catch (error) {
        console.log("Error during login", error.message); // Log error message
        alert("Login Failed: " + error.message);
    }
});

// Logout
document.getElementById('logout')?.addEventListener('click', async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

// Profile Picture Upload
document.getElementById('profile-pic-upload')?.addEventListener('change', async function(event) {
    const file = event.target.files[0];

    if (file) {
        const storageRef = ref(storage, 'profile_pics/' + file.name); // Reference for the file
        try {
            // Upload image to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);

            // Get the download URL of the uploaded file
            const photoURL = await getDownloadURL(snapshot.ref);

            // Update the user's profile with the new photo URL
            const user = auth.currentUser;
            await updateProfile(user, { photoURL: photoURL });

            // Update the profile picture on the page
            document.getElementById('profile-image').src = photoURL;
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error("Error uploading file: ", error);
            alert('Failed to upload profile picture.');
        }
    }
});

// Delete Account
document.getElementById("delete-account")?.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        // Call API to delete account
        deleteAccount();
    }
});

function deleteAccount() {
    const user = auth.currentUser;
    if (user) {
        user.delete().then(() => {
            alert("Account deleted successfully.");
            window.location.href = "index.html"; // Redirect after deletion
        }).catch((error) => {
            alert("Error deleting account: " + error.message);
        });
    }
}