document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    let score = 0
    const width = 4
    let squares = []
    function createBoard() {
        for(let i = 0 ; i < width * width ; i++) {
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
    }
    createBoard()


    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    function moveRight() {
        for(let i = 0 ; i < width * width ; i+=4) {
            let a = +squares[i].innerHTML
            let b = +squares[i+1].innerHTML
            let c = +squares[i+2].innerHTML
            let d = +squares[i+3].innerHTML
            let row = [a, b, c, d]
            let filled = row.filter(n => n)
            let zeros = Array(width - filled.length).fill(0)
            let newRow = zeros.concat(filled)
            squares[i].innerHTML = newRow[0]
            squares[i+1].innerHTML = newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]
        }
    }

    function moveLeft() {
        for(let i = 0 ; i < width * width ; i+=4) {
            let a = +squares[i].innerHTML
            let b = +squares[i+1].innerHTML
            let c = +squares[i+2].innerHTML
            let d = +squares[i+3].innerHTML
            let row = [a, b, c, d]
            let filled = row.filter(n => n)
            let zeros = Array(width - filled.length).fill(0)
            let newRow = filled.concat(zeros)
            squares[i].innerHTML = newRow[0]
            squares[i+1].innerHTML = newRow[1]
            squares[i+2].innerHTML = newRow[2]
            squares[i+3].innerHTML = newRow[3]
        }
    }

    function moveUp() {
        for(let i = 0; i < width; i++) {
            let a = +squares[i].innerHTML
            let b = +squares[i+width].innerHTML
            let c = +squares[i+width*2].innerHTML
            let d = +squares[i+width*3].innerHTML
            let row = [a, b, c, d]
            let filled = row.filter(n => n)
            let zeros = Array(width - filled.length).fill(0)
            let newRow = filled.concat(zeros)
            squares[i].innerHTML = newRow[0]
            squares[i+width].innerHTML = newRow[1]
            squares[i+width*2].innerHTML = newRow[2]
            squares[i+width*3].innerHTML = newRow[3]
        }
    }

    function moveDown() {
        for(let i = 0 ; i < width ; i++) {
            let a = +squares[i].innerHTML
            let b = +squares[i+width].innerHTML
            let c = +squares[i+width*2].innerHTML
            let d = +squares[i+width*3].innerHTML
            let row = [a, b, c, d]
            let filled = row.filter(n => n)
            let zeros = Array(width - filled.length).fill(0)
            let newRow = zeros.concat(filled)
            squares[i].innerHTML = newRow[0]
            squares[i+width].innerHTML = newRow[1]
            squares[i+width*2].innerHTML = newRow[2]
            squares[i+width*3].innerHTML = newRow[3]
        }
    }

    function combineRow() {
        for(let i = 0; i < width * width - 1 ; i++) {
            if(squares[i].innerHTML == squares[i+1].innerHTML) {
                score += +squares[i].innerHTML + +squares[i+1].innerHTML
                squares[i].innerHTML = score
                squares[i+1].innerHTML = 0
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for(let i = 0; i < width * (width - 1) - 1 ; i++) {
            if(squares[i].innerHTML == squares[i+width].innerHTML) {
                score += +squares[i].innerHTML + +squares[i+width].innerHTML
                squares[i].innerHTML = score
                squares[i+width].innerHTML = 0
            }
        }
        checkForWin()
    }

    function control(e) {
        if (e.keyCode === 39)
            keyRight()
        else if (e.keyCode === 37)
            keyLeft()
        else if (e.keyCode === 38)
            keyUp()
        else if(e.keyCode === 40)
            keyDown()
    }

    window.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function checkForWin() {
        scoreDisplay.innerHTML = score
        for (let i = 0 ; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You Won!'
                window.removeEventListener('keyup', control)
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0
        for (let i = 0 ; i < squares.length; i++) {
            if(squares[i].innerHTML == 0){
                zeros++
            }
        }
        
        if(zeros === 0) {
            resultDisplay.innerHTML = 'You Lost!'
            window.removeEventListener('keyup', control)
        }
    }

})