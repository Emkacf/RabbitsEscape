import Phaser from "phaser";
import { GameScene } from "./GameScene";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super("main-menu");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;
    const text =
      "In sprawling fields, a mother rabbit races against time.\n\nWith her young waiting hungrily, she gathers nourishing carrots while evading a relentless fox, driven by the pure instinct to protect her family.For if the fox catches her, it will devour her—and her young ones will perish.";

    const titleText = this.add.text(
      width * 0.5,
      height * 0.1,
      "Rabbit's Escape",
      {
        fontSize: "32px Arial",
        color: "#005588",
        align: "center",
      }
    );
    titleText.setOrigin(0.5);

    const styledText = this.add.text(width * 0.5, height * 0.4, text, {
      fontSize: "18px",
      color: "#005555",
      align: "center",
      wordWrap: { width: width - 100 },
    });
    styledText.setOrigin(0.5);

    const startButton = this.add
      .rectangle(width * 0.5, height * 0.7, 150, 50, 0x454545)
      .setInteractive();

    const creditsButton = this.add
      .rectangle(width * 0.5, height * 0.85, 150, 50, 0x454545)
      .setInteractive();

    this.add
      .text(startButton.x, startButton.y, "Start", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.add
      .text(creditsButton.x, creditsButton.y, "Credits", {
        fontSize: "20px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    startButton.on("pointerdown", () => {
      startButton.fillColor = 0x4445588;

      this.time.delayedCall(100, () => {
        this.scene.add("game-scene", GameScene);
        this.scene.start("game-scene");
      });
    });

    creditsButton.on("pointerdown", () => {
      creditsButton.fillColor = 0x445588;

      this.time.delayedCall(100, () => {
        this.scene.start("credits");
      });
    });
  }

  update() {}
}
