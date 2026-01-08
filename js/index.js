let snakeTail = [[0, 0]];
let snakeLength = 2;
let x = 0;
let y = 0;
let applePoint = pickRandomApplePosition()

createArena();
generateAppleRandomly()
renderSnakeElement(x, y);
document.addEventListener("keydown", (event) => {
	handleUserAction(event);
});
