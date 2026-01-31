import { canvas, ctx } from "./main";
import { playerCoor, playerSelected, screenSide, start } from "./controls";
// import { InitSprite, resources } from "./img-bucket";
import { PlayerFire } from "./player-fire";
import { PlayerLasers } from "./player-lasers";
import { SpriteSheet } from "./sprite-sheet";

class Player extends SpriteSheet {
  gravity;
  destroyed;
  constructor(
    cols: number,
    rows: number,
    sprite: HTMLImageElement,
    spriteSrcX: number,
    spriteSrcY: number,
    currentFrame: number,
    drawnFrame: number,
  ) {
    super(cols, rows, sprite, spriteSrcX, spriteSrcY, currentFrame, drawnFrame);
    this.gravity = 0;
    this.destroyed = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.destroyed) {
      ctx.drawImage(
        this.sprite,
        this.spriteSrcX,
        this.spriteSrcY,
        this.spriteWidth,
        this.spriteHeight,
        playerCoor.x,
        playerCoor.y,
        this.spriteWidth * 4,
        this.spriteHeight * 4,
      );
    }
  }

  handleGravity(isPlayerSelected: boolean, deltaTime: number) {
    if (isPlayerSelected) {
      this.gravity = 0;
    } else if (start) {
      this.gravity = 1;
      if (playerCoor.y > canvas.height - this.spriteHeight * 4) {
        this.gravity = 0;
      }
    }
    playerCoor.y += this.gravity * deltaTime * 0.2;
  }

  animate() {
    this.spriteSrcX = this.currentFrame * this.spriteWidth;
    this.drawnFrame++;

    if (this.drawnFrame >= 10) {
      if (screenSide == "LEFT") {
        if (this.currentFrame <= 2 && this.currentFrame > 0) {
          this.currentFrame--;
          this.drawnFrame = 0;
        }
        if (this.currentFrame > 2) {
          this.currentFrame--;
          this.drawnFrame = 0;
        }
      }

      if (screenSide === "RIGHT") {
        if (this.currentFrame >= 2 && this.currentFrame < 4) {
          this.currentFrame++;
          this.drawnFrame = 0;
        }
        if (this.currentFrame < 2) {
          this.currentFrame++;
          this.drawnFrame = 0;
        }
      }

      if (screenSide === "NONE") {
        if (this.currentFrame < 2) {
          this.currentFrame++;
          this.drawnFrame = 0;
        }
        if (this.currentFrame > 2) {
          this.currentFrame--;
          this.drawnFrame = 0;
        }
      }
    }
  }
}

const playerSprite = document.querySelector("#player") as HTMLImageElement;
const player = new Player(5, 1, playerSprite, 0, 0, 2, 0);

function playerNode({ deltaTime }: { deltaTime: number }) {
  const isPlayerSelected = playerSelected;

  // applying gravity
  player.handleGravity(isPlayerSelected, deltaTime);
  if (ctx) {
    ctx.shadowBlur = 0;
    if (isPlayerSelected) {
      ctx.shadowColor = "gray";
      ctx.shadowBlur = 1;
    }

    // drawing the player
    player.draw(ctx);

    // ANIMATING SHIP SPRITE BASED ON MOUSE MOVEMENT
    player.animate();
  }

  // ANIMATING THE ENGINES FIRE SPRITE
  PlayerFire(ctx as CanvasRenderingContext2D);

  //ANIMATING THE LASERS
  PlayerLasers(ctx as CanvasRenderingContext2D, canvas, deltaTime);
}

export { player, playerNode };
