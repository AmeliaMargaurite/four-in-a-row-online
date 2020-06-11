var currentPlayer;
var playerOne = "player-one";
var playerTwo = "player-two";
var score = [];
var column = 0;
var p1Holder = document.getElementById("player--holder__p1");
var p2Holder = document.getElementById("player--holder__p2");
var gameOver = false;

var board
board = [
    {id: 11, filled: null, column: 0},
    {id: 12, filled: null, column: 1},
    {id: 13, filled: null, column: 2},
    {id: 14, filled: null, column: 3},
    {id: 15, filled: null, column: 4},
    {id: 16, filled: null, column: 5},
    {id: 17, filled: null, column: 6},
    {id: 21, filled: null, column: 0},
    {id: 22, filled: null, column: 1},
    {id: 23, filled: null, column: 2},
    {id: 24, filled: null, column: 3},
    {id: 25, filled: null, column: 4},
    {id: 26, filled: null, column: 5},
    {id: 27, filled: null, column: 6},
    {id: 31, filled: null, column: 0},
    {id: 32, filled: null, column: 1},
    {id: 33, filled: null, column: 2},
    {id: 34, filled: null, column: 3},
    {id: 35, filled: null, column: 4},
    {id: 36, filled: null, column: 5},
    {id: 37, filled: null, column: 6},
    {id: 41, filled: null, column: 0},
    {id: 42, filled: null, column: 1},
    {id: 43, filled: null, column: 2},
    {id: 44, filled: null, column: 3},
    {id: 45, filled: null, column: 4},
    {id: 46, filled: null, column: 5},
    {id: 47, filled: null, column: 6},
    {id: 51, filled: null, column: 0},
    {id: 52, filled: null, column: 1},
    {id: 53, filled: null, column: 2},
    {id: 54, filled: null, column: 3},
    {id: 55, filled: null, column: 4},
    {id: 56, filled: null, column: 5},
    {id: 57, filled: null, column: 6},
    {id: 61, filled: null, column: 0},
    {id: 62, filled: null, column: 1},
    {id: 63, filled: null, column: 2},
    {id: 64, filled: null, column: 3},
    {id: 65, filled: null, column: 4},
    {id: 66, filled: null, column: 5},
    {id: 67, filled: null, column: 6}
];

var directions = [
    [[-1,-2,-3], [1,2,3]], // check R to L -x & check R to L +x
    [[-10,-20,-30], [10,20,30]],// check Near to Far -y & // check Near to Far +y
    [[9,18,27], [-9,-18,-27]], // check Near to Far diagonal -x+y & // check Near to Far diagonal x -y
    [[11,22,33], [-11,-22,-33]] // check Near to Far diagonal +x y & // check Near to Far diagon +x-y
];

var resetBtn = document.getElementById("reset-btn");



function clickArrow(columnNumber) {
    if (!gameOver) {
        if (currentPlayer == undefined) {
            console.log(columnNumber)
            start(columnNumber);

        } else {
            nextTurn(columnNumber);
        }
    }
}

function start(columnNumber) {
    //resetBoard();
    currentPlayer = playerOne;
    //var columnNumber = prompt("Where do you want to go? 0-6");
    console.log(currentPlayer);
    dropColumn(columnNumber, currentPlayer);
}

function nextTurn(columnNumber) {
    console.log(currentPlayer + " " + playerOne);
    console.log(currentPlayer)
    //var columnNumber = prompt("Where do you want to go? 0-6");
    dropColumn(columnNumber);
}

function dropColumn(columnNumber) {
    var columnData, id;
    console.log(columnNumber + " " + currentPlayer)
    columnData = board.filter(x => x.column == columnNumber);
    console.log(columnData)
    // need to throw error if column is full already
    
    for (i = 0; i < columnData.length; i++){
        if (columnData[i].filled == null) {
            columnData[i].filled = currentPlayer;
            id = columnData[i].id;
            console.log("Disc dropped into #" + id);
            if (currentPlayer == playerOne) {
                var playerOneDisc = document.createElement("div");
                playerOneDisc.className += "discs player-one";
                document.getElementById(id).appendChild(playerOneDisc);
            } else {
                var playerTwoDisc = document.createElement("div");
                playerTwoDisc.className += "discs player-two";
                document.getElementById(id).appendChild(playerTwoDisc);
            }
            directions.forEach(direction => checkForWin(direction, id, currentPlayer));
            console.log("Next players turn");
            console.log(currentPlayer);
            return nextPlayer(); // stops loop from running once one disc has been assigned a cell
        }
    } console.log("Column is full"); //please try again function
}


