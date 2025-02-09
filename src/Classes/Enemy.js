export default class Enemy {
  constructor(x, y, width, height, speed, hp) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.hp = hp;

    this.images = [
      new Image(), // BlueAlien1
      new Image(), // BlueAlien2
    ];

    this.collideSound = new Audio('snd/SpaceShipDestroyedSmall.mp3')

    // load
    this.images[0].src = 'img/Aliens/BlueAlien1.png';
    this.images[1].src = 'img/Aliens/BlueAlien2.png';
  }

  move() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.getColor();
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.hp, this.x + this.width / 2, this.y + this.height / 2);
  }

  isDestroyed() {
    return this.hp <= 0;
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  getColor() {
    return 'purple'; // template
  }

  checkCollision(player) {
    const hitboxes = player.getHitboxes();

    return hitboxes.some(hitbox => {
      const adjustedHeight = this.height; // extra
      return (
        this.x < hitbox.x + hitbox.width &&
        this.x + this.width > hitbox.x &&
        this.y < hitbox.y + hitbox.height &&
        this.y + adjustedHeight > hitbox.y
      );
    });
  }
}