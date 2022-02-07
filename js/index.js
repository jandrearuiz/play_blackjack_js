const newGame = document.querySelector("#new-game");
const newCard = document.querySelector("#new-card");
const stopGame = document.querySelector("#stop");

let cardValues = [];
let cardValuesCp = [];
const types = ["C", "D", "H", "S"];
const cards = ["A", "J", "Q", "K"];

// Array de Cartas en orden
const createCombination = () => {
  let combination = [];

  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      combination.push(i + type);
    }
  }

  for (let card of cards) {
    for (let type of types) {
      combination.push(card + type);
    }
  }

  return combination;
};

// Generar un array aleatorio
const aleatoryCards = () => {
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
  let gamerCard = aleatoryCards();
  let game = gamerCard.slice(0, nCard);

  const gamerSelection = document.querySelector("#jugador-carta");
  for (let card of game) {
    let cardValue;
    gamerSelection.insertAdjacentHTML(
      "beforeend",
      `<img class="image" src="./assets/cartas/${card}.png"/>`
    );

    cardValue = card.slice(0, card.length - 1);

    if (cardValue === "A") cardValue = 11;
    if (cardValue === "J") cardValue = 10;
    if (cardValue === "Q") cardValue = 10;
    if (cardValue === "K") cardValue = 10;

    cardValues.push(+cardValue);
  }

  const sum = cardValues.reduce((a, b) => a + b, 0);
  console.log(cardValues);
  console.log(sum);
  return gamerSelection;
};

// Botón Detener - Empieza la computadora
const stopBtn = (nCard) => {
  let computerCard = aleatoryCards();
  let game = computerCard.slice(0, nCard);

  const computerSelection = document.querySelector("#computador-carta");
  for (let card of game) {
    let cardValue;
    computerSelection.insertAdjacentHTML(
      "beforeend",
      `<img class="image" src="./assets/cartas/${card}.png"/>`
    );

    cardValue = card.slice(0, card.length - 1);

    if (cardValue === "A") cardValue = 11;
    if (cardValue === "J") cardValue = 10;
    if (cardValue === "Q") cardValue = 10;
    if (cardValue === "K") cardValue = 10;

    cardValuesCp.push(+cardValue);
  }

  const sum = cardValuesCp.reduce((a, b) => a + b, 0);
  console.log(cardValuesCp);
  console.log(sum);

  return computerSelection;
};

// Botón Nuevo Juego - Reiniciar Juego
const gameBtn = () => {
  getBtn(2);
  stopBtn(1);

  newGame.disabled = true;
};

newCard.addEventListener("click", getBtn.bind(null, 1));
stopGame.addEventListener("click", stopBtn.bind(null, 1));
newGame.addEventListener("click", gameBtn);
