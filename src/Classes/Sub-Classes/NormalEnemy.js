import Enemy from '../Enemy.js';

export default class NormalEnemy extends Enemy {
  constructor(x, y) {
    super(x, y, 75, 75, 0.75, 40); 
  }
  getColor() {
    return 'green'
  }
}
