// cached elment references
const letterContainer = document.getElementById("letter-container");
const scrambleSection = document.getElementById("scramble-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const submitButton = document.getElementById("submitButton");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const wordInput = document.getElementById("word-input");
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
    button.disabled = true;
  });
  newGameContainer.classList.remove("hide");
  newGameButton.classList.remove("hide");
  resultText.classList.remove("hide");
  wordInput.classList.remove("hide");
};

//Word Generator
const generateWord = () => {
  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  scrambleSection.innerText = "";
  //get input from html of word entered
  chosenWord = document.getElementById("fname").value;
  //Capitalize all letters
  chosenWord = chosenWord.toUpperCase();
  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  //display each element as span
  scrambleSection.innerHTML = displayItem;
  //disable further input from user until new game
  submitButton.disabled = true;
  //hides input section after submitting the word
  wordInput.classList.add("hide");
};

//Initialize Functions
const Init = () => {
  winC = 0;
  loseC = 0;
  //initially erase all content and hide letteres and new game button
  scrambleSection.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  newGameButton.classList.add("hide");
  resultText.classList.add("hide");
  letterContainer.innerHTML = "";
  //for creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button (note this works for repeating letters!)
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //win count
            winC += 1;
            //win condition and message
            if (winC == charArray.length) {
              resultText.innerHTML = `<h2 class='winMsg'>You Win!!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        loseC += 1;
        //for updating images
        img.src = `imgs/spaceman-0${loseC}.jpg`;
        //lose condition and message
        if (loseC == 6) {
          resultText.innerHTML = `<h2 class='loseMsg'>You Lose!!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  //Reset starting img
  img.src = `imgs/spaceman-00.jpg`;
  //Re-enable Submit input
  submitButton.disabled = false;
};

//New Game
newGameButton.addEventListener("click", Init);
window.onload = Init;