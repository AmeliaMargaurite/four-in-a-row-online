<?php

$roomID = $_POST['roomID'];

// when players press either START -- OR -- JOIN starts game
$player = $_POST['player'];

if (isset($player)) {
    createPlayerFile($player);
    echo $player;
}

// checks for request to create board at beginning of game or reset
$createBoard = $_POST['createBoard'];

if (isset($createBoard)) {
    $type = "Board";
    $file = "gameBoard.json";
    createJSON($roomID, $type, $file);
}

// checks for request to create room info at beginning of game or reset
$createRoom = $_POST['createRoomInfo'];

if (isset($createRoom)) {
    $type = "Data";
    $file = "gameData.json";
    createJSON($roomID, $type, $file);
}


/*******************************
 *         Functions           *
 *******************************/

function createPlayerFile() {
    getUserIPAddress();
    $playerIP = $ip;
    $player = $_POST['player'];
    $playerFile = $roomID.$player.".json";
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
        return $ip;
};

// creates JSON files for game using template JSON files
function createJSON($roomID, $type, $file) {
    $boardFile = $roomID.$type.".json";
    $handle = fopen($boardFile, "w");
    $copyFile = copy($file, $handle);
    fclose($handle);
}

?>