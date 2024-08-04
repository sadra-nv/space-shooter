import { score } from "./main";
import { animationID } from "./render-engine";
import { sfx } from "./sfx";

let GAME_OVER = false;

const scoreDisplay = document.querySelector("#final-score");
const resultsWrapper = document.querySelector("#results") as HTMLDivElement;
const restartBtn = document.querySelector("#restart");

function gameOver() {
  GAME_OVER = true;
  if (!scoreDisplay || !resultsWrapper) return;
  scoreDisplay.innerHTML = score.toString();
  resultsWrapper.style.display = "flex";
  window.cancelAnimationFrame(animationID);
  sfx.theme.stop();
}

restartBtn?.addEventListener("click", () => {
  window.location.reload();
});

export { gameOver, GAME_OVER };
