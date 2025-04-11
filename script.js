import { startGame } from './missions.js';

const intro = document.getElementById("intro-screen");
const laptop = document.getElementById("laptop");
const input = document.getElementById("input");
let gameStarted = false;

// Iniciar jogo ao pressionar qualquer tecla uma vez
document.addEventListener("keydown", () => {
  if (!gameStarted) {
    gameStarted = true;
    intro.classList.add("hidden");
    laptop.classList.remove("hidden");
    input.focus();
    startGame();
  }
});

// Comando ao pressionar Enter
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim().toLowerCase();
    if (cmd !== "") {
      if (typeof window.processCommand === "function") {
        window.processCommand(cmd); // Executa função definida no missions.js
      } else {
        console.error("processCommand não foi carregada ainda!");
      }
    }
    input.value = "";
  }
});
