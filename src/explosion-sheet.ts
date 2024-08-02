import { BeamEnemy } from "./beam-enemy";
import { CommonEnemy } from "./common-enemy";
import { InitSprite } from "./img-bucket";
import { SpriteSheet } from "./sprite-sheet";

class ExplosionSheet extends SpriteSheet {
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
  }

  explode(
    ctx: CanvasRenderingContext2D,
    enemy: BeamEnemy | CommonEnemy,
    scale: number
  ) {
    if (enemy.explosionFlag) {
      this.spriteSrcX = this.currentFrame * this.spriteWidth;
      this.drawnFrame++;
      if (this.drawnFrame > 1) {
        ctx.shadowColor = "transparent";
        ctx.drawImage(
          this.sprite.image,
          this.spriteSrcX,
          this.spriteSrcY,
          this.spriteWidth,
          this.spriteHeight,
          enemy.x,
          enemy.y,
          this.spriteWidth * scale,
          this.spriteHeight * scale
        );
        this.currentFrame++;
        this.drawnFrame = 0;

        if (this.currentFrame === 9) {
          this.currentFrame = 1;
          enemy.explosionFlag = false;
        }
      }
    }
  }
}

export { ExplosionSheet };
