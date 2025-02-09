import Enemy from '../Enemy.js';

export default class StrongerEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 75, 75, 0.75, 80); 
    
    this.collideSound = new Audio('snd/SpaceShipDestroyedBig.mp3')
  }
  getColor() {
    return 'purple'
  }
}
