function draw () {
	let ctx = grid.getContext("2d")
	ctx.strokeStyle = "black"
	ctx.lineWidth = 50
	ctx.strokeRect(0,0, 500,500)
	let img = document.createElement("img")
}
let PlayerSymbol = "o"
let NextTurn = "x"
function GameStart(ox){


	buttons.remove()
}
function play(pl){
	if (pl === 1) {
	x1.innerText = PlayerSymbol
	}
	else if (pl === 2)
	x2.innerText = PlayerSymbol
	else if (pl === 3)
	x3.innerText = PlayerSymbol
	else if (pl === 4)
	x4.innerText = PlayerSymbol
	else if (pl === 5)
	x5.innerText =PlayerSymbol
	else if (pl === 6)
	x6.innerText =PlayerSymbol
	else if (pl === 7)
	x7.innerText =PlayerSymbol
	else if (pl === 8)
	x8.innerText = PlayerSymbol
	else
	x9.innerText = PlayerSymbol
	
	if ( x1.innerText === PlayerSymbol && x2.innerText === PlayerSymbol && x3.innerText === PlayerSymbol)
		x10.innerText = PlayerSymbol+" win"

	swap()

}
function swap() {
	let pund = PlayerSymbol
	PlayerSymbol = NextTurn
	NextTurn = pund
}