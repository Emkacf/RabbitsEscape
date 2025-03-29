import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
  bunny: Phaser.Physics.Arcade.Sprite | undefined;
  fox: Phaser.Physics.Arcade.Sprite | undefined;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  platforms: Phaser.Physics.Arcade.StaticGroup | undefined;
  line?: Phaser.GameObjects.Line;
  mainLayer?: Phaser.Tilemaps.TilemapLayer;
  objectsLayer?: Phaser.Tilemaps.TilemapLayer;
  endGame: boolean = false;

  constructor() {
    super("Game scene");
  }

  preload() {
    this.load.image("background", "assets/forest_bckg.png");
    this.load.image("carrot", "assets/carrot.png");
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

    this.load.spritesheet("bunny_idle", "assets/bunny_idle.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("fox", "assets/fox_spritesheet.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.tilemapTiledJSON("map", "assets/map.json");
  }

  create() {
    this.add.image(310, 230, "background").setScrollFactor(0).scale = 0.61;
    this.add.image(200, 450, "carrot");
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset-tiles", "tiles", 18, 18);

    const bckgLayer = map.createLayer("background", tileset!, 0, 0);
    const mainLayer = map.createLayer("main", tileset!, 0, 0);
    if (mainLayer) this.mainLayer = mainLayer;
    const objectsLayer = map.createLayer("objects", tileset!, 0, 0);
    if (objectsLayer) this.objectsLayer = objectsLayer;

    objectsLayer?.setTileIndexCallback(68, this.collectObject, this);
    mainLayer?.setCollisionByExclusion([-1]);

    this.physics.world.bounds.width = mainLayer!.width;
    this.physics.world.bounds.height = mainLayer!.height;

    this.anims.create({
      key: "bunny_running",
      frameRate: 15,
      frames: "bunny",
      repeat: -1,
    });

    this.anims.create({
      key: "bunny_idle",
      frameRate: 2,
      frames: "bunny_idle",
      repeat: -1,
    });

    this.anims.create({
      key: "fox_running",
      frameRate: 10,
      frames: "fox",
      repeat: -1,
    });

    this.bunny = this.physics.add.sprite(100, 300, "bunny");
    this.bunny.setOffset(0, -5);
    this.bunny.setBounce(0.1);
    this.bunny.setCollideWorldBounds(true);

    this.fox = this.physics.add.sprite(0, 300, "fox");
    this.fox.setOffset(0, -10);
    this.fox.setBounce(0.2);
    this.fox.setCollideWorldBounds(true);

    this.physics.add.collider(this.bunny, mainLayer!);
    this.physics.add.collider(this.fox, mainLayer!);
    this.physics.add.overlap(this.bunny, objectsLayer!);

    this.cursors = this.input.keyboard?.createCursorKeys();
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.bunny);

    this.cameras.main.setBackgroundColor("#ccccff");
  }

  update() {
    if (!this.endGame) {
      this.enemyFollows();
    }

    if (this.cursors?.left.isDown) {
      this.bunny?.setVelocityX(-200);
      if (this.bunny) {
        this.bunny.flipX = true;
      }
      if (this.bunny?.body?.touching.down)
        this.bunny?.anims.play("bunny_idle", false);

      this.bunny?.anims.play("bunny_running", true);
    } else if (this.cursors?.right.isDown) {
      this.bunny?.setVelocityX(200);
      if (this.bunny) {
        this.bunny.flipX = false;
      }
      if (this.bunny?.body?.touching.down)
        this.bunny?.anims.play("bunny_idle", false);

      this.bunny?.anims.play("bunny_running", true);
    } else {
      this.bunny?.setVelocityX(0);
      this.bunny?.anims.play("bunny_idle", true);
    }

    if (this.cursors?.space.isDown && this.bunny?.body?.blocked.down) {
      this.bunny?.setVelocityY(-400);
      this.bunny.setAccelerationY(400);
      this.bunny?.anims.play("bunny_idle", false);
    }
  }

  enemyFollows() {
    if (this.fox && this.bunny) {
      const directionX = this.bunny.x - this.fox.x;
      const directionY = this.bunny.y - this.fox.y;

      const speed = 60;
      const jumpSpeed = -250;

      if (
        directionX > -20 &&
        directionX < 20 &&
        directionY > -20 &&
        directionY < 20
      ) {
        this.endGame = true;
        this.scene.start("game-over");
        this.fox.setVelocityX(0);
      } else if (directionX < 0) {
        this.fox.setVelocityX(-speed);
        this.fox.flipX = true;
      } else {
        this.fox.setVelocityX(speed);
        this.fox.flipX = false;
      }

      const isOnGround = this.fox.body?.blocked?.down || false;
      const obstacleAhead = this.detectObstacle();

      if (isOnGround) {
        if (obstacleAhead) this.fox.setVelocityY(jumpSpeed);
        this.fox.anims.play("fox_running", true);
      } else {
        this.fox.anims.play("fox_running", false);
      }
    }
  }

  detectObstacle() {
    if (!this.fox || !this.mainLayer) return false;

    const direction = this.fox.flipX ? -1 : 1;

    const rayStart = {
      x: this.fox.x + direction * 30,
      y: this.fox.y,
    };

    const rayEnd = {
      x: rayStart.x + direction * 30,
      y: rayStart.y - 10,
    };

    const tile = this.mainLayer.getTileAtWorldXY(rayEnd.x, rayEnd.y);

    const groundCheckX = this.fox.x + direction * 60;
    const groundCheckY = this.fox.y + 32;
    const groundTile = this.mainLayer.getTileAtWorldXY(
      groundCheckX,
      groundCheckY
    );

    return tile !== null || groundTile === null;
  }

  collectObject = (
    sprite: Phaser.GameObjects.GameObject,
    tile: Phaser.Tilemaps.Tile
  ) => {
    this.objectsLayer?.removeTileAt(tile.x, tile.y);
    return false;
  };
}
