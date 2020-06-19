/**************************
 *       Variables        *
 *************************/
var id;
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
    if((!gameOver || gameOver === "false") && playersTurn) {
        var column = $(this).attr("column");
        playersTurn = false;
        play(column);
        wait();
    }
})

/**************************
 *       Functions        *
 *************************/

function play(column) {
    console.log(roomID + " straight after play()");
    dropColumn(column);
}

function wait() {
    var timer = setInterval(checkForPlayersTurn, 1000);
    
    function checkForPlayersTurn() {
        var gameFile = gameFileAddr + roomID + "-Data.json";
        
        $.getJSON(gameFile, function(response, status) {
            currentPlayer = response.currentPlayer;
            reset = response.reset; 

            if (currentPlayer === player) {
                console.log(currentPlayer +" has been set as currentPlayer");
                clearInterval(timer);
                console.log("timer has been cleared");
                loadMove(roomID);
                console.log("latest move has been loaded");
            } else {
                playersTurn = false;
                console.log("Not your turn, please wait");
            }

            /*if (reset === "yes") {
                clearInterval(timer);
                playersTurn === false;
                setBoard();
                var resetMsg = previousPlayer + " has reset the board";
                reset = false;
                console.log(resetMsg);
                return wait();
            }*/
        });        
    }
}

function loadMove(roomID) {
    getGameBoardFiles(roomID);
    setTimeout(() => {
        console.log("game and board files have been loaded");
        drawDisc(previousPlayer, id, row); // need latest move to send with data.json to draw latest disc each turn.
        if (gameOver === true || gameOver === "true") {
            console.log("game is over, checking how");
            checkForDraw();
            console.log("have checked for a draw");
            console.log("2 the winner is " + winner);
            checkForWinner(winner);
            console.log("have checked for a win");
        }
        playersTurn = true;
        console.log("it is now your turn to play");
        return;
    }, 1000);
    
}


function getGameBoardFiles(roomID) {
    var gameFile = gameFileAddr + roomID + "-Data.json";
    var boardFile = gameFileAddr + roomID + "-Board.json";

    $.getJSON(gameFile, function(response, status) {
        currentPlayer = response.currentPlayer;
        previousPlayer = response.previousPlayer;
        gameOver = response.gameOver;
        id = response.id;
        row = response.row;
        winner = response.winner;
        reset = response.reset;
    });
    

    $.getJSON(boardFile, function(response, status) {
        board = response.board;
        console.log("status of getting boardFile: " + status)
    });    
}

// checks if previous player just won
function checkForWinner() {
    console.log("3 the winner is " + winner);
    if (winner === previousPlayer) {
        playersTurn === false;
        $("#lose").addClass("visible");
        console.log(previousPlayer + "won the game. Reset to play again.");
        return;
    }
}

/*function checkForReset() {
    var gameFile = gameFileAddr + roomID + "-Data.json";
    var timer = setInterval(check, 1000)

    function check() {
        $.getJSON(gameFile, function(response, status) {
            reset = response.reset;

            if (reset === "yes") {
                playersTurn === false;
                setBoard();
                var resetMsg = previousPlayer + " has reset the board";
                reset = false;
                console.log(resetMsg);
                return wait();
            }
        });
    }
}*/

function changePlayers(id, row) {
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
    postGame(id, row, currentPlayer, previousPlayer);
}

function dropColumn(columnNumber) {
    console.log(columnNumber);
    var columnData, id;
    
    columnData = board.filter(x => x.column == columnNumber);
    console.log(columnData);
    for (i = 0; i < columnData.length; i++){
        if (columnData[i].filled === "") {
            columnData[i].filled = currentPlayer;
            id = columnData[i].id;
            console.log("filled id is " + id)
            row = 7 - columnData[i].row;
            drawDisc(currentPlayer, id, row);
            console.log("disc drawn, checking for win...");
            directions.forEach(direction => checkForWin(direction, id, currentPlayer));
            checkForDraw();
            return changePlayers(id, row); // stops loop from running once one disc has been assigned a cell
        }
    } console.log("Column is full"); //please try again function
}

