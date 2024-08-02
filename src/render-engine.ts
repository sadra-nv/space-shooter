import { beamEnemyNode } from "./beam-enemy";
import { commonEnemyNode } from "./common-enemy";
import { Controls } from "./controls";
import { gameOver } from "./game-cycle";
import { canvas, ctx } from "./main";

import { player, playerNode } from "./player";

let animationID: number;

function RenderEngine() {
  if (!ctx) return;
  Controls();

  const renderer = () => {
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    playerNode();

    beamEnemyNode(ctx, canvas);

    commonEnemyNode(ctx, canvas);

    if (player.destroyed) {
      gameOver();
      // window.location.reload();
    }

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    animationID = window.requestAnimationFrame(renderer);
  };

  renderer();
}

export { RenderEngine, animationID };
