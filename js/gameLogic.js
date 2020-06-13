/**************************
 *       Variables        *
 *************************/

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

/**************************
 *        Events          *
 *************************/
$(".arrow--holder").on("click", function() {
    if((!gameOver || gaveOver === "false") && playersTurn) {
        var column = $(this).attr("column");
        play(column);
        wait();
    }
})

/**************************
 *       Functions        *
 *************************/

function play(column) {
    dropColumn(column);
    drawDisc(currentPlayer, id, row);
    directions.forEach(direction => checkForWin(direction, id, currentPlayer));
    checkForDraw();
    nextPlayer(id, row); // stops loop from running once one disc has been assigned a cell
    changePlayers();
    postGame(id, row, currentPlayer, previousPlayer);
    wait();
}

function wait() {
    var timer = setInterval(checkForPlayersTurn, 1000);

    function checkForPlayersTurn() {
        $.getJSON(gameFile, function(response, status) {
            currentPlayer = response.currentPlayer;
        });
        if (currentPlayer === player) {
            clearInterval(timer);
            loadMove();
        }
    }
}

function loadMove() {
    getGameBoardFiles();

    if (gameOver === true || gameOver === "true") {
        checkForDraw();
        checkForWinner();
        checkForReset();
    }

    playersTurn = true;
    return;
}


function getGameBoardFiles() {
    $.getJSON(gameFile, function(response, status) {
        currentPlayer = response.currentPlayer;
        previousPlayer = response.previousPlayer;
        gameOver = response.gameOver;
        id = response.id;
        row = response.row;
        winner.response.winner;
        reset.response.reset;
    });
    $.getJSON(boardFile, function(response, status) {
        board = response.board;
    });
}

// checks if previous player just won
function checkForWinner() {
    if (winner === previousPlayer) {
        playersTurn === false;
        $("#lose").addClass("visible");
        console.log(previousPlayer + "won the game. Reset to play again.");
        return;
    }
}

function checkForReset() {
    if (reset === true || reset === "true") {
        playersTurn === false;
        setBoard();
        var resetMsg = previousPlayer + " has reset the board";
        reset = false;
        console.log(resetMsg);
        return
    }
}

function changePlayers() {
    var previousPlayer;
    p2Holder.classList.toggle("active");
    p1Holder.classList.toggle("active");

    if (currentPlayer == playerOne) {
        currentPlayer = playerTwo;
        previousPlayer = playerOne;
    } else {
        currentPlayer = playerOne;
        previousPlayer = playerTwo; 
    }
}

function setBoard() {
    gameOver = false;
    winner = "";
    id = undefined;
    currentPlayer = "";
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

function dropColumn(columnNumber) {
    var columnData, id;
    columnData = board.filter(x => x.column == columnNumber);
    
    for (i = 0; i < columnData.length; i++){
        if (columnData[i].filled === null) {
            columnData[i].filled = currentPlayer;
            id = columnData[i].id;
            row = 7 - columnData[i].row;
        }
    } console.log("Column is full"); //please try again function
}

function drawDisc(player, id, row) {
    var playerDisc = "<div class='discs '"+ player + "'></div>"
    $("'#"+id+"'").append(playerDisc);
}

function checkForWin(direction, id, currentPlayer) {
    score = [];
    try {
        for (a = 0; a < 2; a++) { // iterate through first level arrays in directions, directions are grouped either side of the id
            for (i = 0; i < 3; i++) { // iterate through second levels of arrays
                if (board.find(x => x.id === id + direction[a][i]).filled === currentPlayer) {
                    
                    score.push(1);
                    console.log(score + a + i);
                    checkScore(score); // once up and running, check if this can be removed, replace 'checkFinalScore'and add return to end looping
                } else {
                    i = 3;
                }
            }
        } checkFinalScore(score);
    } catch(error) {
        //console.log(error);
    }
}

function checkForDraw() {
    cells = board.filter(x => x.filled === null);
    if (cells.length === 0) {
        console.log("draw"); // need banner
        return;
    }  return;
}

function checkScore(score) { // need to eliminate one of these
    if (score.length >= 3) {
        gameOver = true;
        $("#win").addClass("visible");
        winner = player;
    } 
}

function checkFinalScore(score) { // need to eliminate one of these
    if (score.length >= 3) {
        gameOver = true;
        $("#win").addClass("visible");
        winner = player;
        return;
    } clearScores(); 
}

/*function clearScores() {
    score = [];
}*/