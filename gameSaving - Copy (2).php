<?php 

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
    }




    $roomID = $_POST['roomID'];
    mb_internal_encoding('UTF-8');


$firstGo = $_POST['first'];
if ($firstGo == true) {
    $newJSON = $roomID.".json";
    $handle = fopen($newJSON, "w") or die("Unable to open/create json file");
    $copy = copy("gameData.json", utf8_encode($newJSON));
    $reset = $_POST['reset'];
    $playerOneIP = getUserIPAddress();
    
    if ($reset == true) {
        $jsonContents = file_get_contents($newJSON);
        $tempArray = json_decode($pushReset);
        array_push($tempArray, $reset);
        $gameJSONObj = json_encode($tempArray);
        file_put_contents($newJSON, $gameJSONObj);
    }
    
    fclose($handle);
}

$newMove = $_POST['newMove'];
if ($newMove == true) { 
    $gameOver = $_POST['gameOver'];
    $currentPlayer = $_POST['currentPlayer'];
    $previousPlayer = $_POST['previousPlayer'];
    $id = $_POST['id'];
    $row = $_POST['row'];
    $winner = $_POST['winner'];
    $reset = $_POST['reset'];

    $openJSON = $roomID.".json";
    $handle = fopen($openJSON, "w") or die("Unable to open json game file");
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