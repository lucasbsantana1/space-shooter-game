import Player from './Player.js';
import Bullet from './Bullet.js';
import NormalEnemy from './Sub-Classes/NormalEnemy.js';
import StrongerEnemy from './Sub-Classes/StrongerEnemy.js';
import Explosion from './Explosion.js';
import EnemyBullet from './EnemyBullet.js';
import Star from './Star.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = new Player(canvas.width / 2 - 75, canvas.height / 1.15 - 100, 150, 180, 100, 40);
        this.bullets = [];
        this.enemyBullets = [];
        this.enemies = [];
        this.explosions = [];
        this.stars = [];
        this.keys = {};
        this.waves = [4, 3, 5, 4, 6, 5, 4, 3];
        this.currentWave = 0;
        this.score = 0;  // SCORE
        this.gameOver = false;

        for (let i = 0; i < 155; i++) {
            this.stars.push(new Star(canvas.width, canvas.height));
        }

        this.initListeners();
    }

    initListeners() {
        document.addEventListener('keydown', (e) => (this.keys[e.key] = true));
        document.addEventListener('keyup', (e) => (this.keys[e.key] = false));
    }

    spawnEnemies() {
        const numEnemies = this.waves[this.currentWave];
        const spaceBetween = this.canvas.width / (numEnemies + 1);

        for (let i = 0; i < numEnemies; i++) {
            if (this.currentWave % 2 === 0) {
                this.enemies.push(new NormalEnemy(spaceBetween * (i + 1) - 37.5, -50));
            } else {
                this.enemies.push(new StrongerEnemy(spaceBetween * (i + 1) - 37.5, -50));
            }
        }
        this.currentWave = (this.currentWave + 1) % this.waves.length;
    }

    gameLoop() {
        if (this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = "50px Arial";
            this.ctx.fillStyle = "white";
        
            this.ctx.fillText("Game over", this.canvas.width / 2 - this.ctx.measureText("Game over").width / 16, this.canvas.height / 2 - 10);
        
            this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2 - this.ctx.measureText(`Score: ${this.score}`).width / 16, this.canvas.height / 2 + 40);
        
            return; // stop all stuff
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // move and draw star
        this.stars.forEach(star => {
            star.move();
            star.draw(this.ctx);
        });

        if (this.player.hp < 0) {this.player.hp = 0}

        this.player.move(this.keys, this.canvas.width);

        if (this.keys['z'] && this.player.canShoot) {
            this.player.launchSound.currentTime = 0;
            this.player.launchSound.play();
            this.bullets.push(new Bullet(this.player.x + this.player.width / 2 - 68, this.player.y + 45, 40, 65, 22, this.player.damage));
            this.bullets.push(new Bullet(this.player.x + this.player.width / 2 + 60 / 2, this.player.y + 45, 40, 65, 22, this.player.damage));
            this.player.canShoot = false;
            this.player.updateImage();
            setTimeout(() => (this.player.canShoot = true, this.player.updateImage()), 650);
        }

        this.bullets.forEach((bullet, index) => {
            bullet.move();
            bullet.draw(this.ctx);

            this.enemies.forEach((enemy, enemyIndex) => {
                if (bullet.checkCollision(enemy)) {
                    this.explosions.push(new Explosion(bullet.x + bullet.width / 2, bullet.y));
                    this.bullets.splice(index, 1); // remove

                    if (enemy.hp <= 0) {
                        this.enemies.splice(enemyIndex, 1);
                        this.score += 1;
                    }
                }
            });

            if (bullet.isOffScreen(this.canvas.height)) {
                this.bullets.splice(index, 1);
            }
        });

        this.enemyBullets.forEach((bullet, index) => {
            bullet.move();
            bullet.draw(this.ctx);
        
            if (bullet.checkCollision(this.player)) {
                this.player.hp -= bullet.damage;
                bullet.hitSound.play()
                this.enemyBullets.splice(index, 1);
            }
        
            if (bullet.isOffScreen(this.canvas.height)) {
                this.enemyBullets.splice(index, 1);
            }
        });

        // explosions
        this.explosions.forEach((explosion, index) => {
            explosion.update();
            explosion.draw(this.ctx);

            if (!explosion.isAlive()) {
                this.explosions.splice(index, 1);
            }
        });

        this.enemies.forEach((enemy) => {
            if (Math.random() < 0.0015) {
                this.enemyBullets.push(new EnemyBullet(enemy.x + enemy.width / 2 - 5, enemy.y + enemy.height, 45, 5, 5, 20));
            }
        });

        this.enemies = this.enemies.filter((enemy, index) => {
            enemy.move();
            enemy.draw(this.ctx);
            if (enemy.y > this.canvas.height - enemy.height / 2) {
                this.gameOver = true;
            }
            if (enemy.checkCollision(this.player)) {
                this.player.hp -= enemy.hp;
                enemy.collideSound.play()
                enemy.hp = 0
            }
            return !enemy.isOffScreen(this.canvas.height) && !enemy.isDestroyed();
        });
        
        // check if player dead
        if (this.player.hp <= 0) {
            this.gameOver = true;
        }

        this.ctx.font = "30px Arial"; // size fix
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Score: ${this.score}`, 65, this.canvas.height - 20);

        this.player.draw(this.ctx);
        requestAnimationFrame(() => this.gameLoop());
    }
}
