function redirectToQuizPage() {
  // Redirect to the quiz.html page
  window.location.href = "quiz.html";
}

function redirectToLeaderboard() {
  // Redirect to the quiz.html page
  window.location.href = "leaderboard.html";
}

const apiKey = "65c383f84355fb4e43c1c19b";
const apiUrl = "https://leaderboard-0e71.restdb.io/rest/entries";

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
