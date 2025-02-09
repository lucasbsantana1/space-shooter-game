export default class Star {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 1;  // random size 
        this.speedX = Math.random() * 0.5 - 0.25; // random horizontal movement speed
        this.speedY = Math.random() * 0.5 - 0.25; // random vertical movement speed
        this.alpha = Math.random();  // random opacity to simulate twinkling
        this.maxAlpha = 1
        this.minAlpha = 1    
        this.alphaSpeed = Math.random() * 0.01 + 0.013; // speed of twinkling effect
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.y < 0) this.y = this.canvasHeight;
        if (this.y > this.canvasHeight) this.y = 0;

        this.alpha += this.alphaSpeed;
        if (this.alpha > this.maxAlpha || this.alpha < this.minAlpha) {
            this.alphaSpeed *= -1;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
