import { canvas } from "./main";
import { playerSpriteWidth, playerSpriteHeight } from "./player";

let start = false;
let playerSelected = false;
let screenSide: "LEFT" | "RIGHT" | "NONE"; //USED FOR ANIMATING THE SHIP SPRITE
let prevMousePos: number;

const playerCoor = {
  x: window.innerWidth / 2 - playerSpriteWidth,
  y: window.innerHeight - playerSpriteHeight * 4,
};

function Controls() {
  playerCoor.x = canvas.width / 2 - playerSpriteWidth;
  playerCoor.y = canvas.height - playerSpriteHeight * 4;

  const mouseMoveHandler = (event: MouseEvent) => {
    if (
      playerSelected &&
      event.offsetX < canvas.width - playerSpriteWidth * 2 &&
      event.offsetX > playerSpriteWidth &&
      event.offsetY > playerSpriteHeight &&
      event.offsetY < canvas.height - playerSpriteHeight
    ) {
      playerCoor.x = event.offsetX - 25;
      playerCoor.y = event.offsetY - playerSpriteHeight * 3;
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
      event.offsetX - playerCoor.x < playerSpriteWidth * 4 &&
      event.offsetX - playerCoor.x > -playerSpriteWidth * 4 &&
      event.offsetY - playerCoor.y < playerSpriteHeight * 4 &&
      event.offsetY - playerCoor.y > -playerSpriteHeight
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
  canvas?.addEventListener("mouseup", mouseReleaseHandler);
}

export {
  start,
  playerSelected,
  screenSide,
  prevMousePos,
  playerCoor,
  Controls,
};
