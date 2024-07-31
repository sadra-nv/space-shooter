import "./style.css";
import { RenderEngine } from "./render-engine";

const canvas = <HTMLCanvasElement>document.getElementById("scene");
canvas.width = (window.innerWidth / 4) * 3;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

window.onload = RenderEngine;

export { canvas, ctx };
