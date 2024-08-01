import beamEnemy from "./beam-enemy";
import { Controls } from "./controls";
import { canvas, ctx } from "./main";

import { playerNode } from "./player";

let animationID: number;

function RenderEngine() {
  if (!ctx) return;
  Controls();

  const renderer = () => {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    playerNode();

    // RENDERING THE BEAM SHOOTING ENEMIES
    beamEnemy(ctx, canvas);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    animationID = window.requestAnimationFrame(renderer);
  };

  renderer();
}

export { RenderEngine, animationID };
