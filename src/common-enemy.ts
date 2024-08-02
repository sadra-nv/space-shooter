import { CommonEnemyLaser, commonEnemyLaser } from "./common-enemy-laser";
import { start } from "./controls";
import { ExplosionSheet } from "./explosion-sheet";
// import { InitSprite, resources } from "./img-bucket";
import { increaseScore } from "./main";
import { lasers } from "./player-lasers";
import { SpriteSheet } from "./sprite-sheet";

class CommonEnemy extends SpriteSheet {
  gravity;
  velocityX;
  velocityY;
  y;
  x;
  initDrawnFrame;
  shoot;
  laserDrawnFrame;
  lasers: CommonEnemyLaser[];
  destroyed;
  explosionFlag;
  direction;
  constructor(
    cols: number,
    rows: number,
    sprite: HTMLImageElement,
    spriteSrcX: number,
    spriteSrcY: number,
    currentFrame: number,
    drawnFrame: number,
    direction: "RIGHT" | "LEFT"
  ) {
    super(cols, rows, sprite, spriteSrcX, spriteSrcY, currentFrame, drawnFrame);
    this.gravity = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.initDrawnFrame = 0;
    this.y = 0;
    this.x = 0;
    this.shoot = false;
    this.laserDrawnFrame = 200;
    this.lasers = [];
    this.destroyed = false;
    this.explosionFlag = false;
    this.direction = direction;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    index: number
  ) {
    this.spriteSrcX = this.currentFrame * this.spriteWidth;
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 0;
    if (this.initDrawnFrame > 30 && this.laserDrawnFrame > 170) {
      ctx.shadowColor = "red";
    }

    if (this.direction === "RIGHT") {
      this.x = canvas.width - this.spriteWidth * 3 + this.velocityX;
    } else {
      this.x = 0 - this.velocityX;
    }
    this.y = canvas.height / 5 + this.velocityY;

    // removing the off screen enemies
    if (
      (this.direction === "RIGHT" &&
        this.y >= canvas.height + this.spriteHeight * 4) ||
      this.x <= 0 - this.spriteWidth * 4
    ) {
      commonEnemies.splice(index, 1);
      enemiesDrawnFrame = 0;
    } else if (
      (this.direction === "LEFT" &&
        this.y >= canvas.height + this.spriteHeight * 4) ||
      this.x >= canvas.width + this.spriteWidth * 4
    ) {
      commonEnemies.splice(index, 1);
      enemiesDrawnFrame = 0;
    }

    if (!this.destroyed) {
      ctx.drawImage(
        this.sprite,
        this.spriteSrcX,
        this.spriteSrcY,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.spriteWidth * 3,
        this.spriteHeight * 3
      );
    }

    if (this.drawnFrame >= 1) {
      this.velocityX -= 3;
      this.velocityY++;

      if (this.initDrawnFrame > 60) {
        this.shoot = true;
        if (this.direction === "RIGHT") {
          this.currentFrame !== 0 && this.currentFrame--;
        } else {
          this.currentFrame !== 4 && this.currentFrame++;
        }
      }
      this.drawnFrame = 0;
    }
    this.initDrawnFrame++;
    this.drawnFrame++;
  }

  playerLaserColision(ctx: CanvasRenderingContext2D) {
    if (lasers[0]) {
      if (
        !this.destroyed &&
        lasers[0].single.left.x > this.x &&
        lasers[0].single.left.x < this.x + this.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > this.y &&
        lasers[0].y - 10 - lasers[0].velocity < this.y + this.spriteHeight * 3
      ) {
        lasers[0].single.left.destroy = true;
        this.explosionFlag = true;
        this.destroyed = true;
        increaseScore(10);
      }
      if (
        !this.destroyed &&
        lasers[0].single.right.x > this.x &&
        lasers[0].single.right.x < this.x + this.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > this.y &&
        lasers[0].y - 10 - lasers[0].velocity < this.y + this.spriteHeight * 3
      ) {
        lasers[0].single.right.destroy = true;
        this.explosionFlag = true;
        this.destroyed = true;
        increaseScore(10);
      }
    }

    explosion.explode(ctx, this, 2);
  }
}

const commonEnemies: CommonEnemy[] = [];
let sceneDrawnFrame = 0;
let enemiesDrawnFrame = 0;
const explosionSprite = document.querySelector(
  "#explosion"
) as HTMLImageElement;

const commonEnemySprite = document.querySelector(
  "#common-enemy"
) as HTMLImageElement;

const explosion = new ExplosionSheet(9, 1, explosionSprite, 0, 0, 1, 0);

function commonEnemyNode(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  if (start) {
    for (let index = 0; index < commonEnemies.length; index++) {
      const commonEnemy = commonEnemies[index];

      commonEnemy.draw(ctx, canvas, index);

      commonEnemy.shoot && commonEnemyLaser(ctx, canvas, commonEnemy);

      commonEnemy.playerLaserColision(ctx);
    }

    // pushing new items to the enemy array
    if (
      commonEnemies.length <= 4 &&
      sceneDrawnFrame >= 40 &&
      enemiesDrawnFrame >= 100
    ) {
      let direction: "LEFT" | "RIGHT" = "LEFT";
      if (Math.floor(Math.random() * (3 - 1) + 1) === 1) {
        direction = "RIGHT";
      }

      const commonEnemy = new CommonEnemy(
        5,
        1,
        commonEnemySprite,
        0,
        0,
        2,
        0,
        direction
      );

      commonEnemies.push(commonEnemy);
      sceneDrawnFrame = 0;
    }
    sceneDrawnFrame++;
    enemiesDrawnFrame++;
  }
}

export { commonEnemyNode, CommonEnemy };
