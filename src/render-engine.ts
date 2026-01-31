import { beamEnemyNode } from "./beam-enemy";
import { commonEnemyNode } from "./common-enemy";
import { Controls, start } from "./controls";
import { GAME_OVER, gameOver } from "./game-cycle";
import { canvas, ctx } from "./main";

import { player, playerNode } from "./player";

let animationID: number;

interface Dot {
  x: number;
  y: number;
  radius: number;
  speed: number;
  color: string;
}

const dots: Dot[] = [];
const numDots = 10;

function createDots() {
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 1,
      speed: Math.random() * 3 + 1,
      color: "white",
    });
  }
}

function updateDots() {
  for (const dot of dots) {
    dot.y += dot.speed;
    if (dot.y > canvas.height) {
      dot.y = 0;
      dot.x = Math.random() * canvas.width;
      dot.color = "white";
    }
  }
}

function drawDots(ctx: CanvasRenderingContext2D) {
  for (const dot of dots) {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = dot.color;
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = dot.color;
    ctx.fill();
    ctx.closePath();
  }
}

function RenderEngine() {
  if (!ctx) return;
  let time = Date.now();

  Controls();
  createDots();

  const renderer = () => {
    if (!ctx) return;

    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;

    if (GAME_OVER) {
      return;
    }
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    playerNode({ deltaTime });

    beamEnemyNode(ctx, canvas, deltaTime);

    commonEnemyNode(ctx, canvas, deltaTime);

    drawDots(ctx);
    if (start) {
      updateDots();
    }

    if (player.destroyed) {
      gameOver();
    }

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    animationID = window.requestAnimationFrame(renderer);
  };

  renderer();
}

export { RenderEngine, animationID };
