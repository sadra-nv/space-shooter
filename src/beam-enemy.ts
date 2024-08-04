import { playerCoor, start } from "./controls";
import { ExplosionSheet } from "./explosion-sheet";
// import { InitSprite, resources } from "./img-bucket";
import { increaseScore } from "./main";
import { player } from "./player";
import { lasers } from "./player-lasers";
import { sfx } from "./sfx";
import { SpriteSheet } from "./sprite-sheet";

class BeamEnemy extends SpriteSheet {
  laserDrawnFrame;
  y;
  x;
  laserLength;
  velocity;
  laserIsFired;
  laserBuildUpWidth;
  laserBuildUpColor: string | CanvasGradient;
  shadowColor;
  id;
  invisibility;
  hp;
  explosionFlag;
  gravity;
  gravityDrawnFrame;
  constructor(
    cols: number,
    rows: number,
    sprite: HTMLImageElement,
    spriteSrcX: number,
    spriteSrcY: number,
    currentFrame: number,
    drawnFrame: number,
    y: number,
    id: number
  ) {
    super(cols, rows, sprite, spriteSrcX, spriteSrcY, currentFrame, drawnFrame);
    this.laserDrawnFrame = 0;
    this.y = y;
    this.x = 0;
    this.laserLength = 5;
    this.velocity = 1;
    this.laserIsFired = false;
    this.laserBuildUpWidth = 0;
    this.laserBuildUpColor = "blue";
    this.shadowColor = "blue";
    this.id = id;
    this.invisibility = true;
    this.hp = 6;
    this.explosionFlag = false;
    this.gravity = 0;
    this.gravityDrawnFrame = 0;
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 0;

    if (this.gravityDrawnFrame > 10 && this.laserIsFired) {
      this.gravity++;
      this.velocity += this.gravity;
      this.gravity = 0;
      this.gravityDrawnFrame = 0;
    }
    this.gravityDrawnFrame++;

    if (this.y > canvas.height + 200) {
      sceneDrawnFrame = 0;
      beamEnemies.length = 0;
    }

    this.y += this.velocity;

    ctx.drawImage(
      this.sprite,
      this.spriteSrcX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth * 3,
      this.spriteHeight * 3
    );
  }

  moveDown() {
    if (this.drawnFrame >= 15) {
      if (this.velocity == 0) {
        this.velocity = 0;
        this.currentFrame !== 0 && this.currentFrame--;
      } else if (this.y >= 50) {
        this.velocity--;
      } else if (this.y < 50) {
        this.velocity++;
      }
      this.drawnFrame = 0;
    }
  }

  laserON(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    if (
      this.laserDrawnFrame >= 50 &&
      !this.laserIsFired &&
      this.currentFrame == 0
    ) {
      const gradient = ctx.createLinearGradient(
        this.x + (this.spriteWidth * 3) / 2 - 12,
        0,
        this.x + (this.spriteWidth * 3) / 2 + 9,
        0
      );
      gradient.addColorStop(0, "blue");
      gradient.addColorStop(0.5, "skyblue");
      gradient.addColorStop(1, "blue");
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.shadowColor = "blue";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 0;
      ctx.roundRect(
        this.x + (this.spriteWidth * 3) / 2 - 12,
        this.y + this.spriteHeight * 3 - 25,
        20,
        this.laserLength,
        20
      );
      ctx.fill();
      this.laserLength += 30;
      if (this.laserLength >= canvas.height * 3) {
        this.laserDrawnFrame = 0;
        this.laserLength = 0;
        this.laserIsFired = true;
      }
    }

    // putting some time between the laser beam shots
    // if (this.laserDrawnFrame >= 150 && this.currentFrame == 0) {
    //   this.laserIsFired = false;
    //   this.laserDrawnFrame = 0;
    // }
  }

  buildUP(ctx: CanvasRenderingContext2D) {
    if (this.currentFrame == 0) {
      if (!this.laserIsFired) {
        if (this.laserDrawnFrame >= 0) {
          const gradient = ctx.createLinearGradient(
            this.x + (this.spriteWidth * 3) / 2 + 10,
            0,
            this.x + (this.spriteWidth * 3) / 2 - 10,
            0
          );
          gradient.addColorStop(0, "blue");
          gradient.addColorStop(0.5, "skyblue");
          gradient.addColorStop(1, "blue");
          this.laserBuildUpColor = gradient;
          this.laserBuildUpWidth = 2;
        }
        if (this.laserDrawnFrame >= 20) {
          this.laserBuildUpWidth = 5;
        }
        if (this.laserDrawnFrame >= 40) {
          this.laserBuildUpWidth = 10;
        }
        if (this.laserDrawnFrame >= 50) {
          this.laserBuildUpWidth = 10;
          this.laserBuildUpColor = "transparent";
        }
      }

      this.shadowColor = "transparent";
      this.invisibility = false;
      ctx.beginPath();

      ctx.fillStyle = this.laserBuildUpColor;
      ctx.shadowColor = "blue";
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 0;
      ctx.arc(
        this.x + (this.spriteWidth * 3) / 2 - 1,
        this.y + this.spriteHeight * 3 - 15,
        this.laserBuildUpWidth,
        0,
        Math.PI * 2,
        false
      );
      ctx.fill();

      this.laserDrawnFrame++;
    }
  }

