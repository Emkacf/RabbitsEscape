import Phaser from "phaser";

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;

    const text =
      "The relentless fox has caught you.\nYour brave journey ends as your family falls prey to its hunger.";

    const styledText = this.add.text(width * 0.5, height * 0.35, text, {
      fontSize: "22px",
      color: "red",
      align: "center",
      wordWrap: { width: width - 100 },
    });
    styledText.setOrigin(0.5);

    // Play button
    const gameOverButton = this.add
      .rectangle(width * 0.5, height * 0.7, 200, 50, 0x556677)
      .setInteractive();

    this.add
      .text(gameOverButton.x, gameOverButton.y, "Click to try again")
      .setOrigin(0.5);

    gameOverButton.on("pointerdown", () => {
      gameOverButton.fillColor = 0x4445588;
      const goToGame = () => {
        this.scene.start("main-menu");
      };

      this.time.delayedCall(100, goToGame);
    });
  }

  update() {}
}
