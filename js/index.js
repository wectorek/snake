let snakeTail = [[0, 0]];
let snakeLength = 2;
let x = 0;
let y = 0;
let appleX = 5;
let appleY = 5;

createArena();
renderApple(appleX, appleY);
renderSnakeElement(x, y);
document.addEventListener("keydown", (event) => {
	handleUserAction(event);
});
