import { Controls } from "./controls";
import { ctx } from "./main";

import { playerNode } from "./player";

let animationID: number;

function RenderEngine() {
  if (!ctx) return;
  ctx.imageSmoothingEnabled = false;
  Controls();

  const renderer = () => {
    if (!ctx) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    playerNode();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    animationID = window.requestAnimationFrame(renderer);
  };

  renderer();
}

export { RenderEngine, animationID };
