// import GameLoop from "./game-loop";
import "./style.css";
// import { playerSelected } from "./controls";
// import { start, screenSide } from "./controls";
import { RenderEngine } from "./render-engine";

const canvas = <HTMLCanvasElement>document.getElementById("scene");
canvas.width = (window.innerWidth / 4) * 3;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

window.onload = RenderEngine;

export { canvas, ctx };

// window.onload = function drawScene() {
//   if (!ctx || !canvas) return;
//   ctx.imageSmoothingEnabled = false;

//   let gravity = 0;

//   let animationID: number;

//   const renderer = () => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

//     // RENDERING PLAYER NODE
//     if (playerSelected) {
//       gravity = 0;
//     } else if (start) {
//       gravity = 1;
//       if (playerCoor.y == canvas.height - playerSpriteHeight * 4) {
//         gravity = 0;
//       }
//     }
//     playerNode(
//       ctx,
//       playerCoor.x,
//       (playerCoor.y += gravity),
//       screenSide,
//       playerSelected,
//       start,
//       canvas
//     );

//     // RENDERING THE BEAM SHOOTING ENEMIES
//     // BeamEnemy(ctx, start, canvas);

//     ctx.shadowBlur = 0;
//     ctx.shadowOffsetY = 0;

//     animationID = window.requestAnimationFrame(renderer);
//   };

//   renderer();
// };
// export { canvas, ctx };
