function setSquareColor(x, y, color, className) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = color;
	field.className = className;
}

function renderSnakeElement(x, y) {
	setSquareColor(x, y, "blue", "");
}

function renderApple(point) {
	setSquareColor(point[0], point[1], "red", "apple");
}
function removeSquareColor(x, y) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = "black";
}
function handleMovement(direction) {
	const currentSnakePoint = snakeTail[snakeTail.length - 1];
	const newSnakePosition = getNewSnakePosition(
		direction,
		currentSnakePoint[0],
		currentSnakePoint[1],
	);

	let moveAllowed = true;
	if (
		hasCollidedWithSnake(
			snakeTail,
			newSnakePosition[0],
			newSnakePosition[1],
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
			speed -= 50;
		}
	}
	renderMap();
}

function hasEatenApple(snakePoint, applePoint) {
	return snakePoint[0] == applePoint[0] && snakePoint[1] == applePoint[1];
}

function renderMap() {
	colorArena();
	renderApple(applePoint);
	for (snakeElement of snakeTail) {
		renderSnakeElement(snakeElement[0], snakeElement[1]);
	}
}

function move(keyName) {
	if (keyName === "ArrowRight") {
		if (x < mapSize - 1) {
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
		if (y < mapSize - 1) {
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
	for (i = 0; i < mapSize; i++) {
		const tr = document.createElement("tr");
		for (j = 0; j < mapSize; j++) {
			const td = document.createElement("td");
			const id = "field-" + j + "-" + i;
			td.setAttribute("id", id);
			tr.appendChild(td);
		}
		arena.appendChild(tr);
	}
}
function colorArena() {
	for (let y = 0; y < mapSize; y++) {
		for (let x = 0; x < mapSize; x++) {
			if (y % 2 === 0) {
				if (x % 2 !== 0) {
					setSquareColor(x, y, "darkgreen", "");
				} else {
					setSquareColor(x, y, "green", "");
				}
			} else {
				if (x % 2 !== 0) {
					setSquareColor(x, y, "green", "");
				
				} else {
					setSquareColor(x, y, "darkgreen", "");

				}
			}
		}
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startMoving() {
	while (true) {
		await sleep(speed);
		handleMovement(snakeCurrentDirection);
	}
}

function pickRandomApplePosition() {
	const appleX = Math.floor(Math.random() * mapSize);
	const appleY = Math.floor(Math.random() * mapSize);

	return [appleX, appleY];
}

function generateAppleRandomly() {
	applePoint = pickRandomApplePosition();
	renderApple(applePoint);
}
function getNewSnakePosition(direction, currentSnakeX, currentSnakeY) {
	let newX = currentSnakeX;
	let newY = currentSnakeY;
	switch (direction) {
		case directions.right:
			currentSnakeX < mapSize - 1 ? (newX += 1) : (newX = 0);
			break;
		case directions.left:
			currentSnakeX > 0 ? (newX -= 1) : (newX = mapSize - 1);
			break;

		case directions.down:
			currentSnakeY < mapSize - 1 ? (newY += 1) : (newY = 0);
			break;

		case directions.up:
			currentSnakeY > 0 ? (newY -= 1) : (newY = mapSize - 1);
			break;
	}
	return [newX, newY];
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
