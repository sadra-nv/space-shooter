import { playerCoor, playerSelected } from "./controls";
import { InitSprite, resources } from "./img-bucket";
import { player } from "./player";
import { SpriteSheet } from "./sprite-sheet";

// setting up the engine fire sprite
class EngineFire extends SpriteSheet {
  xOffset;
  constructor(
    cols: number,
    rows: number,
    sprite: InitSprite,
    spriteSrcX: number,
    spriteSrcY: number,
    currentFrame: number,
    drawnFrame: number
  ) {
    super(cols, rows, sprite, spriteSrcX, spriteSrcY, currentFrame, drawnFrame);
    this.xOffset = 20;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = "orange";
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 20;
    ctx.drawImage(
      engineFire.sprite.image,
      engineFire.spriteSrcX,
      engineFire.spriteSrcY,
      engineFire.spriteWidth,
      engineFire.spriteHeight,
      playerCoor.x + engineFire.xOffset,
      playerCoor.y + player.spriteHeight * 4 - 5,
      engineFire.spriteWidth * 4,
      engineFire.spriteHeight * 4
    );
  }

  animate() {
    this.spriteSrcX = this.currentFrame * this.spriteWidth;
    this.drawnFrame++;

    if (this.drawnFrame >= 10) {
      switch (player.currentFrame) {
        case 0:
          this.xOffset = 10;
          break;
        case 1:
          this.xOffset = 15;
          break;
        case 2:
          this.xOffset = 22;
          break;
        case 3:
          this.xOffset = 27;
          break;
        case 4:
          this.xOffset = 35;
          break;
      }
      if (this.currentFrame > 3) {
        this.currentFrame = 0;
      }
      this.currentFrame++;
      this.drawnFrame = 0;
    }
  }
}

const engineFire = new EngineFire(
  5,
  1,
  resources.images.engineSpriteSheet,
  0,
  0,
  2,
  0
);

function PlayerFire(ctx: CanvasRenderingContext2D) {
  const isPlayerSelected = playerSelected;
  if (
    isPlayerSelected &&
    engineFire.sprite.image &&
    engineFire.sprite.isLoaded &&
    ctx
  ) {
    // drawing the engines fire
    engineFire.draw(ctx);
    // animating the engines fire
    engineFire.animate();
  }
}

export { PlayerFire };
