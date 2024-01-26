// INITIALIZATIONS
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnCount = 0;
// INITIAL PPLAYER TURN
let turnO = true;

// WINNING PATTERS FOR BOXES FROM 0-8
const winPatters = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// PLAYER TURN DECIDER
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    turnCount += 1;
    console.log(turnCount);
    if (turnO === true) {
      box.innerText = "X";
      turnO = false;
    } else {
      box.innerText = "O";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// DRAW MATCH
const checkDraw = () => {
  if (turnCount == 9 && isWinner != true) {
    msg.innerText = "Draw no one wins";
    msgContainer.classList.remove("hide");
    endGameDisable();
  }
}
let isWinner = checkWinner();

// DISPLAY WINNER
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  endGameDisable();
};

// DISABLE BOXES AFTER GAME END
const endGameDisable = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
  console.log("Boxes disabled");
};

// RESET GAME
const resetGame = () => {
  turnO = "true";
  enableBoxes();
  msgContainer.classList.add("hide");
  console.log("game reset");
  turnCount = 0;
};

// ENABLE BOXES BACK
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    console.log("Boxes enabled");
  }
};

// CHECKING FOR WINNING PATTERNS
function checkWinner() {
  for (pattern of winPatters) {
    checkDraw();
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        console.log(pos1Val + " is winner");
        showWinner(pos1Val);
        return true;
      }
    }
  }
}

// EVENT LISTENER FOR RESET & NEW GAME BUTTONS
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
