import { InitSprite } from "./img-bucket";

class SpriteSheet {
  cols;
  rows;
  spriteWidth;
  spriteHeight;
  currentFrame;
  drawnFrame;
  sprite;
  spriteSrcX;
  spriteSrcY;
  constructor(
    cols: number,
    rows: number,
    sprite: InitSprite,
    spriteSrcX: number,
    spriteSrcY: number,
    currentFrame: number,
    drawnFrame: number
  ) {
    this.cols = cols;
    this.rows = rows;
    this.sprite = sprite;
    this.spriteHeight = this.sprite.image.height / this.rows;
    this.spriteWidth = this.sprite.image.width / this.cols;
    this.spriteSrcX = spriteSrcX;
    this.spriteSrcY = spriteSrcY;
    this.currentFrame = currentFrame;
    this.drawnFrame = drawnFrame;
  }
}

export { SpriteSheet };
