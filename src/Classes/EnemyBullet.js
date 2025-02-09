export default class EnemyBullet {
    constructor(x, y, width, height, speed, damage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.startHeight = height;
        this.targetHeight = 75;
        this.currentHeight = this.startHeight;
        this.scaleDuration = 200; // 0.6 secs
        this.startTime = Date.now();
        this.speed = speed * 1.45;
        this.damage = damage;
        this.launchSound = new Audio('snd/GlueSplatter.mp3')
        this.hitSound = new Audio('snd/GlueStrike.mp3')

        this.images = [];
        this.imageIndex = 0;
        this.radius = 0;
        this.maxRadius = 20;
        this.duration = 1000;

        this.imagesLoaded = false;
        this.preloadImages([
            'img/Projectiles/Goop1.png',
            'img/Projectiles/Goop2.png',
            'img/Projectiles/Goop3.png',
            'img/Projectiles/Goop4.png',
        ]);

        this.launchSound.play()
    }

    preloadImages(imagePaths) {
        const loadedImages = [];
        let loadedCount = 0;

        imagePaths.forEach((path, index) => {
            const img = new Image();
            img.src = path;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === imagePaths.length) {
                    this.imagesLoaded = true; // image loaded
                }
            };

            img.onerror = () => {
                console.error(`Failed to load image at: ${path}`);
            };

            loadedImages[index] = img;
        });

        this.images = loadedImages;
    }

    move() {
        this.y += this.speed;

        // sioze y scale for over 0.6 seconds
        const elapsedTime = Date.now() - this.startTime;
        if (elapsedTime < this.scaleDuration) {
            const t = elapsedTime / this.scaleDuration; // normalzie from 0 to 1
            this.currentHeight = this.startHeight + t * (this.targetHeight - this.startHeight);
        } else {
            this.currentHeight = this.targetHeight; // fix to height after 0.6 seca
        }

        const frameDuration = this.duration / this.images.length;
        if (elapsedTime >= frameDuration * (this.imageIndex + 1)) {
            this.imageIndex = Math.min(this.images.length - 1, this.imageIndex + 1);
        }
    }

    draw(ctx) {
        if (this.imagesLoaded) {
           // ctx.save();
            const image = this.images[this.imageIndex];
            ctx.drawImage(image, this.x, this.y, this.width, this.currentHeight);  
            // ctx.restore();
        } else {
            console.warn('Images not loaded yet.');
        }
    }

    isOffScreen(canvasHeight) {
        return this.y > canvasHeight;
    }

    checkCollision(player) {
        const hitboxes = player.getHitboxes();
        
        return hitboxes.some(hitbox => {
            const adjustedHeight = this.currentHeight + 4; // extra
            return (
                this.x < hitbox.x + hitbox.width &&
                this.x + this.width > hitbox.x &&
                this.y < hitbox.y + hitbox.height &&
                this.y + adjustedHeight > hitbox.y
            );
        });
    }
}
