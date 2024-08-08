'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, totalScore, currentScore, activePlayer;

const init = function () {
  playing = true;
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
// TODO rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // TIP1-  Generateing a random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    // TIP2-  Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // TIP3-  Check for rolled 1 : if true switch to next player

    if (dice !== 1) {
      // Add dice to current Score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // 2 Check if player's score is >= 100
    if (totalScore[activePlayer] >= 20) {
      // true finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      // false switch to the next player;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
