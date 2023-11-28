'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');

let totalScores, currentScores, activePlayer, playing;
const WIN_VALUE = 100;

function init() {
    totalScores = [0, 0];
    currentScores = [0, 0];
    activePlayer = 0;
    playing = true;
    totalScore0El.textContent = totalScores[0];
    totalScore1El.textContent = totalScores[1];
    currentScore0El.textContent = currentScores[0];
    currentScore1El.textContent = currentScores[1];
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

function switchPlayers() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    currentScores = [0, 0];
}

btnRollEl.addEventListener('click', () => {
    if (playing) {
        diceEl.classList.remove('hidden');
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        diceEl.src = `dice-${randomNumber}.png`;
        if (randomNumber !== 1) {
            currentScores[activePlayer] += randomNumber;
            console.log(currentScores);
            document.querySelector(`#current--${activePlayer}`).textContent = currentScores[activePlayer];
        } else {
            switchPlayers();
        }
    }
});

btnHoldEl.addEventListener('click', () => {
    if (playing) {
        totalScores[activePlayer] += currentScores[activePlayer];
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];
        if (totalScores[activePlayer] >= WIN_VALUE) {
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            playing = false;
        } else {
            switchPlayers();
        }
    }
});

btnNewEl.addEventListener('click', init);