function checkForWin(direction, id, currentPlayer) {
    score = [];
    try {
        for (a = 0; a < 2; a++) { // iterate through first level arrays in directions, directions are grouped either side of the id
            console.log(a + " a");
            for (i = 0; i < 3; i++) { // iterate through second levels of arrays
                console.log(i + " i");
                if (board.find(x => x.id === id + direction[a][i]).filled == currentPlayer) {
                    score.push(1);
                    console.log(score + " " + id + " " + direction[a]);
                    checkScore(score);
                } else {
                    i = 3;
                }
            }
        } checkFinalScore(score);
    } catch(error) {
        //console.log(error);
    }
}

function checkScore(score) {
    if (score.length >= 3) {
        gameOver = true;
        console.log("Congratulations " + currentPlayer + " you've won!");
        document.getElementById("win").className += " visible";
        //return nextPlayer = currentPlayer;
    } 
    //return nextPlayer = currentPlayer;
}

function checkFinalScore(score) {
    if (score.length >= 3) {
        gameOver = true;
        console.log("Congratulations " + currentPlayer + " you've won!");
        document.getElementById("win").className += " visible";
        //return nextPlayer = currentPlayer;
        return;
    } clearScores()
    //return nextPlayer = currentPlayer; 
}

function clearScores() {
    score = [];
}

function nextPlayer() {
    

    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
        p1Holder.classList.remove("active");
        p2Holder.classList.add("active");
        return currentPlayer;
    } else if (currentPlayer == playerTwo) {
        currentPlayer = playerOne;
        p2Holder.classList.remove("active");
        p1Holder.classList.add("active");
        return currentPlayer;
    } else {
        console.log("Oh my gosh, wtf");
        return;
    }
}

function resetBoard() {
    var cells = document.getElementsByClassName("cell");
    
    for (i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount >= 1) {
            cells[i].removeChild(cells[i].childNodes[0]);
        }
    }
    gameOver = false;
    document.getElementById("win").classList.remove("visible");

    board = [
        {id: 11, filled: null, column: 0, row: 1},
        {id: 12, filled: null, column: 1, row: 1},
        {id: 13, filled: null, column: 2, row: 1},
        {id: 14, filled: null, column: 3, row: 1},
        {id: 15, filled: null, column: 4, row: 1},
        {id: 16, filled: null, column: 5, row: 1},
        {id: 17, filled: null, column: 6, row: 1},
        {id: 21, filled: null, column: 0, row: 2},
        {id: 22, filled: null, column: 1, row: 2},
        {id: 23, filled: null, column: 2, row: 2},
        {id: 24, filled: null, column: 3, row: 2},
        {id: 25, filled: null, column: 4, row: 2},
        {id: 26, filled: null, column: 5, row: 2},
        {id: 27, filled: null, column: 6, row: 2},
        {id: 31, filled: null, column: 0, row: 3},
        {id: 32, filled: null, column: 1, row: 3},
        {id: 33, filled: null, column: 2, row: 3},
        {id: 34, filled: null, column: 3, row: 3},
        {id: 35, filled: null, column: 4, row: 3},
        {id: 36, filled: null, column: 5, row: 3},
        {id: 37, filled: null, column: 6, row: 3},
        {id: 41, filled: null, column: 0, row: 4},
        {id: 42, filled: null, column: 1, row: 4},
        {id: 43, filled: null, column: 2, row: 4},
        {id: 44, filled: null, column: 3, row: 4},
        {id: 45, filled: null, column: 4, row: 4},
        {id: 46, filled: null, column: 5, row: 4},
        {id: 47, filled: null, column: 6, row: 4},
        {id: 51, filled: null, column: 0, row: 5},
        {id: 52, filled: null, column: 1, row: 5},
        {id: 53, filled: null, column: 2, row: 5},
        {id: 54, filled: null, column: 3, row: 5},
        {id: 55, filled: null, column: 4, row: 5},
        {id: 56, filled: null, column: 5, row: 5},
        {id: 57, filled: null, column: 6, row: 5},
        {id: 61, filled: null, column: 0, row: 6},
        {id: 62, filled: null, column: 1, row: 6},
        {id: 63, filled: null, column: 2, row: 6},
        {id: 64, filled: null, column: 3, row: 6},
        {id: 65, filled: null, column: 4, row: 6},
        {id: 66, filled: null, column: 5, row: 6},
        {id: 67, filled: null, column: 6, row: 6}
    ],  currentPlayer = undefined;;
}
