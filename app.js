document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let flags = 0
    let squares = []
    let isGameOver = false

    // Create Board
    function createBoard() {
        //get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width*width - bombAmount).fill('valid')
       
        // Joins the two arrays together
        const gameArray = emptyArray.concat(bombArray)
        
        // Shuffles the array for the game
        const shuffledArray = gameArray.sort(() => Math.random() -0.5)
        console.log(shuffledArray)

        for (let i=0; i<width*width; i++){
            const square = document.createElement('div')
            square.setAttribute('id', i)
            // Add the class from the shuffledArray to the square
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            // Normal Click
            square.addEventListener('click', function(e){
                click(square)
            })

            // Cntrl and left click
            square.oncontextmenu = function(e){
                e.preventDefault()
                addFlag(square)
            }
        }

        // add numbers to surrounding squares
        for (let i=0; i<squares.length; i++){
            // variable to hold no. of neighbouring bombs
            let total = 0

            // Deeply equal - check if position of square is at the edges
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1) // eg. 19 % 10 = 9 = 10 - 1

            // Left
            if (i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
            // Top Right
            if (i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
            // Top
            if (i>10 && squares[i-width].classList.contains('bomb')) total++
            // Top Left
            if (i>11 && !isLeftEdge && squares[i-1-width].classList.contains('bomb')) total++
            // Right
            if (i<98 && !isRightEdge && squares[i+1].classList.contains('bomb')) total ++
            // Bottom left
            if (i<90 && !isLeftEdge && squares[i-1+width].classList.contains('bomb')) total++
            // Bottom Right
            if (i<88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
            // Bottom
            if (i<89 && squares[i+width].classList.contains('bomb')) total++

            squares[i].setAttribute('data', total)
        }
    }
    createBoard()

    // Add flag with right click
    function addFlag(square){
        if (isGameOver) return
        if (!square.classList.contains('checked') && flags < bombAmount){
            if (!square.classList.contains('flag')){
                square.classList.add('flag')
                square.innerHTML = '🚩'
                flags ++
                checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                flags --
            }
        }
    }

    // Click on square actions
    function click(square){
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')){
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }


    // Check the neighbouring square once the square is clicked
    function checkSquare(square, currentId){
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width - 1)

        // We want this to run just a little bit later due to the recursion
        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge){
                const newId = squares[parseInt(currentId)-1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                const newId = squares[parseInt(currentId) - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId <98 && !isRightEdge) {
                const newId = parseInt(currentId) + 1
                const newSquare = document.getElementById(newId)
                click(newSquare)
            } 
            if (currentId<90 && !isLeftEdge) {
                const newId = parseInt(currentId) -1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            } 
            if (currentId<88 && !isRightEdge){
                const newId = parseInt(currentId) + 1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            } 
            if (currentId<89) {
                const newId = parseInt(currentId) + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            } 
        }, 10)
    }

    // What to do when the game is over
    function gameOver(square){
        console.log('Boom! Game Over!')
        isGameOver = true

        // Show all the bomb locations when game is over
        squares.forEach(square => {
            if (square.classList.contains('bomb')){
                square.innerHTML = '💣'
            }
        })
    }

    // Check for a win
    function checkForWin(){
        let matches = 0
        for (let i=0; i<squares.length; i++){
            if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')){
                matches++
            }
            if (matches === bombAmount){
                console.log('YOU WON!!')
            }
        }
    }


})