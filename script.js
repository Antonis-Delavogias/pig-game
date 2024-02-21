"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector("btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  const dice = Math.trunc(Math.random() * 6) + 1;

  //Diplay the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;

  //Check for rolled 1
  if (dice !== 1) {
    //add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //switch to next pl
    currentScore += dice;
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  //add current score to active player's score
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if player's score is >= 100
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    switchPlayer();
  }

  //Finish the game

  //Switch to the next player
});
