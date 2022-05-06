const FORM_ADD = document.getElementById("form_add");
const GAME_INPUT = document.getElementById("gameInput");
let messageBox = document.getElementById("message");
let LIVE = document.getElementById("live");
let RESTART = document.getElementById("restart");
let initialMessage = "System message is:";

let live = 3;
LIVE.textContent = `LIVE : ${live}`;
let randomNumber = Math.floor(Math.random() * 10) + 1;

console.log(randomNumber);

eventListener();

function eventListener() {
  FORM_ADD.addEventListener("submit", formValidation);
  RESTART.addEventListener("click", function () {
    document.location.reload();
  });
}

function formValidation(e) {
  let newNumber = GAME_INPUT.value.trim();
  newNumber = parseInt(newNumber);

  try {
    if (GAME_INPUT.value === "") throw "INPUT BOŞDUR";
    if (isNaN(newNumber)) throw "not a number";
    if (newNumber > 10) throw "Rəqəm 10 və ya 10 reqeminden kiçir olmalıdır";
    if (newNumber < 1) throw "Rəqəm 1 və ya 1 reqeminden böyük olmalıdır";
    if (randomNumber !== newNumber) {
      liveCounter(newNumber);
    }
    if (randomNumber === newNumber) throw "Qazandiniz";
  } catch (err) {
    messageBox.textContent += " " + err;
  } finally {
    GAME_INPUT.value = "";
    if (messageBox.textContent !== "System message is: GAME OVER") {
      setTimeout(function () {
        messageBox.textContent = initialMessage;
      }, 2000);
    }
  }
  e.preventDefault();
  return newNumber;
}

function liveCounter(number) {
  if (randomNumber !== number && live > 1) {
    live--;
    LIVE.textContent = `LIVE : ${live}`;
    messageBox.textContent += "Yanlis cavab";
  } else if (randomNumber !== number && live === 1) {
    messageBox.textContent += " " + "GAME OVER";
    live = 0;
    LIVE.textContent = `LIVE : ${live}`;
  }
}
