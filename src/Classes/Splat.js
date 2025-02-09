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
        ];

        // Load the images
        this.images[0].src = 'img/Explosions/SmallExplosion1.png';
        this.images[1].src = 'img/Explosions/SmallExplosion2.png';
        this.images[2].src = 'img/Explosions/SmallExplosion3.png';
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        const image = this.images[this.imageIndex];
        ctx.drawImage(image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}
