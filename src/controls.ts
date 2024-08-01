import { canvas } from "./main";
import { player } from "./player";

let start = false;
let playerSelected = false;
let grabbed = false;
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
      event.offsetX < canvas.width - player.spriteWidth * 3 &&
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

    if (
      event.offsetX - playerCoor.x < player.spriteWidth * 4 &&
      event.offsetX - playerCoor.x > -player.spriteWidth * 4 &&
      event.offsetY - playerCoor.y < player.spriteHeight * 4 &&
      event.offsetY - playerCoor.y > -player.spriteHeight
    ) {
      if (!grabbed) {
        canvas.style.cursor = "grab";
      }
    }
    if (grabbed) {
      canvas.style.cursor = "grabbing";
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
      canvas.style.cursor = "grabbing";
      grabbed = true;
    }
  };
  const mouseReleaseHandler = () => {
    playerSelected = false;
    screenSide = "NONE";
    canvas.style.cursor = "default";
    grabbed = false;
  };

  canvas?.addEventListener("pointermove", mouseMoveHandler);
  canvas?.addEventListener("pointerdown", mousePressedHandler);
  window?.addEventListener("pointerup", mouseReleaseHandler);
}

export {
  start,
  playerSelected,
  screenSide,
  prevMousePos,
  playerCoor,
  Controls,
};
