import ResourceLoader from "../resources/loader";
import shipSpriteSheet from "../assets/tyrian-space-ship.png";
import engineSpriteSheet from "../assets/jet-engine-sprite.png";
// import { laserDrawnFrame } from "./laser";
// import { laserDrawnFrame } from "./laser";

export interface SpriteSheet {
  src: HTMLImageElement;
  isLoaded: boolean;
}

type Lasers = {
  velocity: number;
  drawnFrame: number;
  y: number;
  x: number;
}[];

// PLAYER VARIABLES
const playerSprite = ResourceLoader(shipSpriteSheet) as SpriteSheet;
const cols = 5;
const rows = 1;
export const playerSpriteWidth = playerSprite?.src?.width / cols;
export const playerSpriteHeight = playerSprite?.src?.height / rows;
// const totalFrames = 6;
let playerCurrentFrame = 2;
let playerSrcX = 0;
const srcY = 0;
let playerDrawnFrame = 0;

// ENGINE FIRE VARIABLES
const engineSprite = ResourceLoader(engineSpriteSheet) as SpriteSheet;
const engineSpriteWidth = engineSprite?.src?.width / cols;
const engineSpriteHeight = engineSprite?.src?.height / rows;
let engineSrcX = 0;
let engineCurrentFrame = 2;
let engineDrawnFrame = 0;
let engineSpriteXOffset = 20;

// LASER VARIABLES
export const lasers: Lasers = [];
let laserCounter = 0;

export default function player(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  screenSide: "LEFT" | "RIGHT" | "NONE",
  isPlayerSelected: boolean,
  start: boolean,
  canvas: HTMLCanvasElement
) {
  // ANIMATING SHIP SPRITE BASED ON MOUSE MOVEMENT
  if (playerSprite?.src && playerSprite?.isLoaded) {
    if (isPlayerSelected) {
      ctx.shadowColor = "gray";
      ctx.shadowBlur = 1;
    }
    ctx.drawImage(
      playerSprite.src,
      playerSrcX,
      srcY,
      playerSpriteWidth,
      playerSpriteHeight,
      x,
      y,
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
  if (isPlayerSelected && engineSprite?.src && engineSprite?.isLoaded) {
    ctx.shadowColor = "orange";
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 20;
    ctx.drawImage(
      engineSprite.src,
      engineSrcX,
      srcY,
      engineSpriteWidth,
      engineSpriteHeight,
      x + engineSpriteXOffset,
      y + playerSpriteHeight * 4 - 5,
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
  if (start) {
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
        y: y,
        x: x,
      });
    } else if (laserCounter >= 30 && isPlayerSelected) {
      lasers.push({
        velocity: 0,
        drawnFrame: 0,
        y: y,
        x: x,
      });
      laserCounter = 0;
    }

    laserCounter++;
  }
}
