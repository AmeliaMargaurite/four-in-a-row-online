var player = $("#player").text();
var data = {};
var roomJSON, roomID, reset, previousPlayer;
var gameSave = "gameSaving.php";

/*$("#start").on("click", function() {
    console.log(player);
    roomID = $("#roomID").val();
    //roomPHP = roomID + ".php";
    playersTurn = true;
    createNewFile();
    $("#start-menu").css("visibility", "hidden");
    
})*/


function startNewGame() {
    console.log(player);
    roomID = $("#roomID").val();
    playersTurn = true;
    createNewFile();
    $("#start-menu").css("visibility", "hidden");   
}

// on start click 
function createNewFile() {
    currentPlayer = player;
    if (currentPlayer === playerOne) {
        previousPlayer = playerTwo;
    } else {
        previousPlayer = playerOne;
    }
    $.post(gameSave, {
        "roomID": roomID,
        "first": true,
        "reset": reset,
        "currentPlayer": currentPlayer
    }, function(response, status) {
        $("#errors").html(response);
        console.log(response + " " + status);
    })
};


function postGame(id, row, currentPlayer, previousPlayer) {
    roomID = $("#roomID").val();
    //roomJSON = roomID + ".json";
    console.log(roomID);
    $.post(gameSave,
        {
            "roomID": roomID,
            "newMove": true,
            "currentPlayer": currentPlayer,
            "previousPlayer": previousPlayer,
            "gameOver": gameOver,
            "id": id,
            "row": row,
            "winner": winner,
            "reset": reset
        },
        function(response, status){
            
        },
        "json"
    );

    if (gameOver === false || gameOver === "false") {
    checkForMovesTimer();
    }
}

function checkForMovesTimer() {
    var timer = setInterval(moveTimer, 1000);
    var currentGame = roomID + ".json";

    function moveTimer() {
        $.getJSON(currentGame, function(response) {
            gameOver = response.gameOver;
            currentPlayer = response.currentPlayer;
            previousPlayer = response.previousPlayer;
            id = response.id;
            row = response.row;
            winner = response.winner;
            reset = response.reset;
        });
        checkForReset();
        if (currentPlayer === player && (gameOver === false || gameOver === "false")) {
            clearInterval(timer);
            playMove();
        } else if (gameOver === true || gameOver === "true"){
            clearInterval(timer);
            playMove();
            if (winner != currentPlayer) {
                document.getElementById("lose").className += " visible";
                console.log("game over, please reset");
            }
        } else {
            console.log("not your turn, please wait.")
        }
    }
}

function checkForReset() {
    if (reset === true || reset === "true") {
        setBoard();
        var resetMsg = previousPlayer + " has reset the board";
        reset = false;
        console.log(resetMsg);
        return
    }
}

function playMove() {
    cell = board.find(x => x.id == id);
    cell.filled = previousPlayer;
    playersTurn = true;
    p2Holder.classList.toggle("active");
    p1Holder.classList.toggle("active");
    console.log(board);
    console.log("your turn, play on");
    dropDisc(previousPlayer, id, row);
}



$("#join").on("click", function() {
    roomID = $("#roomID").val();
    currentGame = roomID + ".json";
    playersTurn = false;
    //currentPlayer = playerOne;

    $.get(currentGame, function(response) {
        gameOver = response.gameOver;
        id = response.id;
        cell = board.filter(x => x.id == id);
        cell.filled = currentPlayer
        $("#start-menu").css("visibility", "hidden")
        }
    );
    checkForMovesTimer();
})

$(".arrow--holder").on("click", function() {
    if((!gameOver || gameOver === "false") && playersTurn) {
        var column = $(this).attr("column");
        dropColumn(column);
        playersTurn = false;
    } else if (!playersTurn) {
        console.log("Not your turn, please wait");
    } else {
        console.log("Game over, press reset to start again");
    }
});

$("#reset-btn").on("click", function () {
    /*setBoard();
    reset = true;
    currentPlayer = player;
    playersTurn = true;
    createNewFile();*/
    location.reload();
})
