export default class Bullet {
    constructor(x, y, width, height, speed, damage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.damage = damage;
        this.image = new Image();
        this.image.src = 'img/Projectiles/Rocket.png';
        this.explosionSound = new Audio('snd/ExplosionSmall.mp3')
    }

    move() {
        this.y -= this.speed;
        this.speed *= 0.985;
    }

    draw(ctx) {
        if (this.image.complete && this.image.naturalWidth > 0) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    isOffScreen(canvasHeight) {
        return this.y + this.height < 0;
    }

    checkCollision(enemy) {
        if (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y) {

            this.explosionSound.play();

            enemy.hp -= this.damage;
            return true;
        }
        return false;
    }
}
