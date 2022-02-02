const newGame = document.querySelector("#new-game");
const newLetter = document.querySelector("#new-letter");
const stopGame = document.querySelector("#stop");

let gameLetter = [];
let compLetter = [];
let cardValues = [];
const types = ["C", "D", "H", "S"];
const letters = ["A", "J", "Q", "K"];

// Array de Cartas en orden
const createCombination = () => {
  let combination = [];

  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      combination.push(i + type);
    }
  }

  for (let letter of letters) {
    for (let type of types) {
      combination.push(letter + type);
    }
  }

  return combination;
};

// Generar un array aleatorio
const aleatoryLetters = () => {
  let array = createCombination();

  let i = array.length;
  let aleatory;
  let temp;
  while (--i > 0) {
    // Genera el indice aleatorio
    aleatory = Math.floor(Math.random() * i);
    // Guarda en un temporal el número de la posición aleatoria
    temp = array[aleatory];
    // Asigna el indice en la posición de i
    array[aleatory] = array[i];
    // Lo guardar en el nuevo array
    array[i] = temp;
  }
  return array;
};

// Botón Pedir Carta - Empieza el jugador
const getBtn = (nCard) => {
  let gamerLetter = aleatoryLetters();
  let game = gamerLetter.slice(0, nCard);

  const gamerSelection = document.querySelector("#jugador-carta");
  for (let card of game) {
    let cardValue;
    gamerSelection.insertAdjacentHTML(
      "beforeend",
      `<img class="image" src="./assets/cartas/${card}.png"/>`
    );
    
    cardValue = card.slice(0, card.length-1); 

    console.log(cardValue);

    if (cardValue === "A") cardValue = 11;
    if (cardValue === "J") cardValue = 10;
    if (cardValue === "Q") cardValue = 10;
    if (cardValue === "K") cardValue = 10;

    cardValues.push(+cardValue);
  }

  const sum = cardValues.reduce((a, b) => a + b, 0);
  console.log(cardValues);
  console.log(sum);
};

// Botón Detener - Empieza la computadora
const stopBtn = () => {
  let computerLetter = aleatoryLetters();
  let game = computerLetter.shift();

  const computerSelection = document.querySelector("#computador-carta");
  computerSelection.insertAdjacentHTML(
    "beforeend",
    `<img class="image" src="./assets/cartas/${game}.png"/>`
  );

  let cardValue = game[0];

  if (cardValue === "A") cardValue = 11;
  if (cardValue === "J") cardValue = 10;
  if (cardValue === "Q") cardValue = 10;
  if (cardValue === "K") cardValue = 10;

  compLetter.push(+cardValue);

  const sum = compLetter.reduce((a, b) => a + b, 0);

  console.log(compLetter);
  console.log(sum);
};

// Botón Nuevo Juego - Reiniciar Juego
const gameBtn = () => {
  getBtn(2);

  console.log("Nuevo Juego");
};

newLetter.addEventListener("click", getBtn.bind(null, 1));
stopGame.addEventListener("click", stopBtn);
newGame.addEventListener("click", gameBtn);
