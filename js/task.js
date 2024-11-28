// DOM Elements
const taskNameInput = document.getElementById("task-name");
const taskDescInput = document.getElementById("task-desc");
const taskDateInput = document.getElementById("task-date");
const taskTimeInput = document.getElementById("task-time");
const taskPrioritySelect = document.getElementById("task-priority");
const taskContainerHigh = document.querySelector(".task-high-priority");
const taskContainerOther = document.querySelector(".task-other-priority");
const addTaskButton = document.getElementById("add-task");

// Add a new task
addTaskButton?.addEventListener("click", async () => {
    const taskName = taskNameInput.value.trim();
    const taskDesc = taskDescInput.value.trim();
    const taskDate = taskDateInput.value;
    const taskTime = taskTimeInput.value;
    const taskPriority = taskPrioritySelect.value;

    if (!taskName || !taskDesc || !taskDate || !taskTime) {
        alert("Please fill in all fields!");
        return;
    }

    // Create task object
    const task = {
        name: taskName,
        description: taskDesc,
        dueDate: taskDate,
        dueTime: taskTime,
        priority: taskPriority,
        done: false
    };

    // Add task to respective container
    if (task.priority === 'High') {
        createTaskElement(task, taskContainerHigh);
    } else {
        createTaskElement(task, taskContainerOther);
    }

    // Clear input fields
    taskNameInput.value = "";
    taskDescInput.value = "";
    taskDateInput.value = "";
    taskTimeInput.value = "";
});

// Create task element
function createTaskElement(task, container) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");
    
    taskItem.innerHTML = `
        <h3 class="${task.done ? "done" : ""}">${task.name}</h3>
        <p class="${task.done ? "done" : ""}">${task.description}</p>
        <p class="task-date">Due: ${task.dueDate} ${task.dueTime}</p>
        <p class="task-priority">${task.priority} Priority</p>
        <button class="done-btn">${task.done ? "Undone" : "Done"}</button>
        <button class="delete-task">Delete</button>
    `;

    // Attach event listeners
    taskItem.querySelector(".done-btn").addEventListener("click", () => toggleTaskDone(task, taskItem));
    taskItem.querySelector(".delete-task").addEventListener("click", () => deleteTask(task, taskItem));
    
    container.appendChild(taskItem);
}

// Toggle task status (done/undone)
function toggleTaskDone(task, taskItem) {
    task.done = !task.done;
    taskItem.querySelector("h3").classList.toggle("done");
    taskItem.querySelector("p").classList.toggle("done");
    taskItem.querySelector(".done-btn").textContent = task.done ? "Undone" : "Done";
}

// Delete task
function deleteTask(task, taskItem) {
    taskItem.remove();
}

// Logout functionality
import { signOut } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js';
import { auth } from './firebase.js'; // Ensure you're importing auth from firebase.js

// Logout functionality
document.getElementById('logout-link')?.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = "../html/index.html"; // Redirect after sign-out
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
});

// Delete account functionality
document.getElementById("delete-account-link")?.addEventListener("click", function() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        deleteAccount();
    }
});

function deleteAccount() {
    const user = auth.currentUser;
    if (user) {
        user.delete().then(() => {
            alert("Account deleted successfully.");
            window.location.href = "../html/index.html"; // Redirect after deletion to the login page
        }).catch((error) => {
            if (error.code === 'auth/requires-recent-login') {
                alert("You need to log in again to delete your account.");
                // Optionally, force a login flow again if this error occurs.
            } else {
                alert("Error deleting account: " + error.message);
            }
        });
    } else {
        alert("No user is logged in.");
    }
}
