var player = $("#player").text();
var data = {};
var roomJSON, roomID;
var gameSave = "gameSaving.php";

$("#start").on("click", function() {
    console.log(player);
    roomID = $("#roomID").val();
    //roomPHP = roomID + ".php";
    playersTurn = true;
    createNewFile();
    $("#start-menu").css("visibility", "hidden")
})

// on start click 
function createNewFile() {
    $.post(gameSave, {
        "roomID": roomID,
        "first": true
    }, function(response, status) {
        $("#errors").html(response);
        console.log(response + " " + status);
    })
    // need to open php file which creates new files.
};
    // create new php and new PHP files using room ID as name


function postGame() {
    roomID = $("#roomID").val();
    roomJSON = roomID + ".json";
    $.post(gameSave, 
        {
            "roomID": roomID,
            "first": false,
            "currentPlayer": currentPlayer,
            "gameOver": gameOver,
            "board": board
        },
        function(response, status){
            console.log("Data: " + response.currentPlayer + "\nStatus: " + status);
        },
        "PHP"
    );
}

function checkPlayer() {
    $.getJSON(gameSave, function(response) {
        if (response.currentPlayer === player) {
            playersTurn = true;
            console.log("your turn, play on");
        } else {
            console.log(response);
            console.log(gameFile);
        }
    });
    
}



$("#join").on("click", function() {
    roomID = $("#roomID").val();
    roomJSON = roomID + ".json";
    playersTurn = false;
    currentPlayer = playerOne;

    $.get(roomJSON, function(response) {
        gameOver = response.gameOver;
        board = response.board;
        console.log(response.gameOver)
        $("#start-menu").css("visibility", "hidden")
        // needs to trigger function to wait for response
        // merge with above function, using if/else statement to choose between
        }
    );
})

$(".arrow--holder").on("click", function() {
    if(!gameOver && playersTurn) {
        var column = $(this).attr("column");
        dropColumn(column);
        playersTurn = false;
    } else if (playersTurn === false) {
        console.log("Not your turn, please wait");
    } else {
        console.log("Game over, press reset to start again");
    }
});

