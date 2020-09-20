// returns random computer action
function playComputer() {
    const actionSelections = ["rock", "paper", "scissors"];

    return actionSelections[Math.floor(Math.random() * actionSelections.length)];
}

function newRound(playerAction) {
    // progresses round count
    currentRound += 1;

    // creates object and populates with known elements
    let roundObj = {}; 
    let computerAction = playComputer();
    roundObj["round"] = currentRound;
    roundObj["computerAction"] = computerAction;
    roundObj["playerAction"] = playerAction;

    // decide result of the current round
    if (playerAction === computerAction) {;
        roundObj["playerResult"] = "draw";
        roundObj["computerResult"] = "draw";
    } else if (playerAction === "rock" && computerAction === "scissors") {
        roundObj["playerResult"] = "win";
        roundObj["computerResult"] = "lose";
        playerScore += 1;
    } else if (playerAction === "paper" && computerAction === "rock") {
        roundObj["playerResult"] = "win";
        roundObj["computerResult"] = "lose";
        playerScore += 1;

    } else if (playerAction === "scissors" && computerAction === "paper") {
        roundObj["playerResult"] = "win";
        roundObj["computerResult"] = "lose";
        playerScore += 1;

    } else {
        roundObj["playerResult"] = "lose";
        roundObj["computerResult"] = "win";
        computerScore += 1;
    }

    // push round object to array
    historyArray.push(roundObj);
    console.log(historyArray);

    appendHistoryEntry();
}

function appendHistoryEntry() {
    // define object of latest round played
    let lastRoundObj = historyArray[historyArray.length - 1];

    // create new history elements
    let newHistory = document.createElement("span");
    let historyRound = document.createElement("span");
    let historyPlayer = document.createElement("i");
    let historyComputer = document.createElement("i");
    
    // set class of history__row and round containers
    newHistory.setAttribute('class', 'history__row');
    historyRound.setAttribute('class', 'history__round');

    // adds content of history round, player action and computer action
    historyRound.textContent = lastRoundObj.round;
    historyPlayer.setAttribute("class", `fa fa-hand-${lastRoundObj.playerAction}-o fa-3x fa-flip-horizontal icon__${lastRoundObj.playerResult}`);
    historyComputer.setAttribute("class", `fa fa-hand-${lastRoundObj.computerAction}-o fa-3x icon__${lastRoundObj.computerResult}`);

    // appends new elements to history div container
    newHistory.appendChild(historyRound);
    newHistory.appendChild(historyPlayer);
    newHistory.appendChild(historyComputer);
    historyBox.prepend(newHistory);

    // update active player and computer icons
    playerIcon.setAttribute("class", `fa fa-hand-${lastRoundObj.playerAction}-o fa-3x fa-flip-horizontal`);
    computerIcon.setAttribute("class", `fa fa-hand-${lastRoundObj.computerAction}-o fa-3x`);

    // appends active icon class with icon__win lose or draw
    playerIcon.className += " icon__" + lastRoundObj.playerResult;
    computerIcon.className += " icon__" + lastRoundObj.computerResult;

    // update scoreboard
    scoreTally.textContent = `${playerScore}` + " : " + `${computerScore}`;

    // update commentary box according to result
    if (playerScore >= maxScore) {
        commentaryBox.innerHTML = `Well done you beat Bob!<br>Click any button to play again`;
    } else if (computerScore >= maxScore) {
        commentaryBox.innerHTML = `Bob beat you...<br>Click any button to play again`;
    } else if (lastRoundObj.playerResult === "win") {
        commentaryBox.innerHTML = "Good job, you won!<br><br>Pick your next move:";
    } else if (lastRoundObj.playerResult === "lose") {
        commentaryBox.innerHTML = "You got rekt...<br><br>Try again:";
    } else if (lastRoundObj.playerResult === "draw") {
        commentaryBox.innerHTML = "Draw<br><br>Hurry up... Pick again:";
    }
}

// resets game
function resetGame() {
    // counter reset
    currentRound = 0;
    playerScore = 0;
    computerScore = 0;
    historyArray = [];

    // DOM reset
    scoreTally.textContent = "0 : 0";
    playerIcon.setAttribute("class", "fa fa-hand-rock-o fa-3x fa-flip-horizontal");
    computerIcon.setAttribute("class", "fa fa-hand-rock-o fa-3x");
    commentaryBox.innerHTML = "Round 1<br>First to 5 points wins!<br>Pick your move:";
    historyBox.textContent = "";
}

// generates start page
function startForm() {
    const formContainer = document.createElement("div");
    const formTitle = document.createElement("div");
    const roundLabel = document.createElement("label");
    const roundInput = document.createElement("input");
    const submitBtn = document.createElement("button");

    formContainer.setAttribute("class", "form");

    formTitle.setAttribute("class", "form__title");
    formTitle.innerHTML = "<i class=\"fa fa-hand-rock-o fa-3x fa-flip-horizontal\" aria-hidden=\"true\"></i><i class=\"fa fa-hand-paper-o fa-3x fa-flip-horizontal\" style=\"margin-right:0.1em\" aria-hidden=\"true\"></i><i class=\"fa fa-hand-scissors-o fa-3x fa-flip-horizontal\" aria-hidden=\"true\"></i>";

    roundLabel.setAttribute("class", "form__roundLabel");
    roundLabel.textContent = "Decide the winning score"

    roundInput.setAttribute("class", "form__roundInput");
    roundInput.setAttribute("type", "number");

    submitBtn.setAttribute("class", "form__submit");
    submitBtn.textContent = "Let\'s Play";

    formContainer.appendChild(formTitle);
    formContainer.appendChild(roundLabel);
    formContainer.appendChild(roundInput);
    formContainer.appendChild(submitBtn);
    body.appendChild(formContainer);

    // form DOM definitions
    const form = document.querySelector(".form");
    const formRoundInput = document.querySelector(".form__roundInput");
    const formBtn = document.querySelector(".form__submit");

    // form submit button listener
    formBtn.addEventListener("click", () => {
        if (Number.parseInt(formRoundInput.value) > 0) {
            maxScore = parseInt(formRoundInput.value);

            // hides start page
            body.removeChild(form);
            console.log(formRoundInput.value);
        } else {
            alert("Please enter a number");
            console.log("error");
        }
    });
}

// game DOM definitions
const body = document.querySelector("body");
const scoreTally = document.querySelector(".score__tally");
const playerIcon = document.querySelector("#action__player");
const computerIcon = document.querySelector("#action__computer");
const commentaryBox = document.querySelector(".commentary__box");
const btn = document.querySelector(".btn");
const rockBtn = document.querySelector(".btn__rock");
const paperBtn = document.querySelector(".btn__paper");
const scissorsBtn = document.querySelector(".btn__scissors");
const historyBox = document.querySelector(".history__content");

// counters
let maxScore = 0;
let currentRound = 0;
let playerScore = 0;
let computerScore = 0;
let historyArray = [];

// initialises start page
startForm();

// decides new round or reset on button click
function gm(a) {
    if (playerScore >= maxScore || computerScore >= maxScore) {
        resetGame();

        // generates new start page
        startForm();       
    } else {
        newRound(a);
    }
}

// button listeners, runs new round on click
rockBtn.addEventListener("click", () => {gm("rock")});
paperBtn.addEventListener("click",  () => {gm("paper")});
scissorsBtn.addEventListener("click", () => {gm("scissors")});