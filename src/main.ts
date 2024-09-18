import "./style.css";
import { RenderEngine } from "./render-engine";

const canvas = <HTMLCanvasElement>document.querySelector("#scene");
canvas.addEventListener("click", () => {});
const drawCanvas = () => {
  canvas.height = window.innerHeight;
  if (window.innerWidth < 570) {
    canvas.width = window.innerWidth;
    return;
  }
  canvas.width = (window.innerWidth / 4) * 3;
};

let score = 0;
const scoreTracker = document.querySelector("#score");

const increaseScore = (amount: number) => {
  score += amount;
  if (scoreTracker) {
    scoreTracker.innerHTML = score.toString();
  }
};

drawCanvas();

window.addEventListener("resize", drawCanvas);

const ctx = canvas.getContext("2d");

document.onload = RenderEngine;

export { canvas, ctx, increaseScore, score };
