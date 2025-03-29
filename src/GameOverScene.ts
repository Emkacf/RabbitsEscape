import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    // Play button
    const gameOverButton = this.add
      .rectangle(width * 0.5, height * 0.5, 150, 50, 0x556677)
      .setInteractive();

    this.add
      .text(gameOverButton.x, gameOverButton.y, "Game Over")
      .setOrigin(0.5);
  }

  update() {}
}
