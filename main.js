// cached elment references
const letterContainer = document.getElementById("letter-container");
const scrambleSection = document.getElementById("scramble-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const submitButton = document.getElementById("submitButton");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const img = document.getElementById("ufo");
// variables used to track the state of the game
let winC=0;
let loseC=0;

let chosenWord = '';

//Block all the Buttons
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Word Generator
const generateWord = () => {
  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  scrambleSection.innerText = "";
  // get input from html of word entered
  chosenWord = document.getElementById("fname").value;
  //Capitalize all letters
  chosenWord = chosenWord.toUpperCase();
  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  //Display each element as span
  scrambleSection.innerHTML = displayItem;
  //Disable further input from user until new game
  submitButton.disabled = true;
};

//Initialize Functions
const Init = () => {
  winC = 0;
  loseC = 0;
  //Initially erase all content and hide letteres and new game button
  scrambleSection.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winC += 1;
            //if winCount equals word lenfth
            if (winC == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        loseC += 1;
        //for updating images
        img.src = `imgs/spaceman-0${loseC}`;
        //lose condition and message
        if (loseC == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  //Reset starting img
  img.src = `imgs/spaceman-00`;
  //Re-enable Submit input
  submitButton.disabled = false;
};

//New Game
newGameButton.addEventListener("click", Init);
window.onload = Init;