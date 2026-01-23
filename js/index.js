let snakeTail = [[0, 0]];
let snakeLength = 2;
let x = 0;
let y = 0;
let mapSize = 10
let applePoint = pickRandomApplePosition()
let speed = 500;
let snakeColor = "blue"
const colors = ["blue","red","pink","purple","orange","yellow"]

const directions = {
	right: "ArrowRight",
	left: "ArrowLeft",
	down: "ArrowDown",
	up: "ArrowUp"
}

let snakeCurrentDirection = directions.right

createArena();
colorArena()
generateAppleRandomly()
console.log(x, y)
renderSnakeElement(x, y);
document.addEventListener("keydown", (event) => {
	snakeCurrentDirection = getSnakeDirection(event.key)
});

startMoving()