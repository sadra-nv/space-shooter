let astroidDrawnFrame = 0;

const astroidVelocity = { dx: 0, dy: 0 };

export default function Astroid(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  const drawAstroid = () => {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(
      (x += astroidVelocity.dx),
      (y += astroidVelocity.dy),
      50,
      0,
      Math.PI * 2,
      false
    );
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
  };

  drawAstroid();

  astroidVelocity.dx++;
  astroidVelocity.dy++;

  astroidDrawnFrame++;
}
