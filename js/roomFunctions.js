/*******************
 *    Variables    *
 *******************/

var transferDataFile = "/online/php/gameSaving.php";
var gameFileAddr = "/online/active-games/";
var randomNumber = Math.floor((Math.random() * 10000) + 1);
var playersTurn, currentPlayer, row, id; 
var playerOne = "player-one";
var playerTwo = "player-two";
let roomID = "";
let reset = false;

/********************
 *     Events       *
 ********************/

// When first player presses START to initiate a game
    

$("#start").on("click", function() {
    setRoomID();
    checkIfRoomExists();
    player = playerOne;
    createNewPlayer();
    currentPlayer = player;
    previousPlayer = playerTwo; 
    var url = "www.everlearning.com.au/four-in-a-row";
    var instruction = "<p> Send the below message to your opponent to play, then when you're ready, press PLAY! </p>";
    var invite = "<p class='invite'>Join me in a game of Connect Four, at <strong>" + url + "</strong> with Room ID <strong>" + roomID + "</strong> </p>";
    var goBtn = "<button class='btn' id='go'>GO!</button>";
    // produce URL with roomID inside with one click copy -- AND -- alternative, separate URL and roomID
    $("#start-menu").empty();
    $("#start-menu").append(instruction, invite, goBtn);
    playersTurn = true;
    //checkForReset();
})

// GO! button appears after playerOne has initiated game and shared link
$("#start-menu").on("click", ("#go"), function() {
    $("#start-menu").empty();
    // create roomID-Board.json file
    createBoardJSON();
    // create roomID-Data.json file
    createRoomJSON();
    // add waiting for player two message
    var waitingMsg = "<p>Waiting for Player Two to join...</p>";
    $("#start-menu").append(waitingMsg);
    // wait for response to start
    waitingForPlayerTwoJoin();
    $("#start-menu").css("visibility", "hidden");
});

// When opponent ENTERS roomID and presses JOIN to join a game
$("#join").on("click", function() {
    roomID = $("#roomID").val();
    player = playerTwo;
    playersTurn = false;
    createNewPlayer();
    $("#start-menu").css("visibility", "hidden");
    wait(roomID);
    //checkForReset(roomID);
})

/*************************
 *       Functions       *
 *************************/

// Should only be called once per game session
function setRoomID() { 
    roomID = Math.floor((Math.random()*10000) + 1);
}

function checkIfRoomExists() {
    let roomFile = gameFileAddr + roomID + "-player-one.json";
    $.get(roomFile, function(data, status) {
        if (status !== "success") {
            console.log("room doesn't exist, ok to create");
            return;
        } else {
            console.log("room exists, trying again");
            setRoomID();
            checkIfRoomExists();
        }
    });
}

function createNewPlayer() {
    $.post(transferDataFile, {
        "roomID": roomID,
        "player": player
    },
    function(response, status) {
    },
    "json"
    );
}

function createBoardJSON() {
    $.post(transferDataFile, {
        "roomID": roomID,
        "createBoard": "yes"
    }, function(response, status) {
    },
    "json"
    );
}

function createRoomJSON() {
    $.post(transferDataFile, {
        "roomID": roomID,
        "createRoomInfo": "yes"
    }, function(response, status) {
    },
    "json"
    );
}

function waitingForPlayerTwoJoin() {
    let timer = setInterval(check, 1000);
    let roomFile = gameFileAddr + roomID + "-player-two.json";
    function check() {
        $.get(roomFile, function(data, status) {
            if (status === "success") {
                clearInterval(timer);
                return;
            }
        });
    }
}

