let test = true
let Mes = ""
function web () {
    console.log (Hi)
    Hi.innerText = "yay"
    Hi.classList.add("Mod")
    // Hi.style.color = "blue"
    // Hi.style.fontSize = "22pt"
}
function draw () {
    let ctx = Me.getContext("2d")
    ctx.strokeStyle = "gold"
    ctx.lineWidth = 100
    ctx.strokeRect(0,0, 500,500)
    let img = document.createElement("img")
    img.onload = function () {
        ctx.drawImage(img,100,100,300,300)
    }
    img.src = "tree.jpg"
    
    
    
}

function draw2 () {
    let ctx = Yay.getContext("2d")
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 100
    ctx.strokeRect(0,0, 500,500)
}
function Animate() {
    let ctx = Me.getContext("2d")
    let ctx2 = Yay.getContext("2d")
    let YAYME = document.createElement("img")
    YAYME.src = "tree.jpg"
    let YAYS = document.createElement("img")
    YAYS.src = "road.jpeg"
    let x = 100 
	let y = 100
    let vx = 1
    function Update() {
		ctx.fillStyle = "white"
		ctx.fillRect(100,100,300,300)
		ctx.drawImage(YAYME,x,y,50,50)
		x = x+vx
		if(x>=400){
            vx = -1
        }
        if (!test) {
            ctx.drawImage(YAYS,100,100,200,200)
        }
        ctx2.fillStyle = "white"
		ctx2.fillRect(100,100,300,300)
        ctx2.lineWidth = 2
        ctx2.font = "30pt Arial"
        ctx2.strokeText (Mes,250,250)
        requestAnimationFrame(Update)
    }
    requestAnimationFrame(Update)
}

function SetY() {
    test = false

}
function SETS() {
    test = true
}
function send(event) {
    if (event.key==="Enter") {
        Mes = noyay.value
    }
}