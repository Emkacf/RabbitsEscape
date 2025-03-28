import { GameScene } from "./GameScene";
import "./style.scss";
import Phaser from "phaser";

const gameBoard = document.createElement("canvas");
document.body.appendChild(gameBoard);

const GAME_SIZE = {
  width: 800,
  height: 640,
};

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: GAME_SIZE.width,
  height: GAME_SIZE.height,
  canvas: gameBoard,
  scene: GameScene,
  backgroundColor: "#ededed",
  pixelArt: true,
  antialias: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        x: 0,
        y: 400,
      },
    },
  },
};

const game = new Phaser.Game(config);
