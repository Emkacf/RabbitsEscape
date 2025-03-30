import Phaser from "phaser";

export class FinishedScene extends Phaser.Scene {
  constructor() {
    super("game-finished");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    // Play button
    const successButton = this.add
      .rectangle(width * 0.5, height * 0.5, 150, 50, 0x556677)
      .setInteractive();

    this.add.text(successButton.x, successButton.y, "Success").setOrigin(0.5);
  }

  update() {}
}
