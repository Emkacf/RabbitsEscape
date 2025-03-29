import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("main-menu");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    // Play button
    const startButton = this.add
      .rectangle(width * 0.5, height * 0.5, 150, 50, 0x454545)
      .setInteractive();

    this.add.text(startButton.x, startButton.y, "Start").setOrigin(0.5);

    startButton.on("pointerdown", () => {
      this.scene.start("Game scene");
    });
  }

  update() {}
}
