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
		
		this.img = document.createElement("img");
		this.img.src = "Assets/" + this.file;
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
let discard_pile = null;  // discard pile. top card only
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
let dragging = {}
let dropped = {}
let drawing = false
let order = []
let turn = 0
let dir = true //true = clockwise false = conterclockwise
let pcount = 0

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
		if (i === 0 ){
			section.addEventListener("drop",stopDraw)
			section.addEventListener("dragover",event => event.preventDefault())
		}
		for (let r = 0; r < 7; r++) {
			let c = deck.pop()
			players[i].hand.push(c)
			section.append(c.img)

			// add drag-and-drop event listener to cards in player-0's hand
			if (i === 0) {
				c.img.addEventListener('dragstart', function(ev) {
					dragging.card = c
				});
			}
		}
	}	
	let d = null
	do {
		d = deck.pop();
		if (d.color === "wild") {
			let i = Math.floor( Math.random() * (deck.length) );
			deck.splice(i,0,d)
		}
		else {
			discard_pile = d;
			discard.append(d.img);
		}
	} 
	while (d.color === "wild");

	console.log("Discard pile: ", d);
	startGameButtons.remove()
	if (n === 2) {
		order = [0,1]
	}
	else if (n === 3) {
		order = [0,2,1]
	}
	else if (n === 4) {
		order = [0,2,1,3] 
	}
	turn = Math.floor(Math.random()*n)
	pcount = n
	console.log("turn: " + turn);
	AIturn(false)
}
function onPlay(ev){
	if (turn !== 0) {
		console.log("It's not your turn.");
		return
	}
	let c = dragging.card
	
	if (c.color === discard_pile.color || c.symbol === discard_pile.symbol || c.color === "wild") {
		discard.innerHTML = ""
		discard.append(c.img)
		discard_pile = c;
	
		
		let index = players[0].hand.indexOf(c);
		players[0].hand.splice(index, 1);
		dropped.card = c
		
		if (c.symbol === "rev"){
			reverse()
		}
		else if (c.symbol === "skip"){
			nextturn()
		}
		else if (c.symbol === "+2"){
			nextturn()
			draw(2)
		}
		else if (c.symbol === "+4"){
			nextturn()
			draw(4)
		}

		console.log("You played: ", c);
		if (c.color === "wild") {
			pick.style.display = "block"	
		}
		else {
			AIturn()
		}
	} else {
		console.log("You can't play: ", c);
	}
}
function pickColor (cl) {
	dropped.card.color = cl
	pick.style.display = "none"
	AIturn()
}
function startDraw () {
	drawing = true
}
function stopDraw() {
	let c = deck.pop()
	players [0].hand.push(c)
	document.getElementById("hand-0").append(c.img)
	c.img.addEventListener('dragstart', function(ev) {
		dragging.card = c
	});
	drawing = false
	console.log("You drew ", c);
	AIturn()
}
function reverse() {
	if (pcount === 2)
		nextturn()
	else 
		dir = !dir	
}
function nextturn() {
	let i = order.indexOf(turn)
	if (dir === true) {
		i++ 
		if (i >= order.length)
			i = 0
	}
	else {
		i--
		if (i < 0){
			i = order.length -1
		}
	}
	turn = order[i]
	console.log("turn: " + turn);
}
function draw(n) {
	for (let i = 0 ; i<n; i++) {
		let c = deck.pop()
		players[turn].hand.push(c)
		document.getElementById("hand-"+turn).append(c.img)
	}
}

function AIturn(turnAd) {
	if (turnAd === undefined)
		turnAd = true
	if (turnAd)
		nextturn()
	if (turn === 0)
		return;  // stop loop

	let delay = 4000;

	function AIplayCard() {
		if (turn === 0)
			return; // stop loop

		let poss = []
		for (let c of players[turn].hand){

			if (discard_pile.symbol === c.symbol || discard_pile.color === c.color || c.color === "wild"){
				poss.push(c)
			}
		}
		// console.log("possible cards: ", poss)
		if (poss.length !== 0){
			let i = Math.floor(Math.random()*poss.length)
			let c = poss[i]
			let j = players[turn].hand.indexOf(c)
			players[turn].hand.splice(j,1)
			// console.log("hand: ", players[turn].hand);
			console.log("AI [" + turn + "] played: ", c);
			discard_pile = c
			discard.innerHTML = ""
			discard.append(c.img)
			if (c.color === "wild"){
				 let randcolor = Math.floor(Math.random()*4)
				let colors = ["red","blue","green","yellow"]
				c.color = colors[randcolor]
				discard.append(c.color)// change later?
			}
			
			if (c.symbol === "rev"){
				reverse()
			}
			else if (c.symbol === "skip"){
				nextturn()
			}
			else if (c.symbol === "+2"){
				nextturn()
				draw(2)
			}
			else if (c.symbol === "+4"){
				nextturn()
				draw(4)
			}
		}
		else {
			draw(1)
			console.log("AI [" + turn + "] drew");
		}

		// move to next turn
		nextturn();

		// recursion
		setTimeout(AIplayCard, delay);
	}

	// start loop
	setTimeout(AIplayCard, delay);
}