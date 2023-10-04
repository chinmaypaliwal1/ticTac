// Select all the cell elements and convert the NodeList to an array
const cells = Array.from(document.querySelectorAll(".cell"));

// Variables to keep track of the current player and the game state
let currentPlayer = "X";
let gameActive = true;

// Array of winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// Function to handle a cell click event
function handleCellClick(event) {
  const clickedCell = event.target;

  // Check if the clicked cell is already filled or the game is not active
  if (clickedCell.innerText !== "" || !gameActive) {
    return;
  }

  // Update the cell with the current player's mark
  clickedCell.innerText = currentPlayer;

  // Check for a winner
  if (checkForWinner()) {
    gameActive = false;
    displayMessage(`Player ${currentPlayer} wins!`);
    return;
  }

  // Check if it's a tie
  if (isTie()) {
    gameActive = false;
    displayMessage("It's a tie!");
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check if there is a winner
function checkForWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const cellA = cells[a].innerText;
    const cellB = cells[b].innerText;
    const cellC = cells[c].innerText;

    if (cellA !== "" && cellA === cellB && cellA === cellC) {
      // Highlight the winning cells
      cells[a].classList.add("highlight");
      cells[b].classList.add("highlight");
      cells[c].classList.add("highlight");
      return true;
    }
  }

  return false;
}

// Function to check if it's a tie
function isTie() {
  return cells.every((cell) => cell.innerText !== "");
}

// Function to display a message
function displayMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.innerText = message;
}

// Add event listeners to the cells
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
function restartGame() {
  currentPlayer = "X";
  gameActive = true;

  // Clear the cell contents and remove the highlight
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("highlight");
  });

  displayMessage("");
}

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", restartGame);
