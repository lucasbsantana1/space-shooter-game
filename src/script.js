import Game from './Classes/Game.js';

const canvas = document.getElementById('Canvas');
canvas.width = 900;
canvas.height = 700;

const game = new Game(canvas);
game.spawnEnemies()
setInterval(() => game.spawnEnemies(), 3000);
game.gameLoop()
