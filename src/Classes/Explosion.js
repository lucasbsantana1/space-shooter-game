export default class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.maxRadius = 40;
    this.alpha = 1;
    this.duration = 600; // duration in ms
    this.startTime = Date.now();
    this.imageIndex = 0;
    this.images = [
      new Image(), // SmallExplosion1
      new Image(), // SmallExplosion2
      new Image(),  // SmallExplosion3
      new Image()  // SmallExplosion4
    ];

    // Load the images
    this.images[0].src = 'img/Explosions/SmallExplosion1.png';
    this.images[1].src = 'img/Explosions/SmallExplosion2.png';
    this.images[2].src = 'img/Explosions/SmallExplosion3.png';
    this.images[3].src = 'img/Explosions/SmallExplosion4.png';
  }

  update() {
    const elapsedTime = Date.now() - this.startTime;
    const frameDuration = this.duration / 5;

    this.radius = Math.min(this.maxRadius, this.radius + 2);
    this.alpha = 1 - (elapsedTime / this.duration);

    if (elapsedTime >= frameDuration * (this.imageIndex + 1)) {
      this.imageIndex = Math.min(this.images.length - 1, this.imageIndex + 1);
    }

    if (elapsedTime >= this.duration) {
      this.alpha = 0.2;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    const image = this.images[this.imageIndex];
    ctx.drawImage(image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    ctx.restore();
  }

  isAlive() {
    return this.alpha > 0.2;
  }
}