function drawDisc(player, id, row) {
    var playerDisc = "<div class='discs dropped "+ player + "'></div>";
    let discID = Number(id);
    let discRow = Number(row);
    var droppedDisc = "#" + discID;
    let height = -row * parseInt($(".cell").css("height")) + "px";
    let seconds = row * (2/6) + "s";
    $("body").css({
        "--t": height,
        "--s": seconds}
        );
    $(droppedDisc).append(playerDisc);
    

    setTimeout(() => {
        $(".dropped").toggleClass("dropped");
    }, 3000);
    console.log("disc animated");
}

function checkForWin(direction, id, currentPlayer) {
    score = [];
    try {
        for (a = 0; a < 2; a++) { // iterate through first level arrays in directions, directions are grouped either side of the id
            for (i = 0; i < 3; i++) { // iterate through second levels of arrays
                let cellID = Number(id);
                console.log(cellID);
                if (board.find(x => x.id == cellID + direction[a][i]).filled === currentPlayer) {
                    
                    score.push(1);
                    console.log(score + a + i);
                    checkScore(score); // once up and running, check if this can be removed, replace 'checkFinalScore'and add return to end looping
                } else {
                    i = 3;
                    console.log("no matching disc in direction " + direction);
                }
            }
        } checkFinalScore(score);
    } catch(error) {
        //console.log(error);
    }
}

function checkForDraw() {
    cells = board.filter(x => x.filled === "");
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
    } else {
        console.log("No win, keep going")
    }
}

function checkFinalScore(score) { // need to eliminate one of these
    if (score.length >= 3) {
        gameOver = true;
        $("#win").addClass("visible");
        winner = player;
        return;
    } else {
        console.log("No win, keep going 2")
        clearScores(); 
    }
    
}

/*function clearScores() {
    score = [];
}*/

function setBoard(prop) {
    reset = prop;
    gameOver = false;
    winner = "";
    id = undefined;
    currentPlayer = "";
    board = [
        {id: 11, filled: "", column: 0, row: 1},
        {id: 12, filled: "", column: 1, row: 1},
        {id: 13, filled: "", column: 2, row: 1},
        {id: 14, filled: "", column: 3, row: 1},
        {id: 15, filled: "", column: 4, row: 1},
        {id: 16, filled: "", column: 5, row: 1},
        {id: 17, filled: "", column: 6, row: 1},
        {id: 21, filled: "", column: 0, row: 2},
        {id: 22, filled: "", column: 1, row: 2},
        {id: 23, filled: "", column: 2, row: 2},
        {id: 24, filled: "", column: 3, row: 2},
        {id: 25, filled: "", column: 4, row: 2},
        {id: 26, filled: "", column: 5, row: 2},
        {id: 27, filled: "", column: 6, row: 2},
        {id: 31, filled: "", column: 0, row: 3},
        {id: 32, filled: "", column: 1, row: 3},
        {id: 33, filled: "", column: 2, row: 3},
        {id: 34, filled: "", column: 3, row: 3},
        {id: 35, filled: "", column: 4, row: 3},
        {id: 36, filled: "", column: 5, row: 3},
        {id: 37, filled: "", column: 6, row: 3},
        {id: 41, filled: "", column: 0, row: 4},
        {id: 42, filled: "", column: 1, row: 4},
        {id: 43, filled: "", column: 2, row: 4},
        {id: 44, filled: "", column: 3, row: 4},
        {id: 45, filled: "", column: 4, row: 4},
        {id: 46, filled: "", column: 5, row: 4},
        {id: 47, filled: "", column: 6, row: 4},
        {id: 51, filled: "", column: 0, row: 5},
        {id: 52, filled: "", column: 1, row: 5},
        {id: 53, filled: "", column: 2, row: 5},
        {id: 54, filled: "", column: 3, row: 5},
        {id: 55, filled: "", column: 4, row: 5},
        {id: 56, filled: "", column: 5, row: 5},
        {id: 57, filled: "", column: 6, row: 5},
        {id: 61, filled: "", column: 0, row: 6},
        {id: 62, filled: "", column: 1, row: 6},
        {id: 63, filled: "", column: 2, row: 6},
        {id: 64, filled: "", column: 3, row: 6},
        {id: 65, filled: "", column: 4, row: 6},
        {id: 66, filled: "", column: 5, row: 6},
        {id: 67, filled: "", column: 6, row: 6}
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