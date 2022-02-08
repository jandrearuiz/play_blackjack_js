const newGame = document.querySelector("#new-game");
const newCard = document.querySelector("#new-card");
const stopGame = document.querySelector("#stop");

let playerCardValues = [];
let computerCardValues = [];
let sumPlayer = 0;
let sumComputer = 0;
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

// Función para lanzar las cartas
const getGame = (nCard, idGameContainer, cardValues) => {
  let gamerCard = aleatoryCards();
  let game = gamerCard.slice(0, nCard);
  const gamerSelection = document.querySelector(idGameContainer);

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

  return cardValues.reduce((a, b) => a + b, 0);
};

// Botón Nuevo Juego - Reiniciar Juego
const gameBtn = () => {
  sumPlayer = getGame(2, "#player-card", playerCardValues);
  sumComputer = getGame(1, "#computer-card", computerCardValues);

  if (sumComputer > sumPlayer) {
    newGame.disabled = false;
  }

  newGame.disabled = true;

  console.log(sumPlayer);
  console.log(sumComputer);
};

newCard.addEventListener("click", () => {
  sumPlayer = getGame(1, "#player-card", playerCardValues);
  console.log(sumPlayer);
  console.log(sumComputer);
});
stopGame.addEventListener("click", () => {
  sumComputer = getGame(1, "#computer-card", computerCardValues);
  console.log(sumPlayer);
  console.log(sumComputer);
});
newGame.addEventListener("click", gameBtn);
