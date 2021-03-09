//Anthony Dagostino tic tac toe js code
//Started 2/25/21 and completed 3/4/21
//This is the backend code for our tic tac toe game,
//handling the logic of how the game runs


let currentPlayer = "X";    //marker for which turn it is
let gameOn = true;  //flag for game completion

//Where we will display player turn and game result
let playerBanner = document.getElementById("player");

//Messages for game outcomes
const winMessage = () => "Player " + currentPlayer + " has won!";
const drawMessage = () => "Game Over. Draw!";

//Array of all possible winning configurations on game grid
const winConditions = [
    [11, 12, 13],
    [21, 22, 23],
    [31, 32, 33],
    [11, 21, 31],
    [12, 22, 32],
    [13, 23, 33],
    [11, 22, 33],
    [13, 22, 31]
];

//Grab game cell objects from the webpage
let cells = document.getElementsByTagName("td");

//use a loop to add mouseOver and mouseOut events for all cells
for (square of cells) {
    square.addEventListener("mouseover", function(event) {
        event.target.style.backgroundColor = "rgb(187, 187, 187)";
    })
    square.addEventListener("mouseout", function(event) {
        event.target.style.backgroundColor = "white";
    })
}

//Use a loop to add click event for all cells
for (square of cells) {
    square.addEventListener("click", function(event) {
        
        //If a cell is already filled, do not allow another click
        if (event.target.innerHTML !== "") {
            return;
        }
        
        //If the game is over, break the loop
        else if (!gameOn) {
            return;
        }

        //If the game is still running, add the current player's marker
        //to the clicked cell
        else {
            event.target.innerHTML = currentPlayer;

            //After every click, check if somebody won
            checkWin();

            //Again, if somebody won, break the loop
            if (!gameOn) {
                return
            }
            
            //If no winner, update banner message depending on player turn
            if (gameOn && currentPlayer === "X") {
                currentPlayer = "O";
                playerBanner.innerHTML = "Player O's Turn";
            }
            else if (gameOn && currentPlayer === "O") {
                currentPlayer = "X";
                playerBanner.innerHTML = "Player X's Turn";
            }
        }
    })
}

//Evaluate our game grid for winning combinations
function checkWin() {
    
    //Create new array from HTMLCollection object
    let cells2 = Array.from(cells);
    let gameWin = false;    //flag for if a win is detected
    let gridFull = false;   //flag for if the game grid is completely filled
    fullSquares = 0     //counter to keep track of empty spaces

    //Iterate through array of possible win combinations
    //and check if our grid matches any possible wins
    for (let index = 0; index <= 7; index++) {
        const winCombo = winConditions[index];
        let a = $(winCombo[0]).innerHTML;
        let b = $(winCombo[1]).innerHTML;
        let c = $(winCombo[2]).innerHTML;

        //If any of our selected cells to check are empty, we know
        //this combination is not a win. Continue to next iteration
        if (a === '' || b === '' || c === '') {
            continue;
        }

        //If all cells match, set win flag and break out of loop
        if (a === b && b === c) {
            gameWin = true;
            break
        }
    }

    //If a win is detected, display win message on banner and change
    //overall gamestate flag
    if (gameWin) {
        playerBanner.innerHTML = winMessage();
        gameOn = false;
    }
    
    //If no win is detected, check if all cells are full
    for (square of cells2) {
        if (square.innerHTML === "") {
            continue;
        }
        else {
            fullSquares++;
        }
    }  
    
    //If game grid is full but no win is detected, display draw message
    //and end the game
    if (fullSquares === 9 && !gameWin) {
        playerBanner.innerHTML = drawMessage();
        gameOn = false;
    }

}

//Quick function to get cell IDs, used in our Checkwin function to obtain values
$ = x => document.getElementById(x);

