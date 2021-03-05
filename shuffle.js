function shuffle(arr) {
	// example:  [a, b, c, d, e] rando=2  ->  [a, b, e, d, c]
	for (let i = arr.length - 1; i >= 1; i--) {

		// generate random integer between 0 and i
		let rando = Math.floor( Math.random() * (i + 1) );

		// swap randomly chosen element (rando) to the end (i)
		let temp = arr[i];
		arr[i] = arr[rando];
		arr[rando] = temp;
	}
}