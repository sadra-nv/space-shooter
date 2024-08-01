import { playerCoor, playerSelected, start } from "./controls";
import { player } from "./player";

// setting up lasers
const lasers: InitLaserPair[] = [];
let laserCounter = 0;

class InitLaserPair {
  velocity;
  drawnFrame;
  y;
  single;
  constructor() {
    (this.velocity = 0),
      (this.drawnFrame = 0),
      (this.y = playerCoor.y),
      (this.single = {
        right: {
          destroy: false,
          x: playerCoor.x + player.spriteWidth / 2 + player.spriteWidth * 3,
        },
        left: {
          destroy: false,
          x: playerCoor.x + player.spriteWidth / 2,
        },
      });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = "red";
    ctx.shadowOffsetY = 20;
    ctx.shadowBlur = 100;
    ctx.fillStyle = "red";
    if (!this.single.right.destroy) {
      ctx.fillRect(this.single.right.x, this.y - 10 - this.velocity, 3, 40);
    }
    if (!this.single.left.destroy) {
      ctx.fillRect(this.single.left.x, this.y - 10 - this.velocity, 3, 40);
    }
  }
}

function PlayerLasers(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  const isPlayerSelected = playerSelected;

  if (start && ctx) {
    // rendering lasers based on the lasers array
    for (let index = 0; index < lasers.length; index++) {
      const laserPair = lasers[index];
      if (laserPair.drawnFrame >= 30) {
        laserPair.drawnFrame = 0;
      }

      laserPair.draw(ctx);

      laserPair.velocity += 20;

      laserPair.drawnFrame++;
      if (laserPair.velocity >= canvas.height) {
        lasers.splice(index, 1);
      }
    }

    // pushing new items to the lasers array
    if (isPlayerSelected) {
      const initLaserPair = new InitLaserPair();

      if (lasers.length < 1) {
        lasers.push(initLaserPair);
      } else if (laserCounter >= 60) {
        lasers.push(initLaserPair);
        laserCounter = 0;
      }
    }

    laserCounter++;
  }
}

export { PlayerLasers, lasers };
