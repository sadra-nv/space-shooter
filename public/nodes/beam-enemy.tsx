import beamEnemySpriteSheet from "../assets/beam-enemy.png";
import ResourceLoader from "../resources/loader";
import { SpriteSheet, lasers } from "./player";

type BeamEnemies = {
  drawnFrame: number;
  laserDrawnFrame: number;
  y: number;
  currentFrame: number;
  laserLength: number;
  velocity: number;
  laserIsFired: boolean;
  laserBuildUpWidth: number;
  laserBuildUpColor: string | CanvasGradient;
  isDestroyed: boolean;
}[];

const beamEnemySprite = ResourceLoader(beamEnemySpriteSheet) as SpriteSheet;
const cols = 3;
const rows = 1;
const beamEnemySpriteWidth = beamEnemySprite?.src?.width / cols;
const beamEnemySpriteHeight = beamEnemySprite?.src?.height / rows;

let beamEnemyShadowColor = "blue";

export const beamEnemies: BeamEnemies = [
  {
    drawnFrame: 0,
    laserDrawnFrame: 0,
    y: -50,
    currentFrame: 2,
    laserLength: 5,
    velocity: 1,
    laserIsFired: false,
    laserBuildUpWidth: 0,
    laserBuildUpColor: "blue",
    isDestroyed: false,
  },
  {
    drawnFrame: 0,
    laserDrawnFrame: 0,
    y: -50,
    currentFrame: 2,
    laserLength: 5,
    velocity: 1,
    laserIsFired: false,
    laserBuildUpWidth: 0,
    laserBuildUpColor: "blue",
    isDestroyed: false,
  },
  {
    drawnFrame: 0,
    laserDrawnFrame: 0,
    y: -50,
    currentFrame: 2,
    laserLength: 5,
    velocity: 1,
    laserIsFired: false,
    laserBuildUpWidth: 0,
    laserBuildUpColor: "blue",
    isDestroyed: false,
  },
];

export default function beamEnemy(
  ctx: CanvasRenderingContext2D,
  // beamEnemyX: number[],
  start: boolean,
  canvas: HTMLCanvasElement
) {
  if (start) {
    for (let index = 0; index < beamEnemies.length; index++) {
      const beamEnemy = beamEnemies[index];
      const beamEnemySrcX = beamEnemy.currentFrame * beamEnemySpriteWidth;
      const beamEnemyX =
        beamEnemySpriteWidth * 2 +
        (canvas.width / beamEnemies.length) * index +
        1;

      if (beamEnemySprite?.src && beamEnemySprite?.isLoaded) {
        ctx.shadowColor = beamEnemyShadowColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 0;

        ctx.drawImage(
          beamEnemySprite.src,
          beamEnemySrcX,
          0,
          beamEnemySpriteWidth,
          beamEnemySpriteHeight,
          beamEnemyX,
          (beamEnemy.y += beamEnemy.velocity),
          beamEnemySpriteWidth * 3,
          beamEnemySpriteHeight * 3
        );

        // beamEnemySrcX = beamEnemyCurrentFrame * beamEnemySpriteWidth;
        beamEnemy.drawnFrame++;

        //   MOVING DOWN FROM THE SCREEN TOP
        if (beamEnemy.drawnFrame >= 10) {
          if (beamEnemy.velocity == 0) {
            beamEnemy.velocity = 0;
            beamEnemy.currentFrame !== 0 && beamEnemy.currentFrame--;
          } else if (beamEnemy.y >= 50) {
            beamEnemy.velocity--;
          } else if (beamEnemy.y < 50) {
            beamEnemy.velocity++;
          }
          beamEnemy.drawnFrame = 0;
        }

        // SHOOTING THE LASER
        if (beamEnemy.currentFrame == 0) {
          // TURNING THE LASER ON
          if (beamEnemy.laserDrawnFrame >= 50 && !beamEnemy.laserIsFired) {
            const gradient = ctx.createLinearGradient(
              beamEnemyX + (beamEnemySpriteWidth * 3) / 2 - 12,
              0,
              beamEnemyX + (beamEnemySpriteWidth * 3) / 2 + 9,
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
              beamEnemyX + (beamEnemySpriteWidth * 3) / 2 - 12,
              beamEnemy.y + beamEnemySpriteHeight * 3 - 25,
              20,
              beamEnemy.laserLength,
              20
            );
            ctx.fill();
            beamEnemy.laserLength += 30;
            if (beamEnemy.laserLength >= canvas.height * 3) {
              beamEnemy.laserDrawnFrame = 0;
              beamEnemy.laserLength = 0;
              beamEnemy.laserIsFired = true;
            }
          }

          // TURNING THE LASER OFF
          if (beamEnemy.laserDrawnFrame >= 150) {
            beamEnemy.laserIsFired = false;
            beamEnemy.laserDrawnFrame = 0;
          }

          if (!beamEnemy.laserIsFired) {
            if (beamEnemy.laserDrawnFrame >= 0) {
              const gradient = ctx.createLinearGradient(
                beamEnemyX + (beamEnemySpriteWidth * 3) / 2 + 10,
                0,
                beamEnemyX + (beamEnemySpriteWidth * 3) / 2 - 10,
                0
              );
              gradient.addColorStop(0, "blue");
              gradient.addColorStop(0.5, "skyblue");
              gradient.addColorStop(1, "blue");
              beamEnemy.laserBuildUpColor = gradient;
              beamEnemy.laserBuildUpWidth = 2;
            }
            if (beamEnemy.laserDrawnFrame >= 20) {
              beamEnemy.laserBuildUpWidth = 5;
            }
            if (beamEnemy.laserDrawnFrame >= 40) {
              beamEnemy.laserBuildUpWidth = 10;
            }
            if (beamEnemy.laserDrawnFrame >= 50) {
              beamEnemy.laserBuildUpWidth = 10;
              beamEnemy.laserBuildUpColor = "transparent";
            }
          }

          // THE BUILD UP
          beamEnemyShadowColor = "transparent";
          ctx.beginPath();

          ctx.fillStyle = beamEnemy.laserBuildUpColor;
          ctx.shadowColor = "blue";
          ctx.shadowBlur = 50;
          ctx.shadowOffsetY = 0;
          ctx.arc(
            beamEnemyX + (beamEnemySpriteWidth * 3) / 2 - 1,
            beamEnemy.y + beamEnemySpriteHeight * 3 - 15,
            beamEnemy.laserBuildUpWidth,
            0,
            Math.PI * 2,
            false
          );
          ctx.fill();

          beamEnemy.laserDrawnFrame++;
        }
      }

      //COLISION DETECTION
      if (lasers[0] && start) {
        const distanceX = beamEnemyX - lasers[0].x;
        const distanceY = lasers[0].y - 10 - lasers[0].velocity - beamEnemy.y;
        if (
          Math.abs(distanceX) - beamEnemySpriteWidth <= beamEnemySpriteWidth &&
          distanceY - beamEnemySpriteHeight * 2 + 10 <= 0
        ) {
          console.log("hit");

          ctx.beginPath();
          ctx.fillStyle = "red";
          ctx.shadowColor = "blue";
          ctx.shadowBlur = 3;
          ctx.shadowOffsetY = 5;
          // ctx.roundRect(canvas.width / 2 - 50, canvas.height / 2, 20, 50, 20);
          // ctx.fill();

          ctx.fillText("Got'em!!!", canvas.width / 2 - 60, canvas.height / 2);
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        // console.log(Math.abs(distanceX) - beamEnemySpriteWidth * 2 + 10);
      }
    }
  }
}
