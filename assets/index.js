const canvas = document.getElementById('mainCanvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')

let mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
window.addEventListener('mousemove' , moveFunction, false)

function moveFunction(event) {
    mouse.x = event.x
    mouse.y = event.y
}
const maxRadius = 50
// const minRadius = 10

function makeColor () {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const color = '#' + randomColor
    return color
}

function Circle(x, y, dx, dy, radius) {    
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = makeColor()

    this.draw = () => {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.strokeStyle = this.color
        // context.fill()
        context.stroke()
    }
    this.update = () => {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
            this.bump = true
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
            this.bump = true
        }
        this.x += this.dx
        this.y += this.dy

        // interactivity
        if ( mouse.x - this.x < 50 
            && mouse.x - this.x > -50 
            && mouse.y - this.y < 50 
            && mouse.y - this.y > -50 ) {
            if ( this.radius < maxRadius ) {
                this.radius += 1
            }
        } else if ( this.radius > this.minRadius ) {
            this.radius -= 1
        }
        // bump
        if ( this.bump ) {
            context.strokeStyle = 'black'
            this.draw()
            this.bump = false
        }

        this.draw()
    }
}

let circleArray = []

for ( i = 0; i < 500; i++) {
    let radius = Math.random() * 10 + 1
    let x = Math.random() * (innerWidth - radius * 2) + radius
    let y = Math.random() * (innerHeight - radius *2) + radius
    let dx = (Math.random() - 0.5) *4
    let dy = (Math.random() - 0.5) *4
    circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0,0, innerWidth, innerHeight)

    for (i = 0; i < circleArray.length; i++){
        circleArray[i].update()
    }
}
animate()

function stop () {
    requestAnimationFrame()
}