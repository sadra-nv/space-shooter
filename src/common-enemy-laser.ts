import { CommonEnemy } from "./common-enemy";
import { playerCoor } from "./controls";
import { player } from "./player";
import { sfx } from "./sfx";

class CommonEnemyLaser {
  velocity;
  drawnFrame;
  y;
  x;
  count: CommonEnemyLaser[];
  deltaTime: number;

  constructor(commonEnemy: CommonEnemy, deltaTime: number) {
    this.velocity = 0;
    this.drawnFrame = 0;
    this.y = commonEnemy.y + commonEnemy.spriteHeight * 3;
    this.x = commonEnemy.x + 5;
    this.count = [];
    this.deltaTime = deltaTime;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    commonEnemy: CommonEnemy,
    canvas: HTMLCanvasElement,
    index: number,
  ) {
    ctx.shadowColor = "red";
    ctx.shadowOffsetY = 20;
    ctx.shadowBlur = 100;
    ctx.fillStyle = "red";
    this.y += this.velocity * 0.02 * this.deltaTime;
    this.velocity++;
    ctx.fillRect(this.x, this.y, 3, 40);

    if (this.y >= canvas.height) {
      commonEnemy.lasers.splice(index, 1);
    }
  }

  colision() {
    if (
      this.x > playerCoor.x &&
      this.x < playerCoor.x + player.spriteWidth * 4 &&
      this.y > playerCoor.y &&
      this.y < playerCoor.y + player.spriteHeight * 4
    ) {
      player.destroyed = true;
    }
  }
}

function commonEnemyLaser(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  commonEnemy: CommonEnemy,
  deltaTime: number,
) {
  for (let index = 0; index < commonEnemy.lasers.length; index++) {
    const commonEnemyLaser = commonEnemy.lasers[index];
    commonEnemyLaser.draw(ctx, commonEnemy, canvas, index);

    commonEnemyLaser.colision();
  }

  // pushing new items to the lasers array
  if (commonEnemy.laserDrawnFrame >= 200 && !commonEnemy.destroyed) {
    sfx.laser2.play();
    const commonEnemyLaser = new CommonEnemyLaser(commonEnemy, deltaTime);
    commonEnemy.lasers.push(commonEnemyLaser);
    commonEnemy.laserDrawnFrame = 0;
  }
  commonEnemy.laserDrawnFrame++;
}

export { commonEnemyLaser, CommonEnemyLaser };
