import { useEffect, useRef } from "react";
import Player, { playerSpriteHeight, playerSpriteWidth } from "../nodes/player";
import BeamEnemy from "../nodes/beam-enemy";

export default function RenderEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // SETTING UP THE REFENCE TO CANVAS TAG
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctx.font = "64px Brush Script MT";
    let start = false;

    // NODES COORDINATES
    const playerCoor = {
      x: canvas?.width / 2 - playerSpriteWidth,
      y: canvas.height - playerSpriteHeight * 4,
    };

    // CONTROLING PLAYER NODE WITH MOUSE
    let playerSelected = false;
    let screenSide: "LEFT" | "RIGHT" | "NONE"; //USED FOR ANIMATING THE SHIP SPRITE
    let prevMousePos: number;

    const mouseMoveHandler = (event: MouseEvent) => {
      if (
        playerSelected &&
        event.offsetX < canvas.width - playerSpriteWidth * 2 &&
        event.offsetX > playerSpriteWidth &&
        event.offsetY > playerSpriteHeight &&
        event.offsetY < canvas.height - playerSpriteHeight
      ) {
        playerCoor.x = event.offsetX - 25;
        playerCoor.y = event.offsetY - playerSpriteHeight * 3;
      }

      if (playerSelected) {
        if (event.offsetX - prevMousePos < 0) {
          screenSide = "LEFT";
        } else if (event.offsetX - prevMousePos > 0) {
          screenSide = "RIGHT";
        }
      }

      prevMousePos = event.offsetX;
    };
    const mousePressedHandler = (event: MouseEvent) => {
      if (
        event.offsetX - playerCoor.x < playerSpriteWidth * 4 &&
        event.offsetX - playerCoor.x > -playerSpriteWidth * 4 &&
        event.offsetY - playerCoor.y < playerSpriteHeight * 4 &&
        event.offsetY - playerCoor.y > -playerSpriteHeight
      ) {
        start = true;
        playerSelected = true;
      }
    };
    const mouseReleaseHandler = () => {
      playerSelected = false;
      screenSide = "NONE";
    };

    // GRAVITY
    let gravity = 0;

    // THE RENDERING FUNCTION
    let animationID: number;

    const renderer = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // RENDERING PLAYER NODE
      if (playerSelected) {
        gravity = 0;
      } else if (start) {
        gravity = 1;
        if (playerCoor.y == canvas.height - playerSpriteHeight * 4) {
          gravity = 0;
        }
      }
      Player(
        ctx,
        playerCoor.x,
        (playerCoor.y += gravity),
        screenSide,
        playerSelected,
        start,
        canvas
      );

      // RENDERING THE BEAM SHOOTING ENEMIES
      BeamEnemy(ctx, start, canvas);

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      animationID = window.requestAnimationFrame(renderer);
    };

    renderer();

    // EVENT LISTENERS
    canvas?.addEventListener("mousemove", mouseMoveHandler);
    canvas?.addEventListener("mousedown", mousePressedHandler);
    canvas?.addEventListener("mouseup", mouseReleaseHandler);

    return () => {
      window.cancelAnimationFrame(animationID);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas?.removeEventListener("mousedown", mousePressedHandler);
      canvas?.removeEventListener("mouseup", mouseReleaseHandler);
    };
  }, []);

  return (
    <canvas
      className="border-solid border-neutral-50 border-l-2 border-r-2 h-full "
      ref={canvasRef}
      width={(window.innerWidth / 4) * 3}
      height={window.innerHeight}
    >
      well, shall we say the game camera
    </canvas>
  );
}
