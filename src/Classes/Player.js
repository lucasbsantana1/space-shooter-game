export default class Player {
  constructor(x, y, width, height, hp, damage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.hp = hp;
    this.damage = damage;
    this.targetPos = { x: x, y: y };
    this.canShoot = true;
    this.launchSound = new Audio('snd/LaunchRocketQuick.mp3');
    this.hitboxSound = new Audio('snd/Hover.mp3')
    this.showHitboxes = false;
    this.debounce = true;
    
    this.image = new Image();
    this.updateImage();
  }

  updateImage() {
    this.image.src = this.canShoot
      ? 'img/Player/Spaceship1-Reloaded.png'
      : 'img/Player/Spaceship1-Empty.png';
  }

  move(keys, canvasWidth) {
    // moves smoothly and not out of bounds
    if (keys['ArrowRight']) {
      // move
      this.targetPos.x = Math.min(canvasWidth - this.width, this.targetPos.x + 5);
      // rotate to the right
      this.rotation = Math.min(0.125, this.rotation + 0.01);
    } 
    else if (keys['ArrowLeft']) {
      // move
      this.targetPos.x = Math.max(0, this.targetPos.x - 5);
      // rotate to the left
      this.rotation = Math.max(-0.125, this.rotation - 0.01);
    } 
    // gradually reduce rotation if plr still
    else {
      this.rotation *= 0.95;
    }

    // hitboxx
    if (keys['g'] && this.debounce) {
      this.debounce = false;
      setTimeout(() => (this.debounce = true), 250);
      this.hitboxSound.currentTime = 0; // reset sound
      this.hitboxSound.play();

      // toggle
      if (this.showHitboxes == false) {
        this.showHitboxes = true;
      } else {
        this.showHitboxes = false;
      }
    }

    // smoothly move the object to targetpos
    if (Math.round(this.x) !== Math.round(this.targetPos.x)) {
      const moveX = (Math.round(this.targetPos.x) - Math.round(this.x)) / 5;
      this.x += moveX;
    }
  }
  // square
  getHitboxes() {
    return [
      {
        x: this.x + this.width * 0.35,
        y: this.y + 5,
        width: this.width * 0.3, 
        height: this.height - 5,
      },
      { 
        x: this.x + this.width * 0.1,
        y: this.y + this.height * 0.5 , 
        width: this.width * 0.8,
        height: this.height * 0.5,
      }
    ];
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.translate(-this.width / 2, -this.height / 2);
    if (this.image.complete && this.image.naturalWidth > 0) {
      ctx.drawImage(this.image, 0, 0, this.width, this.height);
    }
    ctx.restore();

    // show hitbox
    if (this.showHitboxes == true) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    this.getHitboxes().forEach(hitbox => {
      ctx.strokeRect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
     });
     }
    // hp
    // ctx.fillStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.hp, this.x + this.width / 2, this.y + this.height / 2);
  }
}
