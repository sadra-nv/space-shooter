import { canvas } from "./main";
import { player } from "./player";

let start = false;
let playerSelected = false;
let screenSide: "LEFT" | "RIGHT" | "NONE"; //USED FOR ANIMATING THE SHIP SPRITE
let prevMousePos: number;

const playerCoor = {
  x: window.innerWidth / 2 - player.spriteWidth,
  y: window.innerHeight - player.spriteHeight * 4,
};

function Controls() {
  playerCoor.x = canvas.width / 2 - player.spriteWidth;
  playerCoor.y = canvas.height - player.spriteHeight * 4;

  const mouseMoveHandler = (event: MouseEvent) => {
    if (
      playerSelected &&
      event.offsetX < canvas.width - player.spriteWidth * 2 &&
      event.offsetX > player.spriteWidth &&
      event.offsetY > player.spriteHeight &&
      event.offsetY < canvas.height - player.spriteHeight
    ) {
      playerCoor.x = event.offsetX - 25;
      playerCoor.y = event.offsetY - player.spriteHeight * 3;
    }

    if (playerSelected) {
      if (event.offsetX - prevMousePos < 0) {
        screenSide = "LEFT";
      } else if (event.offsetX - prevMousePos > 0) {
        screenSide = "RIGHT";
      }
    }

    prevMousePos = event.offsetX;
  };
  const mousePressedHandler = (event: MouseEvent) => {
    if (
      event.offsetX - playerCoor.x < player.spriteWidth * 4 &&
      event.offsetX - playerCoor.x > -player.spriteWidth * 4 &&
      event.offsetY - playerCoor.y < player.spriteHeight * 4 &&
      event.offsetY - playerCoor.y > -player.spriteHeight
    ) {
      start = true;
      playerSelected = true;
    }
  };
  const mouseReleaseHandler = () => {
    playerSelected = false;
    screenSide = "NONE";
  };

  canvas?.addEventListener("mousemove", mouseMoveHandler);
  canvas?.addEventListener("mousedown", mousePressedHandler);
  window?.addEventListener("mouseup", mouseReleaseHandler);
}

export {
  start,
  playerSelected,
  screenSide,
  prevMousePos,
  playerCoor,
  Controls,
};
