const grid = document.querySelector('.grid')
let score = document.querySelector('#score')
const blockWidth = 100 
const blockHeight = 20
const boardWidth = 620
const boardHeight = 400
const ballDiameter = 20
const userWidth = 100
const userHeight = 20


let intervalId

const userStartPosition = [260,20]
let userCurrentPosition = userStartPosition

const ballPosition = [300, 50]
let ballCurrentPosition = ballPosition

let xDirection = 2
let yDirection = 2


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

//add user
const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()


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

function drawUser() {
user.style.left = userCurrentPosition[0] + 'px'
user.style.bottom = userCurrentPosition[1] + 'px'
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}


intervalId = setInterval(moveBall, 20)


function checkForCollisions() {
    //check  for colllisions with blocks
    for(i = 0; i < blocks.length; i ++) {
        if(ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] && ballCurrentPosition[1] > blocks[i].bottomLeft[1] 
            && ballCurrentPosition[1] < blocks[1].topLeft[1]) {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(0,1)
                changeDirection()
            }
            
    }


//check for wall collisions
   if(ballCurrentPosition[0] >= (boardWidth - ballDiameter)
   || ballCurrentPosition[1] >= (boardHeight - ballDiameter)
   || ballCurrentPosition[0] <= 0){
    changeDirection()
   }
    if(ballCurrentPosition[0] > userCurrentPosition[0] && ballCurrentPosition[0] < (userCurrentPosition[0] + userWidth)
    && ballCurrentPosition[1] > userCurrentPosition[1] && ballCurrentPosition[1] < (userCurrentPosition[1] + userHeight)) {
        changeDirection()

    }
//check for game over
 if(ballCurrentPosition[1] === 0) {
    score.innerHTML = 'you lose'
    clearInterval(intervalId)
    document.removeEventListener('keydown', moveUser)
}
}


//change direction when it hits the grid 
function changeDirection() {
    if(xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
   if(xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
    if(xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
}
