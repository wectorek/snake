function setSquareColor(x, y, color) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = color;
}

function renderSnakeElement(x, y) {
	setSquareColor(x, y, "green");
}

function renderApple(point) {
	setSquareColor(point[0], point[1], "red");
}
function removeSquareColor(x, y) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = "black";
}
function handleUserAction(direction) {
	const currentSnakePoint = snakeTail[snakeTail.length - 1];
	const newSnakePosition = getNewSnakePosition(
		direction,
		currentSnakePoint[0],
		currentSnakePoint[1]
	);

	let moveAllowed = true;
	if (
		hasCollidedWithSnake(
			snakeTail,
			newSnakePosition[0],
			newSnakePosition[1]
		)
	) {
		moveAllowed = false;
	}

	if (moveAllowed) {
		snakeTail.push([newSnakePosition[0], newSnakePosition[1]]);
		if (snakeTail.length > snakeLength) {
			deleteLastElementFromTail();
		}
		if (hasEatenApple(newSnakePosition, applePoint)) {
			snakeLength = snakeLength + 1;
			generateAppleRandomly();
		}
	}
	renderMap();
}

function hasEatenApple(snakePoint, applePoint) {
	return snakePoint[0] == applePoint[0] && snakePoint[1] == applePoint[1];
}

function renderMap() {
	for (let i = 0; i < snakeTail.length; i++) {
		const currentPoint = snakeTail[i];
		const x = currentPoint[0];
		const y = currentPoint[1];
		renderApple(applePoint);
		renderSnakeElement(x, y);
	}
}

function move(keyName) {
	if (keyName === "ArrowRight") {
		if (x < 9) {
			x++;
			return true;
		}
	}
	if (keyName === "ArrowLeft") {
		if (x > 0) {
			x--;
			return true;
		}
	}
	if (keyName === "ArrowDown") {
		if (y < 9) {
			y++;
			return true;
		}
	}
	if (keyName === "ArrowUp") {
		if (y > 0) {
			y--;
			return true;
		}
	}
	return false;
}

function deleteLastElementFromTail() {
	removeSquareColor(snakeTail[0][0], snakeTail[0][1]);
	snakeTail.reverse();
	snakeTail.pop();
	snakeTail.reverse();
}
function createArena() {
	const arena = document.getElementById("arena");
	for (i = 0; i < 10; i++) {
		const tr = document.createElement("tr");
		for (j = 0; j < 10; j++) {
			const td = document.createElement("td");
			const id = "field-" + j + "-" + i;
			td.setAttribute("id", id);
			tr.appendChild(td);
		}
		arena.appendChild(tr);
	}
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startMoving() {
	while (true) {
		await sleep(600);
		handleUserAction(snakeCurrentDirection);
	}
}

function pickRandomApplePosition() {
	const appleX = Math.floor(Math.random() * 10);
	const appleY = Math.floor(Math.random() * 10);

	return [appleX, appleY];
}

function generateAppleRandomly() {
	applePoint = pickRandomApplePosition();
	renderApple(applePoint);
}
function getNewSnakePosition(keyName, currentSnakeX, currentSnakeY) {
	if (keyName === "ArrowRight") {
		if (currentSnakeX < 9) {
			return [currentSnakeX + 1, currentSnakeY];
		}
	}
	if (keyName === "ArrowLeft") {
		if (currentSnakeX > 0) {
			return [currentSnakeX - 1, currentSnakeY];
		}
	}
	if (keyName === "ArrowDown") {
		if (currentSnakeY < 9) {
			return [currentSnakeX, currentSnakeY + 1];
		}
	}
	if (keyName === "ArrowUp") {
		if (currentSnakeY > 0) {
			return [currentSnakeX, currentSnakeY - 1];
		}
	}
	return [currentSnakeX, currentSnakeY];
}

function getSnakeDirection(keyName) {
	if (keyName === directions.right) {
		if (snakeCurrentDirection === directions.right) {
			return (snakeCurrentDirection = directions.down);
		}
		if (snakeCurrentDirection === directions.down) {
			return (snakeCurrentDirection = directions.left);
		}
		if (snakeCurrentDirection === directions.left) {
			return (snakeCurrentDirection = directions.up);
		}
		if (snakeCurrentDirection === directions.up) {
			return (snakeCurrentDirection = directions.right);
		}
	}
	if (keyName === directions.left) {
		if (snakeCurrentDirection === directions.right) {
			return (snakeCurrentDirection = directions.up);
		}
		if (snakeCurrentDirection === directions.up) {
			return (snakeCurrentDirection = directions.left);
		}
		if (snakeCurrentDirection === directions.left) {
			return (snakeCurrentDirection = directions.down);
		}
		if (snakeCurrentDirection === directions.down) {
			return (snakeCurrentDirection = directions.right);
		}
	}
}

function hasCollidedWithSnake(snakeTail, currentSnakeX, currentSnakeY) {
	return snakeTail.find((checkedPoint) => {
		return (
			checkedPoint[0] === currentSnakeX &&
			checkedPoint[1] === currentSnakeY
		);
	});
}
