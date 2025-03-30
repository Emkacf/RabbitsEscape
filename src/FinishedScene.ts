import Phaser from "phaser";

export class FinishedScene extends Phaser.Scene {
  constructor() {
    super("game-finished");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;
    // Finishing text
    const finishingText =
      "Congratulations!\n\nYou've outsmarted the relentless fox and reunited with your hungry babies. Your courage has not only saved your family but also restored hope to the wild. The legacy of your maternal love will echo through the fields forever.";

    this.add
      .text(width * 0.5, height * 0.35, finishingText, {
        font: "22px",
        color: "#005555",
        align: "center",
        wordWrap: { width: width * 0.8 },
      })
      .setOrigin(0.5);

    // Play button
    const successButton = this.add
      .rectangle(width * 0.5, height * 0.7, 150, 50, 0x556677)
      .setInteractive();

    this.add.text(successButton.x, successButton.y, "Credits").setOrigin(0.5);

    successButton.on("pointerdown", () => {
      successButton.fillColor = 0x4445588;

      this.time.delayedCall(100, () => {
        this.scene.start("credits");
      });
    });
  }

  update() {}
}
