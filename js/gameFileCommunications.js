/*********************
 *     Variables     *
 *********************/

var roomJSON, roomID, reset, previousPlayer;
var gameSave = "gameSaving.php";
var gameFile = "php/" + roomID + "Data.json";
var boardFile = "php/" + roomID + "Board.json";

/*********************
 *     Functions     *
 *********************/

function postGame(id, row, currentPlayer, previousPlayer) {
    //roomID = $("#roomID").val();
    //roomJSON = roomID + ".json";
    console.log(roomID);
    $.post(gameSave,
        {
            //"roomID": roomID,
            //"newMove": true,
            "currentPlayer": currentPlayer,
            "previousPlayer": previousPlayer,
            "gameOver": gameOver,
            "id": id,
            "row": row,
            "winner": winner,
            "reset": reset,
            "newMove": "yes"
        },
        function(response, status){
        },
        "json"
    );

    $.post(gameSave, 
        {
            "board": board
        },
        function(response, status){
        },
        "json"
    );

    if (gameOver === false || gameOver === "false") {
    return;
    }
}