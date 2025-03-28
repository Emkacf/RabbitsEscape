import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  //knight: Phaser.Physics.Arcade.Sprite | undefined;
  bunny: Phaser.Physics.Arcade.Sprite | undefined;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  platforms: Phaser.Physics.Arcade.StaticGroup | undefined;

  constructor() {
    super("Game scene");
  }

  preload() {
    this.load.spritesheet("tiles", "assets/tilemap.png", {
      frameWidth: 18,
      frameHeight: 18,
    });
    this.load.tilemapTiledJSON("map", "assets/lvl1.json");

    this.load.spritesheet("platforms", "assets/platforms.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("bunny", "assets/bunny_spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.tilemapTiledJSON("map", "assets/map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset-tiles", "tiles", 18, 18);

    const bckgLayer = map.createLayer("background", tileset!, 0, 0);
    const mainLayer = map.createLayer("main", tileset!, 0, 0);
    const objectsLayer = map.createLayer("objects", tileset!, 0, 0);

    mainLayer?.setCollisionBetween(0, 400);

    //create animations
    this.anims.create({
      key: "bunny_running",
      frameRate: 10,
      frames: "bunny",
      repeat: -1,
    });

    this.bunny = this.physics.add.sprite(100, 200, "bunny");

    this.physics.add.collider(this.bunny, mainLayer!);

    this.cursors = this.input.keyboard?.createCursorKeys();
  }

  update() {
    if (this.cursors?.left.isDown) {
      this.bunny?.setVelocityX(-200);
      if (this.bunny) {
        this.bunny.flipX = true;
      }
      if (this.bunny?.body?.touching.down)
        this.bunny?.anims.play("bunny_running", true);
    } else if (this.cursors?.right.isDown) {
      this.bunny?.setVelocityX(200);
      if (this.bunny) {
        this.bunny.flipX = false;
      }
      if (this.bunny?.body?.touching.down)
        this.bunny?.anims.play("bunny_running", true);
    } else {
      this.bunny?.setVelocityX(0);
      //if (this.bunny?.body?.touching.down) this.bunny?.anims.play("idle", true);
      this.bunny?.anims.play("bunny_running", false);
    }

    if (this.cursors?.space.isDown && this.bunny?.body?.blocked.down) {
      this.bunny?.setVelocityY(-400);
      this.bunny.setAccelerationY(400);
    }
  }
}
