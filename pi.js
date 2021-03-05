let throwDart = null;

document.addEventListener("DOMContentLoaded", function() {

	let input = document.querySelector("#pi");
	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext("2d");

	let w = canvas.width;  // width
	let h = canvas.height;  // height
	let r = Math.min(w, h) / 2;  // radius
	let d = 2 * r;  // diameter
	let cx = w/2;  // center of circle
	let cy = h/2;

	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, 2 * Math.PI);
	ctx.stroke();

	let hits = 0;  // number of darts that fall in the circle
	let throws = 0;  // number of darts thrown

	throwDart = function() {
		let x = Math.random() * d;
		let y = Math.random() * d;
		throws++;

		let a = x - cx;
		let b = y - cy;
		let c2 = a*a + b*b;
		let distance = Math.sqrt(c2);  // square root

		if (distance > r) {
			ctx.fillStyle = "red";
			// miss
		}
		else {
			ctx.fillStyle = "green";
			hits++;
		}

		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();

		input.value = 4 * hits / throws;  // Probability = PI/4
	}
});

let t = null;

function start() {
	t = setInterval(throwDart, 0.000000000000001);
}

function stop() {
	clearInterval(t);
}