  playerLaserColision(ctx: CanvasRenderingContext2D, index: number) {
    if (lasers[0]) {
      if (
        lasers[0].single.left.x > this.x &&
        lasers[0].single.left.x < this.x + this.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > this.y &&
        lasers[0].y - 10 - lasers[0].velocity < this.y + this.spriteHeight * 3
      ) {
        lasers[0].single.left.destroy = true;

        if (!this.invisibility) {
          this.hp--;
          this.explosionFlag = true;
          sfx.explosion.play();
          if (this.hp === 0) {
            beamEnemies.splice(index, 1);
            sceneDrawnFrame = 0;
            increaseScore(30);
          }
        }
      }
      if (
        lasers[0].single.right.x > this.x &&
        lasers[0].single.right.x < this.x + this.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > this.y &&
        lasers[0].y - 10 - lasers[0].velocity < this.y + this.spriteHeight * 3
      ) {
        lasers[0].single.right.destroy = true;
        if (!this.invisibility) {
          this.hp--;
          this.explosionFlag = true;
          sfx.explosion.play();
          if (this.hp === 0) {
            beamEnemies.splice(index, 1);
            sceneDrawnFrame = 0;
            increaseScore(30);
          }
        }
      }
    }

    explosion.explode(ctx, this, 2);
  }

  cannonColision() {
    if (
      !this.laserIsFired &&
      this.x + (this.spriteWidth * 3) / 2 - 12 > playerCoor.x &&
      this.x + (this.spriteWidth * 3) / 2 - 12 <
        playerCoor.x + player.spriteWidth * 4 &&
      this.spriteHeight * 3 - 25 + this.laserLength > playerCoor.y &&
      playerCoor.y > this.y
    ) {
      player.destroyed = true;
    }
  }
}

const beamEnemies: BeamEnemy[] = [];
let sceneDrawnFrame = 0;

const explosionSprite = document.querySelector(
  "#explosion"
) as HTMLImageElement;

const beamEnemySprite = document.querySelector(
  "#beam-enemy"
) as HTMLImageElement;

const explosion = new ExplosionSheet(9, 1, explosionSprite, 0, 0, 1, 0);
function beamEnemyNode(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  if (start) {
    for (let index = 0; index < beamEnemies.length; index++) {
      const beamEnemy = beamEnemies[index];
      beamEnemy.spriteSrcX = beamEnemy.currentFrame * beamEnemy.spriteWidth;
      beamEnemy.x =
        canvas.width / 2 + beamEnemy.id - beamEnemy.spriteWidth * 1.5;

      // drawing the enemies
      beamEnemy.draw(ctx, canvas);
      beamEnemy.drawnFrame++;

      // MOVING DOWN FROM THE SCREEN TOP
      beamEnemy.moveDown();

      // TURNING THE LASER ON
      beamEnemy.laserON(ctx, canvas);

      // THE LASER BUILD UP
      beamEnemy.buildUP(ctx);

      //COLISION DETECTION
      beamEnemy.playerLaserColision(ctx, index);

      // beamEnemy.laserLength
      beamEnemy.cannonColision();
    }

    // pushing new items to the enemy array
    if (beamEnemies.length < 1 && sceneDrawnFrame >= 200) {
      const beamCannonEnemy = new BeamEnemy(
        3,
        1,
        beamEnemySprite,
        0,
        0,
        2,
        0,
        10,
        0
      );
      const beamCannonEnemy2 = new BeamEnemy(
        3,
        1,
        beamEnemySprite,
        0,
        0,
        2,
        0,
        10,
        canvas.width / 3
      );
      const beamCannonEnemy3 = new BeamEnemy(
        3,
        1,
        beamEnemySprite,
        0,
        0,
        2,
        0,
        10,
        -canvas.width / 3
      );
      sceneDrawnFrame > 190 && sfx.cannon.play();
      if (window.innerWidth > 570) {
        beamEnemies.push(beamCannonEnemy, beamCannonEnemy2, beamCannonEnemy3);
      } else {
        beamEnemies.push(beamCannonEnemy2, beamCannonEnemy3);
      }
      sceneDrawnFrame = 0;
    }
    sceneDrawnFrame++;
  }
}

export { BeamEnemy, beamEnemyNode };
