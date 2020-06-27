/*********************
 *     Variables     *
 *********************/

var roomJSON, previousPlayer, gameOver, winner;
var gameSave = "php/gameSaving.php";
var gameFile = gameFileAddr + roomID + "-Data.json";
var boardFile = gameFileAddr + roomID + "-Board.json";
var winner = null;

/*********************
 *     Functions     *
 *********************/

function postGame(id, row, currentPlayer, previousPlayer) {
    //roomID = $("#roomID").val();
    //roomJSON = roomID + ".json";
    console.log("current ID and Row are " + id + " " + row);
    $.post(gameSave,
        {
            "roomID": roomID,
            "currentPlayer": currentPlayer,
            "previousPlayer": previousPlayer,
            "gameOver": gameOver,
            "id": id,
            "row": row,
            "winner": winner,
            "reset": reset,
            "newMove": "yes",
            "board": board
        },
        function(response, status){
        },
        "json"
    );
    console.log(winner);
    playersTurn = false;
    if (gameOver === false || gameOver === "false") {
    return gameOver;
    }
}