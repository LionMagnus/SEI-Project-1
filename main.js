// get input from html of word entered
function getWord() {
    chosenWord = document.getElementById("frm1");
  }
// cached elment references
const letterContainer = document.getElementById("letter-container");
const scrambleSection = document.getElementById("scramble-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
// variables used to track the state of the game
let winC=0;
let loseC=0;

let chosenWord = getWord();
// event listeners

// functions
