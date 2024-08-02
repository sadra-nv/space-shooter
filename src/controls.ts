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
      if (grabbed) {
        canvas.style.cursor = "grabbing";
      }
    } else {
      canvas.style.cursor = "default";
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

  canvas?.addEventListener("mousemove", mouseMoveHandler);
  canvas?.addEventListener("mousedown", mousePressedHandler);
  window?.addEventListener("mouseup", mouseReleaseHandler);

  const handleTouchCoor = (event: TouchEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.targetTouches[0].pageX - rect.left;
    const y = event.targetTouches[0].pageY - rect.top;

    return { x: x, y: y };
  };

  canvas.addEventListener("touchmove", (event: TouchEvent) => {
    const touchCoor = handleTouchCoor(event);
    if (!touchCoor) return;

    if (
      playerSelected &&
      touchCoor?.x < canvas.width - player.spriteWidth * 3 &&
      touchCoor?.x > player.spriteWidth &&
      touchCoor.y > player.spriteHeight &&
      touchCoor.y < canvas.height - player.spriteHeight
    ) {
      playerCoor.x = touchCoor.x - 25;
      playerCoor.y = touchCoor.y - player.spriteHeight * 3;
    }

    if (playerSelected) {
      if (touchCoor.x - prevMousePos < 0) {
        screenSide = "LEFT";
      } else if (touchCoor.x - prevMousePos > 0) {
        screenSide = "RIGHT";
      }
    }

    if (
      touchCoor.x - playerCoor.x < player.spriteWidth * 4 &&
      touchCoor.x - playerCoor.x > -player.spriteWidth * 4 &&
      touchCoor.y - playerCoor.y < player.spriteHeight * 4 &&
      touchCoor.y - playerCoor.y > -player.spriteHeight
    ) {
      if (!grabbed) {
        canvas.style.cursor = "grab";
      }
      if (grabbed) {
        canvas.style.cursor = "grabbing";
      }
    } else {
      canvas.style.cursor = "default";
    }

    prevMousePos = touchCoor.x;
  });

  canvas.addEventListener("touchstart", (event: TouchEvent) => {
    const touchCoor = handleTouchCoor(event);
    if (!touchCoor) return;

    if (
      touchCoor.x - playerCoor.x < player.spriteWidth * 4 &&
      touchCoor.x - playerCoor.x > -player.spriteWidth * 4 &&
      touchCoor.y - playerCoor.y < player.spriteHeight * 4 &&
      touchCoor.y - playerCoor.y > -player.spriteHeight
    ) {
      start = true;
      playerSelected = true;
      canvas.style.cursor = "grabbing";
      grabbed = true;
    }
  });

  const touchEndHandler = () => {
    playerSelected = false;
    screenSide = "NONE";
    canvas.style.cursor = "default";
    grabbed = false;
  };

  canvas.addEventListener("touchend", touchEndHandler);
  canvas.addEventListener("touchcancel", touchEndHandler);
}

export {
  start,
  playerSelected,
  screenSide,
  prevMousePos,
  playerCoor,
  Controls,
};
