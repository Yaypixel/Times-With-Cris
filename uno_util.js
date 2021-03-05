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

function capitalize(str) {
	return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}

class Card {
	constructor(symbol, color) {
		this.symbol = symbol;
		this.color = color;

		color = capitalize(this.color);
		if (this.symbol.startWith("+"))
			symbol = "Draw";
		else
			symbol = capitalize(this.symbol);
		this.file = `${color}_${symbol}.png`;
	}
}