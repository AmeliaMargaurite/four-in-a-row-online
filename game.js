
var playerOne = "player-one";
var playerTwo = "player-two";
var winner = "";
var score = [];
var column = 0;
var p1Holder = document.getElementById("player--holder__p1");
var p2Holder = document.getElementById("player--holder__p2");
var directions = [
    [[-1,-2,-3], [1,2,3]], // check R to L -x & check R to L +x
    [[-10,-20,-30], [10,20,30]],// check Near to Far -y & // check Near to Far +y
    [[9,18,27], [-9,-18,-27]], // check Near to Far diagonal -x+y & // check Near to Far diagonal x -y
    [[11,22,33], [-11,-22,-33]] // check Near to Far diagonal +x y & // check Near to Far diagon +x-y
    ];
var board = [
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
]; 


function dropColumn(columnNumber) {
    var columnData, id;
    columnData = board.filter(x => x.column == columnNumber);
    
    for (i = 0; i < columnData.length; i++){
        if (columnData[i].filled === null) {
            columnData[i].filled = currentPlayer;
            id = columnData[i].id;
            row = 7 - columnData[i].row;
            dropDisc(currentPlayer, id, row);
            directions.forEach(direction => checkForWin(direction, id, currentPlayer));
            checkForDraw();
            return nextPlayer(id, row); // stops loop from running once one disc has been assigned a cell
        }
    } console.log("Column is full"); //please try again function
}

function dropDisc(player, id, row) {
    var playerDisc = document.createElement("div");
    playerDisc.className += "discs " + player;
    document.getElementById(id).appendChild(playerDisc);
    playerDisc.style.transform = "translateY(" + row * -110 + "px)";
    playerDisc.style.transition = "transform 3s ease-in-out";
    playerDisc.classList.add("dropped");
    playerDisc.style.removeProperty("transform");
}



function checkForWin(direction, id, currentPlayer) {
    score = [];
    try {
        for (a = 0; a < 2; a++) { // iterate through first level arrays in directions, directions are grouped either side of the id
            for (i = 0; i < 3; i++) { // iterate through second levels of arrays
                if (board.find(x => x.id === id + direction[a][i]).filled === currentPlayer) {
                    
                    score.push(1);
                    console.log(score + a + i);
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
        document.getElementById("win").className += " visible";
        winner = player;
    } 
}

function checkFinalScore(score) {
    if (score.length >= 3) {
        gameOver = true;
        document.getElementById("win").className += " visible";
        winner = player;
        return;
    } clearScores() 
}

function clearScores() {
    score = [];
}

function checkForDraw() {
    cells = board.filter(x => x.filled === null);
    if (cells.length === 0) {
        console.log("draw");
    }  
}

function nextPlayer(id, row) {
var previousPlayer;

    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
        previousPlayer = playerOne;
        postGame(id, row, currentPlayer, previousPlayer);
    } else if (currentPlayer == playerTwo) {
        currentPlayer = playerOne;
        previousPlayer = playerTwo;
        
        //return currentPlayer;
        postGame(id, row, currentPlayer, previousPlayer);
    } else {
        console.log("Oh my gosh, wtf");
        return;
    }
    p2Holder.classList.toggle("active");
    p1Holder.classList.toggle("active");
}

function setBoard() {
    gameOver = false;
    winner = "";
    id = undefined;
    currentPlayer = playerOne;
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
    ]
    
    var cells = document.getElementsByClassName("cell");
    for (i = 0; i < cells.length; i++) {
        if (cells[i].childElementCount >= 1) {
            cells[i].removeChild(cells[i].childNodes[0]);
        }
    }
    
    var banners = document.getElementsByClassName("banner")
    for (i = 0; i < banners.length; i++) {
        if (banners[i].classList.contains("visible")) {
            banners[i].classList.remove("visible");
        }
    }
}
