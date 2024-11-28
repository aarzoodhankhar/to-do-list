import { auth, db } from './firebase.js'; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Function to count tasks
async function countTasks(userId) {
  const tasksSnapshot = await getDocs(collection(db, "tasks"));
  let pendingCount = 0, doneCount = 0;

  tasksSnapshot.forEach(doc => {
    const task = doc.data();
    if (task.userId === userId) {
      if (task.done) {
        doneCount++;
      } else {
        pendingCount++;
      }
    }
  });

  // Assuming "upcoming" refers to pending tasks with deadlines set in the future
  return { pending: pendingCount, done: doneCount };
}

// Function to render the chart
function renderChart(data) {
  const ctx = document.getElementById("taskChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut", // Change type to suit your visualization preference
    data: {
      labels: ["Pending", "Done"],
      datasets: [
        {
          label: "Task Overview",
          data: [data.pending, data.done],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Your Task Status" },
      },
    },
  });
}

// Initialize page
window.onload = function() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const name = user.displayName || "Anonymous User";
      const email = user.email || "No Email Available";

      document.getElementById('profileName').innerText = name;
      document.getElementById('profileEmail').innerText = email;

      // Fetch task data and render chart
      const taskData = await countTasks(user.uid);
      renderChart(taskData);
    } else {
      alert("No user is logged in. Redirecting to login page.");
      window.location.href = "index.html";
    }
  });

  // Logout functionality
  document.getElementById("backToTasksButton").addEventListener("click", () => {
    alert("Redirecting to tasks page...");
    window.location.href = "home.html";
  });
};
