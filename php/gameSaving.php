<?php 
$roomID = $_POST['roomID'];
$address = "/online/active-games/";

/************************************
 *  Creating Players and Game Info  *
 ************************************/



// when players press either START -- OR -- JOIN starts game

if (isset($_POST['player'])) {
    $player = $_POST['player'];
    createPlayerFile($player);
    echo $player;
}

// checks for request to create board at beginning of game or reset

if (isset($_POST['createBoard'])) {
    $type = "Board";
    $copyFile = "../json/gameBoard.json"; // leave as $copyFile = "../json/gameBoard.json";
    createJSON($roomID, $type, $copyFile);
}

// checks for request to create room info at beginning of game or reset

if (isset($_POST['createRoomInfo'])) {
    $type = "Data";
    $copyFile = "../json/gameData.json"; // leave as $copyFile = "../json/gameData.json";
    createJSON($roomID, $type, $copyFile);
}


/*******************************
 *         Functions           *
 *******************************/

function createPlayerFile() {
    $ip = "";
    getUserIPAddress($ip);
    $playerIP = $ip;
    $player = $_POST['player'];
    $roomID = $_POST['roomID'];
    $address = "../active-games/";
    $playerFile = $address . $roomID . "-" . $player .".json";
    $handle = fopen($playerFile, "w") or die ("failed to create new player info file for Player One");
    $data = array(
        "roomID" => $roomID,
        "player" => $player,
        "playerIP" => $playerIP
    );
    $dataEncoded = json_encode($data);
    fwrite($handle, $dataEncoded);
    fclose($handle);
};

function getUserIPAddress() {
        if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
            // ip from share internet
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // ip passed from proxy
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        //return $ip;
};

// creates JSON files for game using template JSON files
function createJSON($roomID, $type, $copyFile) {
    $roomID = $_POST['roomID'];
    $address = "../active-games/";
    $file = $address . $roomID ."-". $type . ".json"; // save in the correct
    $handle = fopen($file, "w");
    $copy = copy($copyFile, $file);
    fclose($handle);
}

/*********************************
 *    Functions to play moves    *
 *********************************/

// if new move is posted, trigger saving data and board
if (isset($_POST['newMove'])) {
        saveDataFile();
        saveBoardFile();
}
   
function saveDataFile() {
    $roomID = $_POST['roomID'];
    $currentPlayer = $_POST['currentPlayer'];
    $previousPlayer = $_POST['previousPlayer'];
    $gameOver = $_POST['gameOver'];
    $id = $_POST['id'];
    $row = $_POST['row'];
    $winner = $_POST['winner'];
    $reset = $_POST['reset'];
    $gameData = array(
        "currentPlayer" => $currentPlayer,
        "previousPlayer" => $previousPlayer,
        "gameOver" => $gameOver,
        "id" => $id,
        "row" => $row,
        "winner" => $winner,
        "reset" => $reset, 
        "roomID" => $roomID
    );
    $address = "../active-games/";
    $file = $address . $roomID . "-Data.json";  
    saveFile($file, $gameData);  
}

function saveBoardFile() {
    $roomID = $_POST['roomID'];
    $board = $_POST['board'];
    $gameData = array(
        "board" => $board
    );
    $address = "../active-games/";
    $file = $address . $roomID."-Board.json";
    saveFile($file, $gameData);
}

function saveFile($file, $gameData) {
    $openJSON = $file;
    $handle = fopen($openJSON, "w") or die("Unable to open json game file");
    $gameJSONObj = json_encode($gameData);
    fwrite($handle, utf8_encode($gameJSONObj));
    fclose($handle);
}



if (isset($_POST['reset'])) {
    if ($reset == "yes") {
        $newJSON = $address . $roomID . "-Data.json";
        $handle = fopen($newJSON, "w") or die("Unable to open data json to reset");
        
        $gameData = array(
            "currentPlayer" => $currentPlayer,
            "previousPlayer" => $previousPlayer,
            "gameOver" => $gameOver,
            "id" => $id,
            "row" => $row,
            "winner" => $winner,
            "reset" => $reset
        );
            $gameJSONObj = json_encode($gameData);
        fwrite($handle, utf8_encode($gameJSONObj));
        fclose($handle);

        //$newJSON = $address . $roomID . "-Board.json";
        //$handle = fopen($newJSON, "w") or die ("unable to open board json to reset");


    }
}


?>