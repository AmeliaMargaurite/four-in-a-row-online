<?php 
$roomID = $_POST['roomID'];

// if new move is posted, trigger saving data and board
$newMove = $_POST['newMove'];

if ($newMove == true) { 
    saveDataFile();
    saveBoardFile();
};
   
function saveDataFile() {
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
        "reset" => $reset
    );
    $file = $roomID."Data.json";  
    saveFile($file, $gameData);  
}

function saveBoardFile() {
    $board = $_POST['board'];
    $gameData = $_POST['board'];
    $file = $roomID."Board.json";
    saveFile($file, $gameData);
}

function saveFile($file, $gameData) {
    $openJSON = $file;
    $handle = fopen($openJSON, "w") or die("Unable to open json game file");
    $gameJSONObj = json_encode($gameData);
    fwrite($handle, utf8_encode($gameJSONObj));
    fclose($handle);
}




if ($reset == true) {
        $newJSON = $roomID.".json";
        $handle = fopen($newJSON, "w") or die("Unable to open/create json file");
        
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
    }
?>