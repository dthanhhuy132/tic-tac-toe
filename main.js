let cells = document.querySelectorAll(".cell");
let message = document.querySelector(".message");
let overlay = document.querySelector(".overlay");
let overlayText = document.querySelector(".overlay-text");
let restart = document.querySelector(".btn-restart");
let quit = document.querySelector(".btn-quit");

let audioClicks = document.querySelector(".audio-click");
let audioOver = document.querySelector(".audio-over");

let player1Text = document.querySelector(".player1-win");
let player2Text = document.querySelector(".player2-win");

let modal = document.querySelector(".modal");

let namePlayer1 = "Player01";
let namePlayer2 = "Player02";

let winCase = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let winArr;

let player1Win = 0;
let player2Win = 0;

let currentTurn = namePlayer1;

cells.forEach((cell) => {
  cell.addEventListener("mouseenter", cellHoverIn);
  cell.addEventListener("mouseleave", cellHoverOut);
  cell.addEventListener("click", cellClick, { once: true });
});

function cellClick() {
  audioClicks.play();

  let currentClass = currentTurn === namePlayer1 ? "cross" : "circle";

  this.classList.add(currentClass);
  this.classList.remove("circle-hover");
  this.classList.remove("cross-hover");
  this.style.cursor = "not-allowed";

  let isWin = winCase.some((win) => {
    let res = win.every((i) => cells[i].classList.contains(currentClass));

    if (res) {
      winArr = win;
    }

    return res;
  });

  if (isWin) {
    message.innerText = `${currentTurn} Won`;
    winArr.forEach((i) => {
      cells[i].classList.add("hightlight");
    });
    cancelAction();
    displayOverlay();
    audioOver.play();
    overlayText.innerText = `${currentTurn} Won`;

    currentTurn === namePlayer1 ? (player1Win += 1) : (player2Win += 1);
    currentTurn === namePlayer1
      ? (player1Text.innerText = player1Win)
      : (player2Text.innerText = player2Win);
    return;
  } else {
    let res = Array.from(cells).every((cell) => cell.classList.length === 2);

    if (res) {
      overlayText.innerText = "Tie";
      displayOverlay();
      audioOver.play();
    }
  }

  currentTurn = currentTurn === namePlayer1 ? namePlayer2 : namePlayer1;
  message.innerText = `${currentTurn}'s Turn`;
}

function cellHoverIn() {
  let currentClass = currentTurn === namePlayer1 ? "cross" : "circle";
  if (this.classList.contains("cross") || this.classList.contains("circle")) {
    this.style.cursor = "not-allowed";
  } else {
    this.classList.add(`${currentClass}-hover`);
  }
}

function cellHoverOut() {
  if (
    this.classList.contains("cross-hover") ||
    this.classList.contains("circle-hover")
  ) {
    this.classList.remove("cross-hover");
    this.classList.remove("circle-hover");
  }
}

function cancelAction() {
  cells.forEach((cell) => {
    cell.removeEventListener("mouseenter", cellHoverIn);
    cell.removeEventListener("mouseleave", cellHoverOut);
    cell.removeEventListener("click", cellClick);
    cell.style.cursor = "not-allowed";
  });
}

function displayOverlay() {
  overlay.classList.add("overlay-show");
}

restart.addEventListener("click", function () {
  cells.forEach((cell) => {
    cell.classList.remove("cross");
    cell.classList.remove("circle");
    cell.classList.remove("hightlight");
    cell.removeAttribute("style");

    cell.addEventListener("mouseenter", cellHoverIn);
    cell.addEventListener("mouseleave", cellHoverOut);
    cell.addEventListener("click", cellClick, { once: true });
    overlay.classList.remove("overlay-show");
  });
});

quit.addEventListener("click", function () {
  window.close();
  console.log("quit run");
});

// Modal
let nameResult1 = document.querySelector(".name > div:nth-child(1)");
let nameResult2 = document.querySelector(".name > div:nth-child(2)");
let body = document.querySelector("body");

console.log(nameResult1);
console.log(nameResult2);

let isShowModal = true;
if (isShowModal) {
  showModal();
}

let inputEl1 = document.querySelector(".input-name-player1");
let inputEl2 = document.querySelector(".input-name-player2");

let inputEl1Value = "";
let inputEl2Value = "";

inputEl1.addEventListener("change", function (e) {
  e.preventDefault();
  inputEl1Value = e.target.value;
});
inputEl2.addEventListener("change", function (e) {
  e.preventDefault();
  inputEl2Value = e.target.value;
});

if (!isShowModal) {
  let startModal = document.querySelector(".modal-start");
  let cancelModal = document.querySelector(".modal-cancel");

  startModal.addEventListener("click", function () {
    if (inputEl1Value !== "") {
      message.innerText = `${inputEl1Value}'s Turn`;
      namePlayer1 = inputEl1Value;
      nameResult1.innerText = inputEl1Value;
    }
    if (inputEl2Value !== "") {
      namePlayer2 = inputEl2Value;
      nameResult2.innerText = inputEl2Value;
    }

    modal.classList.remove("modal-active");
  });

  cancelModal.addEventListener("click", function () {
    modal.classList.remove("modal-active");
    body.classList.remove("dth-modal");
  });
}

function showModal() {
  modal.classList.add("modal-active");
  isShowModal = false;
  body.classList.add("dth-modal");
}
