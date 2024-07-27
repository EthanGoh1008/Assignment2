function redirectToQuizPage() {
  // Redirect to the quiz.html page
  window.location.href = "quiz.html";
}

function redirectToLeaderboard() {
  // Redirect to the quiz.html page
  window.location.href = "leaderboard.html";
}

const apiKey = "65c497ef5eab38e8459cb88c";
const apiUrl = "https://airrifleleaderboard-575c.restdb.io/rest/entries";

// Function to fetch data and display it
async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "x-apikey": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Display data in a table
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Function to display data in a table
function displayData(data) {
  const leaderboardTable = document
    .getElementById("leaderboard-container")
    .getElementsByTagName("tbody")[0];

  // Clear existing content
  leaderboardTable.innerHTML = "";

  data.sort((a, b) => b.score - a.score);

  // Create and append table rows and cells for each entry
  data.forEach((entry) => {
    const row = leaderboardTable.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);

    cell1.textContent = entry.score;
    cell2.textContent = entry.name;
  });
}

// Fetch data when the page loads
document.addEventListener("DOMContentLoaded", fetchData);

// Function to show the add entry form
function showAddEntryForm() {
  const addEntryFormContainer = document.getElementById(
    "addEntryFormContainer"
  );
  addEntryFormContainer.style.display = "block";
}

// Add an event listener to handle form submission
document
  .getElementById("addEntryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const scoreInput = document.getElementById("score");
    const nameInput = document.getElementById("name");

    const newEntry = {
      score: parseInt(scoreInput.value),
      name: nameInput.value,
    };

    // Call the function to add the entry to the API
    addEntry(newEntry);

    // Hide the form container
    const addEntryFormContainer = document.getElementById(
      "addEntryFormContainer"
    );
    addEntryFormContainer.style.display = "none";
  });

// Function to add a new entry to the API
async function addEntry(entry) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
      },
      body: JSON.stringify(entry),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Fetch and display updated data
    fetchData();
  } catch (error) {
    console.error("Error adding entry:", error.message);
  }
}
