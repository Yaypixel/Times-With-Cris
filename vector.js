class Mob {
	constructor(imgSrc, width, height) {
		this.img = document.createElement("img");
		this.img.src = imgSrc;
		this.width = width;
		this.height = height;

		this.x = 0;  // position
		this.y = 0;
		this.vx = 0;  // velocity
		this.vy = 0;
	}
}

document.addEventListener("DOMContentLoaded", function() {

	let canvas = document.querySelector("canvas");
	let ctx = canvas.getContext("2d");

	let g = 0.5;

	let bird = new Mob("bird.png", 64, 64);
	bird.vx = 4;
	bird.vy = 1;
	
	// draw loop
	let draw = function() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);
		bird.x += bird.vx;
		bird.y += bird.vy;
		bird.vy += g;  // each frame, change the y velocity of the bird

		// if (bird.x + bird.width >= canvas.width)
		// 	bird.x = 0;
		// else if (bird.x <= 0)
		// 	bird.x = canvas.width - bird.width;
		if (bird.x + bird.width >= canvas.width || bird.x <= 0)
			bird.vx = -bird.vx;

		if (bird.y + bird.height >= canvas.height || bird.y <= 0)
			bird.vy = -(bird.vy * 0.9);
			

		requestAnimationFrame(draw);
	};
	requestAnimationFrame(draw);
});