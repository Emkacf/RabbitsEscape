import Phaser from "phaser";

export class CreditsScene extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    const titleText = this.add.text(width * 0.5, height * 0.15, "Credits", {
      fontSize: "32px",
      color: "#005555",
      align: "center",
    });
    titleText.setOrigin(0.5);

    const creditsContent =
      "Game Design & Programming:\nEmkacf\n\nArt & Animation:\nEmkacf\nkenney.nl | Pixel Platformer assets";
    const creditsText = this.add.text(
      width * 0.5,
      height * 0.4,
      creditsContent,
      {
        fontSize: "20px",
        color: "#005555",
        align: "center",
        wordWrap: { width: width - 100 },
      }
    );
    creditsText.setOrigin(0.5);

    const backButton = this.add
      .rectangle(width * 0.5, height * 0.8, 200, 50, 0x454545)
      .setInteractive();

    const backButtonText = this.add
      .text(backButton.x, backButton.y, "Back to Menu", {
        fontSize: "20px",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    backButton.on("pointerdown", () => {
      backButton.fillColor = 0x445588;
      this.time.delayedCall(100, () => {
        this.scene.start("main-menu");
      });
    });
  }
}
