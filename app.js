const grid = document.querySelector('.grid')
//const block = document.querySelector('.block')
const blockWidth = 100 
const blockHeight = 20
const blocks = []

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis + blockHeight, yAxis]
        this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
    }
}

blocks = [
    new Block(20, 370)
]

function drawBlocks {
    
}