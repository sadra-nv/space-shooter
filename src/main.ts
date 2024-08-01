import "./style.css";
import { RenderEngine } from "./render-engine";

const canvas = <HTMLCanvasElement>document.getElementById("scene");

const drawCanvas = () => {
  canvas.height = window.innerHeight;
  if (window.innerWidth < 570) {
    canvas.width = window.innerWidth;
    return;
  }
  canvas.width = (window.innerWidth / 4) * 3;
};

drawCanvas();

window.addEventListener("resize", drawCanvas);

const ctx = canvas.getContext("2d");

window.onload = RenderEngine;

export { canvas, ctx };
