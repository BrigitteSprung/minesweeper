document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10
    let bombAmount = 20
    let squares = []

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
})