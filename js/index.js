function setSquareColor(x, y) {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = "green";
}

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
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function moving() {
	for (i = 0; i < 10; i++) {
		await sleep(300);
		setSquareColor(i, 0);
	}
}
let x = 0;
let y = 0;
setSquareColor(x, y);
document.addEventListener("keydown", (event) => {
	console.log(x, y);
	const keyName = event.key;
	removeSquareColor();
	if (keyName === "ArrowRight") {
		if (x < 9) {
			x++;
			setSquareColor(x, y);
		} else {
            setSquareColor(x,y)
        }
	}
	if (keyName === "ArrowLeft") {
		if (x > 0) {
			x--;
			setSquareColor(x, y);
		} else {
            setSquareColor(x,y)
        }
		setSquareColor(x, y);
	}
	if (keyName === "ArrowDown") {
		if (y < 9) {
			y++;
			setSquareColor(x, y);
		} else {
            setSquareColor(x,y)
        }
		setSquareColor(x, y);
	}
	if (keyName === "ArrowUp") {
		if (y>0) {
			y--;
			setSquareColor(x, y);
		} else {
            setSquareColor(x,y)
        }
		setSquareColor(x, y);
	}
});
function removeSquareColor() {
	let field = document.getElementById("field-" + x + "-" + y);
	field.style.backgroundColor = "black";
}