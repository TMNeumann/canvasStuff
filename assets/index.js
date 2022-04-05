console.log('r/place')

const canvas = document.getElementById('mainCanvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

function Circle(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color

    this.draw = () => {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.strokeStyle = color
        context.stroke()
        context.fill()
    }
    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
            this.color = 'bump'
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
            this.color = 'bump'
        }
        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

let circleArray = []
let radius = 30

for ( i = 0; i < 100; i++) {
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius *2) + radius
    let dx = (Math.random() - 0.5) *4
    let dy = (Math.random() - 0.5) *4
    circleArray.push(new Circle(x, y, dx, dy, radius, 'black'))
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight)

    for (i = 0; i < circleArray.length; i++){
        let newRadius = (circleArray[i].radius + 1)
        let x = Math.random() * (innerWidth - circleArray[i].radius * 2) + circleArray[i].radius
        let y = Math.random() * (innerHeight - circleArray[i].radius * 2) + circleArray[i].radius
        let dx = (Math.random() - 0.5) *4
        let dy = (Math.random() - 0.5) *4
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        let color = '#' + randomColor
        if (circleArray.length < 1000) {
            if (circleArray[i].color === 'bump') {     
                circleArray[i].color = color 
                circleArray.push(new Circle(circleArray[i].x, circleArray[i].y, circleArray[i].dx / 2, circleArray[i].dy / 2, radius , color))
                const index = circleArray.indexOf(circleArray[i])
                circleArray.splice(index, 1)
            }
        }        
        circleArray[i].update()
    }
}
animate()

function stop () {
    requestAnimationFrame()
}