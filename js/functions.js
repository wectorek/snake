function setSquareColor(x, y, color) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = color;
}

function renderSnakeElement(x, y) {
	setSquareColor(x, y, "green");
}

function renderApple(x, y) {
	setSquareColor(x, y, "red");
}
function removeSquareColor(x, y) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = "black";
}
function handleUserAction(event) {
	const hasMoved = move(event.key);
	if (hasMoved) {
		snakeTail.push([x, y]);
		if (snakeTail.length > snakeLength) {
			deleteLastElementFromTail();
		}
        if(x==appleX && y==appleY){
         snakeLength=snakeLength+1
        }
	}
	renderMap();
}
function renderMap() {
	for (let i = 0; i < snakeTail.length; i++) {
		console.log(snakeTail);
		const currentPoint = snakeTail[i];
		const x = currentPoint[0];
		const y = currentPoint[1];
        renderApple(appleX,appleY)
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
function createArena(){
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
}}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moving() {
	for (i = 0; i < 10; i++) {
		await sleep(300);
		setSquareColor(i, 0);
	}}