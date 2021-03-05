function capitalize(str) {
	return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}

class Card {
	constructor(symbol, color) {
		this.symbol = symbol;
		this.color = color;

		color = capitalize(this.color);
		if (this.symbol.startsWith("+"))
			symbol = "Draw";
		else if (this.symbol ==="rev")
			symbol = "Reverse";
		else
			symbol = capitalize(this.symbol);
		if (color ==="Wild" && symbol ==="Wild")
			this.file = "Wild.png";
		else
			this.file = `${color}_${symbol}.png`;
	}
}

class Player {
	constructor () {
		this.hand = []
	}
}

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

let players = []
let deck = [
	new Card("0","red"),
	new Card("1","red"),
	new Card("2","red"),
	new Card("3","red"),
	new Card("4","red"),
	new Card("5","red"),
	new Card("6","red"),
	new Card("7","red"),
	new Card("8","red"),
	new Card("9","red"),
	new Card("1","red"),
	new Card("2","red"),
	new Card("3","red"),
	new Card("4","red"),
	new Card("5","red"),
	new Card("6","red"),
	new Card("7","red"),
	new Card("8","red"),
	new Card("9","red"),
	new Card("+2","red"),
	new Card("+2","red"),
	new Card("skip","red"),
	new Card("skip","red"),
	new Card("rev","red"),
	new Card("rev","red"),
	new Card("0","blue"),
	new Card("1","blue"),
	new Card("2","blue"),
	new Card("3","blue"),
	new Card("4","blue"),
	new Card("5","blue"),
	new Card("6","blue"),
	new Card("7","blue"),
	new Card("8","blue"),
	new Card("9","blue"),
	new Card("1","blue"),
	new Card("2","blue"),
	new Card("3","blue"),
	new Card("4","blue"),
	new Card("5","blue"),
	new Card("6","blue"),
	new Card("7","blue"),
	new Card("8","blue"),
	new Card("9","blue"),
	new Card("+2","blue"),
	new Card("+2","blue"),
	new Card("skip","blue"),
	new Card("skip","blue"),
	new Card("rev","blue"),
	new Card("rev","blue"),
	new Card("0","yellow"),
	new Card("1","yellow"),
	new Card("2","yellow"),
	new Card("3","yellow"),
	new Card("4","yellow"),
	new Card("5","yellow"),
	new Card("6","yellow"),
	new Card("7","yellow"),
	new Card("8","yellow"),
	new Card("9","yellow"),
	new Card("1","yellow"),
	new Card("2","yellow"),
	new Card("3","yellow"),
	new Card("4","yellow"),
	new Card("5","yellow"),
	new Card("6","yellow"),
	new Card("7","yellow"),
	new Card("8","yellow"),
	new Card("9","yellow"),
	new Card("+2","yellow"),
	new Card("+2","yellow"),
	new Card("skip","yellow"),
	new Card("skip","yellow"),
	new Card("rev","yellow"),
	new Card("rev","yellow"),
	new Card("0","green"),
	new Card("1","green"),
	new Card("2","green"),
	new Card("3","green"),
	new Card("4","green"),
	new Card("5","green"),
	new Card("6","green"),
	new Card("7","green"),
	new Card("8","green"),
	new Card("9","green"),
	new Card("1","green"),
	new Card("2","green"),
	new Card("3","green"),
	new Card("4","green"),
	new Card("5","green"),
	new Card("6","green"),
	new Card("7","green"),
	new Card("8","green"),
	new Card("9","green"),
	new Card("+2","green"),
	new Card("+2","green"),
	new Card("rev","green"),
	new Card("rev","green"),
	new Card("skip","green"),
	new Card("skip","green"),
	new Card("wild","wild"),
	new Card("wild","wild"),
	new Card("wild","wild"),
	new Card("wild","wild"),
	new Card("+4","wild"),
	new Card("+4","wild"),
	new Card("+4","wild"),
	new Card("+4","wild"),
]

function startGame(n) {
	shuffle(deck)
	for (let i = 0; i < n; i++){
		players.push(new Player())
		
		let wrapper = document.createElement("div");
		wrapper.id = "hand-wrapper-" + i;
		cards.append(wrapper);

		let section = document.createElement("section")
		section.id = "hand-"+i
		wrapper.append(section)
		for (let r = 0; r < 7; r++) {
			let c = deck.pop()
			players[i].hand.push(c)
			let img = document.createElement("img")
			img.src = "Assets/"+c.file
			section.append(img)
		}
	}
	startGameButtons.remove()
}
