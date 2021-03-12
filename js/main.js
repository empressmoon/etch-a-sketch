const canvas = document.querySelector("#etch-a-sketch")
const startButtons = document.querySelectorAll(".button-start")

const ctx = canvas.getContext("2d")

const MOVE_DISTANCE = 20
const LINE_WIDTH = 5
const HALF_LINE_WIDTH = LINE_WIDTH / 2

let hue = 0
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`

const { width, height} = canvas

ctx.lineJoin = "round"
ctx.lineCap = "square"
ctx.lineWidth = LINE_WIDTH
ctx.strokeStyle = "white"

let startX = width / 2
let startY = height / 2

ctx.beginPath()
ctx.moveTo(startX, startY)
ctx.lineTo(startX, startY)
ctx.stroke()

function handleStartingPoint(event) {
    const btn = event.currentTarget

    startButtons.forEach(button => button.classList.remove("active"))
    btn.classList.add("active")

    clearCanvas()

    switch (btn.id) {
        case "btn-top-left":
            startX = HALF_LINE_WIDTH
            startY = HALF_LINE_WIDTH
            break
        case "btn-top-right":
            startX = width - HALF_LINE_WIDTH
            startY = HALF_LINE_WIDTH
            break
        case "btn-bottom-left":
            startX = HALF_LINE_WIDTH
            startY = height - HALF_LINE_WIDTH
            break
        case "btn-bottom-right":
            startX = width - HALF_LINE_WIDTH
            startY = height - HALF_LINE_WIDTH
            break
        case "btn-center":
            startX = width / 2
            startY = height / 2
            break
        default:
            break
    }

    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX, startY)
    ctx.stroke()
}

function draw({ key }) {
    ctx.beginPath()
    ctx.moveTo(startX, startY)

    hue += 10
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

    switch (key) {
        case "ArrowUp":
            startY -= MOVE_DISTANCE
            break
        case "ArrowRight":
            startX += MOVE_DISTANCE
            break
        case "ArrowDown":
            startY += MOVE_DISTANCE
            break
        case "ArrowLeft":
            startX -= MOVE_DISTANCE
            break
        default:
            break
    }
    ctx.lineTo(startX, startY)
    ctx.stroke()
}

function handleKey(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault()
        draw({ key: e.key })
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, width, height)
}

startButtons.forEach(button => {
    button.addEventListener("click", handleStartingPoint)
})

window.addEventListener('keydown', handleKey);
