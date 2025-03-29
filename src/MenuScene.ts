import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("main-menu");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    // Play button
    const playButton = this.add
      .rectangle(width * 0.5, height * 0.5, 150, 50, 0x454545)
      .setInteractive();

    this.add.text(playButton.x, playButton.y, "Play").setOrigin(0.5);

    playButton.on("pointerdown", () => {
      this.scene.start("Game scene");
    });
  }

  update() {}
}
