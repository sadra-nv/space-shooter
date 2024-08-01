import { start } from "./controls";
import { ExplosionSheet } from "./explosion-sheet";
import { InitSprite, resources } from "./img-bucket";
import { lasers } from "./player-lasers";
import { SpriteSheet } from "./sprite-sheet";

class BeamEnemy extends SpriteSheet {
  laserDrawnFrame: number;
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
  constructor(
    cols: number,
    rows: number,
    sprite: InitSprite,
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
    this.hp = 9;
    this.explosionFlag = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = this.shadowColor;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(
      this.sprite.image,
      this.spriteSrcX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      (this.y += this.velocity),
      this.spriteWidth * 3,
      this.spriteHeight * 3
    );
  }

  moveDown() {
    if (this.drawnFrame >= 10) {
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
    if (this.laserDrawnFrame >= 150 && this.currentFrame == 0) {
      this.laserIsFired = false;
      this.laserDrawnFrame = 0;
    }
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

  playerLaserColision(
    ctx: CanvasRenderingContext2D,
    beamEnemy: BeamEnemy,
    index: number
  ) {
    if (lasers[0]) {
      if (
        lasers[0].single.left.x > beamEnemy.x &&
        lasers[0].single.left.x < beamEnemy.x + beamEnemy.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > beamEnemy.y &&
        lasers[0].y - 10 - lasers[0].velocity <
          beamEnemy.y + beamEnemy.spriteHeight * 3
      ) {
        lasers[0].single.left.destroy = true;

        if (!beamEnemy.invisibility) {
          beamEnemy.hp--;
          beamEnemy.explosionFlag = true;
          if (beamEnemy.hp === 0) {
            beamEnemies.splice(index, 1);
            sceneDrawnFrame = 0;
          }
        }
      }
      if (
        lasers[0].single.right.x > beamEnemy.x &&
        lasers[0].single.right.x < beamEnemy.x + beamEnemy.spriteWidth * 3 &&
        lasers[0].y - 10 - lasers[0].velocity > beamEnemy.y &&
        lasers[0].y - 10 - lasers[0].velocity <
          beamEnemy.y + beamEnemy.spriteHeight * 3
      ) {
        lasers[0].single.right.destroy = true;
        if (!beamEnemy.invisibility) {
          beamEnemy.hp--;
          beamEnemy.explosionFlag = true;
          if (beamEnemy.hp === 0) {
            beamEnemies.splice(index, 1);
            sceneDrawnFrame = 0;
          }
        }
      }
    }

    explosion.explode(ctx, beamEnemy, 2);
  }
}

const beamEnemies: BeamEnemy[] = [];
let sceneDrawnFrame = 0;

const explosion = new ExplosionSheet(
  9,
  1,
  resources.images.explosionSpriteSheet,
  0,
  0,
  1,
  0
);
export default function beamEnemy(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  if (start) {
    for (let index = 0; index < beamEnemies.length; index++) {
      const beamEnemy = beamEnemies[index];
      beamEnemy.spriteSrcX = beamEnemy.currentFrame * beamEnemy.spriteWidth;
      beamEnemy.x = canvas.width / 2 + beamEnemy.id - beamEnemy.spriteWidth * 3;

      if (beamEnemy.sprite.image && beamEnemy.sprite.isLoaded) {
        // drawing the enemies
        beamEnemy.draw(ctx);
        beamEnemy.drawnFrame++;

        // MOVING DOWN FROM THE SCREEN TOP
        beamEnemy.moveDown();

        // TURNING THE LASER ON
        beamEnemy.laserON(ctx, canvas);

        // THE LASER BUILD UP
        beamEnemy.buildUP(ctx);
      }

      //COLISION DETECTION
      beamEnemy.playerLaserColision(ctx, beamEnemy, index);
    }

    // pushing new items to the enemy array
    if (beamEnemies.length < 1 && sceneDrawnFrame >= 300) {
      const beamCannonEnemy = new BeamEnemy(
        3,
        1,
        resources.images.beamEnemySpriteSheet,
        0,
        0,
        2,
        0,
        20,
        0
      );
      const beamCannonEnemy2 = new BeamEnemy(
        3,
        1,
        resources.images.beamEnemySpriteSheet,
        0,
        0,
        2,
        0,
        -50,
        canvas.width / 3
      );
      const beamCannonEnemy3 = new BeamEnemy(
        3,
        1,
        resources.images.beamEnemySpriteSheet,
        0,
        0,
        2,
        0,
        -50,
        -canvas.width / 3
      );
      beamEnemies.push(beamCannonEnemy, beamCannonEnemy2, beamCannonEnemy3);
      sceneDrawnFrame = 0;
    }
    sceneDrawnFrame++;
  }
}

export { BeamEnemy };
