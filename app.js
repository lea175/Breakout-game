const grid = document.querySelector('.grid')
const blockWidth = 100 
const blockHeight = 20
const userStartPosition = [260,20]
const boardWidth = 620
let userCurrentPosition = userStartPosition



class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis + blockHeight, yAxis]
        this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
    }
}

let blocks = [
    new Block(20, 370),
    new Block(140, 370),
    new Block(260, 370),
    new Block(380, 370),
    new Block(500, 370),
    new Block(20, 320),
    new Block(140, 320),
    new Block(260, 320),
    new Block(380, 320),
    new Block(500, 320),
    new Block(20, 270),
    new Block(140, 270),
    new Block(260, 270),
    new Block(380, 270),
    new Block(500, 270),
]

function drawBlocks() {
    for(i=0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block) 
    }
}
drawBlocks()

//create user block
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)

function drawUser() {
user.style.left = userCurrentPosition[0] + 'px'
user.style.bottom = userCurrentPosition[1] + 'px'
}
drawUser()


//move user
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft': 
        if (userCurrentPosition[0] > 0) {
            userCurrentPosition[0] -= 10
            drawUser()
            break
        }
        case 'ArrowRight':
        if (userCurrentPosition[0] < (boardWidth - blockWidth)) {
            userCurrentPosition[0] += 10
            drawUser()
            break
        }
    }
}
document.addEventListener('keydown', moveUser)