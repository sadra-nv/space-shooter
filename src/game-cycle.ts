import { score } from "./main";

// let GAME_OVER = false;

const scoreDisplay = document.querySelector("#final-score");
const resultsWrapper = document.querySelector("#results") as HTMLDivElement;
const restartBtn = document.querySelector("button");

function gameOver() {
  //   GAME_OVER = true;
  if (!scoreDisplay || !resultsWrapper) return;
  scoreDisplay.innerHTML = score.toString();
  resultsWrapper.style.display = "flex";
}

restartBtn?.addEventListener("click", () => {
  window.location.reload();
});

export { gameOver };
