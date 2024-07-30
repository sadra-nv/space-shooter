import { canvas, ctx } from "./main";
import { playerCoor, playerSelected, screenSide, start } from "./controls";
import { resources } from "./img-bucket";

type Lasers = {
  velocity: number;
  drawnFrame: number;
  y: number;
  x: number;
}[];

// setting up the player sprite
const playerSprite = resources.images.playerSpriteSheet;
const cols = 5;
const rows = 1;
const playerSpriteWidth = playerSprite.image.width / cols;
const playerSpriteHeight = playerSprite.image.height / rows;
let playerCurrentFrame = 2;
let playerSrcX = 0;
const srcY = 0;
let playerDrawnFrame = 0;

// setting up the engine fire sprite
const engineSprite = resources.images.engineSpriteSheet;
const engineSpriteWidth = engineSprite.image.width / cols;
const engineSpriteHeight = engineSprite.image.height / rows;
let engineSrcX = 0;
let engineCurrentFrame = 2;
let engineDrawnFrame = 0;
let engineSpriteXOffset = 20;

// setting up lasers
export const lasers: Lasers = [];
let laserCounter = 0;

// setting up gravity
let gravity = 0;

function playerNode() {
  const isPlayerSelected = playerSelected;

  // applying gravity
  if (isPlayerSelected) {
    gravity = 0;
  } else if (start) {
    gravity = 1;
    if (playerCoor.y == canvas.height - playerSpriteHeight * 4) {
      gravity = 0;
    }
  }
  playerCoor.y += gravity;

  // ANIMATING SHIP SPRITE BASED ON MOUSE MOVEMENT
  if (playerSprite.image && playerSprite.isLoaded && ctx) {
    if (isPlayerSelected) {
      ctx.shadowColor = "gray";
      ctx.shadowBlur = 1;
    }
    ctx.drawImage(
      playerSprite.image,
      playerSrcX,
      srcY,
      playerSpriteWidth,
      playerSpriteHeight,
      playerCoor.x,
      playerCoor.y,
      playerSpriteWidth * 4,
      playerSpriteHeight * 4
    );

    playerSrcX = playerCurrentFrame * playerSpriteWidth;
    playerDrawnFrame++;

    if (playerDrawnFrame >= 10) {
      if (screenSide == "LEFT") {
        if (playerCurrentFrame <= 2 && playerCurrentFrame > 0) {
          playerCurrentFrame--;
          playerDrawnFrame = 0;
        }
        if (playerCurrentFrame > 2) {
          playerCurrentFrame--;
          playerDrawnFrame = 0;
        }
      }

      if (screenSide === "RIGHT") {
        if (playerCurrentFrame >= 2 && playerCurrentFrame < 4) {
          playerCurrentFrame++;
          playerDrawnFrame = 0;
        }
        if (playerCurrentFrame < 2) {
          playerCurrentFrame++;
          playerDrawnFrame = 0;
        }
      }

      if (screenSide === "NONE") {
        if (playerCurrentFrame < 2) {
          playerCurrentFrame++;
          playerDrawnFrame = 0;
        }
        if (playerCurrentFrame > 2) {
          playerCurrentFrame--;
          playerDrawnFrame = 0;
        }
      }
    }
  }

  // ANIMATING THE ENGINES FIRE SPRITE
  if (isPlayerSelected && engineSprite.image && engineSprite.isLoaded && ctx) {
    ctx.shadowColor = "orange";
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 20;
    ctx.drawImage(
      engineSprite.image,
      engineSrcX,
      srcY,
      engineSpriteWidth,
      engineSpriteHeight,
      playerCoor.x + engineSpriteXOffset,
      playerCoor.y + playerSpriteHeight * 4 - 5,
      engineSpriteWidth * 4,
      engineSpriteHeight * 4
    );

    engineSrcX = engineCurrentFrame * engineSpriteWidth;
    engineDrawnFrame++;

    if (engineDrawnFrame >= 10) {
      switch (playerCurrentFrame) {
        case 0:
          engineSpriteXOffset = 10;
          break;
        case 1:
          engineSpriteXOffset = 15;
          break;
        case 2:
          engineSpriteXOffset = 22;
          break;
        case 3:
          engineSpriteXOffset = 27;
          break;
        case 4:
          engineSpriteXOffset = 35;
          break;
      }
      if (engineCurrentFrame > 3) {
        engineCurrentFrame = 0;
      }
      engineCurrentFrame++;
      engineDrawnFrame = 0;
    }
  }

  //ANIMATING THE LASERS
  if (start && ctx) {
    for (let index = 0; index < lasers.length; index++) {
      const laser = lasers[index];
      if (laser.drawnFrame >= 30) {
        laser.drawnFrame = 0;
      }

      ctx.shadowColor = "red";
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 100;
      ctx.fillStyle = "red";
      ctx.fillRect(
        laser.x + playerSpriteWidth / 2,
        laser.y - 10 - laser.velocity,
        3,
        40
      );

      ctx.shadowColor = "red";
      ctx.shadowOffsetY = 20;
      ctx.shadowBlur = 100;
      ctx.fillStyle = "red";
      ctx.fillRect(
        laser.x + playerSpriteWidth / 2 + playerSpriteWidth * 3,
        laser.y - 10 - laser.velocity,
        3,
        40
      );

      laser.velocity += 20;

      laser.drawnFrame++;
      if (laser.velocity >= canvas.height) {
        lasers.splice(index, 1);
      }
    }

    if (!lasers[0] && isPlayerSelected) {
      lasers.push({
        velocity: 0,
        drawnFrame: 0,
        y: playerCoor.y,
        x: playerCoor.x,
      });
    } else if (laserCounter >= 30 && isPlayerSelected) {
      lasers.push({
        velocity: 0,
        drawnFrame: 0,
        y: playerCoor.y,
        x: playerCoor.x,
      });
      laserCounter = 0;
    }

    laserCounter++;
  }
}

export { playerSpriteHeight, playerSpriteWidth, playerNode };
