let snakeTail = [[0, 0]];
let snakeLength = 2;
let x = 0;
let y = 0;
let applePoint = pickRandomApplePosition()

const directions = {
	right: "ArrowRight",
	left: "ArrowLeft",
	down: "ArrowDown",
	up: "ArrowUp"
}

let snakeCurrentDirection = directions.right

createArena();
generateAppleRandomly()
renderSnakeElement(x, y);
document.addEventListener("keydown", (event) => {
	snakeCurrentDirection = getSnakeDirection(event.key)
});

startMoving()