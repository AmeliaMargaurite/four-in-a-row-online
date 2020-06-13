/*******************
 *    Variables    *
 *******************/

var transferDataFile = "php/transferData.php";
var randomNumber = Math.floor((Math.random() * 10000) + 1);
var roomID; 
var playerOne = "player-one";
var playerTwo = "player-two";

/********************
 *     Events       *
 ********************/

// When first player presses START to initiate a game
    

$("#start").on("click", function() {
    var url = "www.everlearning.com.au/four-in-a-row";
    var instruction = "<p> Send the below message to your opponent to play, then when you're ready, press PLAY! </p>";
    var invite = "<p class='invite'>Join me in a game of Connect Four, at <strong>" + url + "</strong> with Room ID <strong>" + roomID + "</strong> </p>";
    var goBtn = "<button class='btn' id='play'>GO!</button>";

    setRoomID();
    checkIfRoomExists();
    player = playerOne;
    currentPlayer = player;
    createNewPlayer(player);
    // produce URL with roomID inside with one click copy -- AND -- alternative, separate URL and roomID
    $("#start-menu").empty();

    $("#start-menu").append(instruction, invite, goBtn);
})

// GO! button appears after playerOne has initiated game and shared link
$("#go").on("click", function() {
    $("#start-menu").empty();
    // create "roomID"Board.json file
    createBoardJSON();
    // create "roomID"Data.json file
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
    roomID = $("#roomID");
    player = playerTwo;
    playersTurn = false;
    createNewPlayer(player);
    wait();
})

/*************************
 *       Functions       *
 *************************/

// Should only be called once per game session
function setRoomID() { 
    roomID = Math.floor((Math.random()*10000) + 1);
}

function checkIfRoomExists() {
    roomFile = roomID + "player-one.json";
    $.getJSON(roomFile, function(data, status) {
        if (status !== "success") {
            return;
        } else {
            setRoomID();
            checkIfRoomExists();
        }
    });
}

function createNewPlayer(player) {
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
    var timer = setInterval(check, 1000);
    var roomFile = roomID + "player-two.json";
    function check() {
        $.get(roomFile, function(data, statu) {
            if (status === "success") {
                clearInterval(timer);
                return;
            }
        });
    }
}

