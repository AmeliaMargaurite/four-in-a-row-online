<!DOCTYPE html> 
<?php
// Start Session
session_start();
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect Four</title>
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap" rel="stylesheet">
</head>
<body onload="setBoard()">

  <div class="page--container">
  <h1>Welcome <span id="player"><?php
   $_SESSION["player"] = "player-two";
   $player = $_SESSION["player"];
   echo $player;
   ?></span></h1>
      <div class="game">

        <div class="players">
          <div id="player--holder__p1" class="active">
            <div class="disc player-one">
            </div>
            <h3>Player One</h3>
          </div>
          <div>  
            
            <button class="btn" id="reset-btn">Reset</button>
            <button class="btn" id="player-check">Check Player</button>
        </div>
          <div id="player--holder__p2">
            <div class="disc player-two"></div>
            <h3>Player Two</h3>
          </div>
      </div>
      
      <div class="board">
        <div id="start-menu">
          <p>If you have a room ID enter below and click "Join Game". If not create a room ID (numbers only) and click Start New Game. Give this room ID to your opponent so they can join your game</p>
          <button class="btn" id="start">Start New Game</button>
          <input type="number" id="roomID">
          <input type="text" id="playerName">
          <button class="btn" id="join">Join Game</button>
          
          
        </div>
        <!--<svg width="59" height="112" viewBox="0 0 59 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.3804 0H8.97826V62H0L28.538 112L59 62H49.3804V0Z" fill="#D6C424"/>
        </svg>-->
        <div class="banner--wrapper">
          
          <div class="banner win" id="win">
            <h3>Congratulations,</h3>
            <h3>you won!</h3>
          </div>
          
          <div class="banner lose" id="lose">
            <h3>:(</h3>
            <h3>better luck next time</h3>
          </div>
          
          <div class="banner player-one--welcome" id="p1-welcome">
            <h3>Welcome,</h3>
            <h3>Player One</h3>
          </div>
          
          <div class="banner player-two--welcome" id="p2-welcome">
            <h3>Welcome,</h3>
            <h3>Player Two</h3>
          </div>
        </div>
        <div class="arrows">
          <div class="arrow--holder" column="0"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="1"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="2"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="3"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="4"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="5"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
          <div class="arrow--holder" column="6"><svg class="arrow" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0435 0H1.82609V9.96429H0L5.80435 18L12 9.96429H10.0435V0Z"/>
            </svg>
            </div>
      </div>
      <svg id="game--board" viewBox="0 0 322 290" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 0H324V282H4V0ZM14.8295 249.41C14.8295 238.796 23.4342 230.191 34.0486 230.191H34.7831C45.3976 230.191 54.0023 238.796 54.0023 249.41C54.0023 260.025 45.3976 268.629 34.7831 268.629H34.0486C23.4342 268.629 14.8295 260.025 14.8295 249.41ZM77.1387 230.191C66.5242 230.191 57.9195 238.796 57.9195 249.41C57.9195 260.025 66.5242 268.629 77.1387 268.629H77.8732C88.4876 268.629 97.0923 260.025 97.0923 249.41C97.0923 238.796 88.4876 230.191 77.8732 230.191H77.1387ZM101.009 249.41C101.009 238.796 109.614 230.191 120.229 230.191H120.963C131.578 230.191 140.182 238.796 140.182 249.41C140.182 260.025 131.578 268.629 120.963 268.629H120.229C109.614 268.629 101.009 260.025 101.009 249.41ZM163.319 230.191C152.704 230.191 144.1 238.796 144.1 249.41C144.1 260.025 152.704 268.629 163.319 268.629H164.053C174.668 268.629 183.272 260.025 183.272 249.41C183.272 238.796 174.668 230.191 164.053 230.191H163.319ZM187.189 249.41C187.189 238.796 195.794 230.191 206.409 230.191H207.143C217.757 230.191 226.362 238.796 226.362 249.41C226.362 260.025 217.757 268.629 207.143 268.629H206.409C195.794 268.629 187.189 260.025 187.189 249.41ZM249.499 230.191C238.884 230.191 230.28 238.796 230.28 249.41C230.28 260.025 238.884 268.629 249.499 268.629H250.233C260.848 268.629 269.452 260.025 269.452 249.41C269.452 238.796 260.848 230.191 250.233 230.191H249.499ZM273.37 249.41C273.37 238.796 281.974 230.191 292.589 230.191H293.323C303.938 230.191 312.542 238.796 312.542 249.41C312.542 260.025 303.938 268.629 293.323 268.629H292.589C281.974 268.629 273.37 260.025 273.37 249.41ZM34.0486 187.753C23.4342 187.753 14.8295 196.358 14.8295 206.972C14.8295 217.586 23.4342 226.191 34.0486 226.191H34.7831C45.3976 226.191 54.0023 217.586 54.0023 206.972C54.0023 196.358 45.3976 187.753 34.7831 187.753H34.0486ZM57.9195 206.972C57.9195 196.358 66.5242 187.753 77.1387 187.753H77.8732C88.4876 187.753 97.0923 196.358 97.0923 206.972C97.0923 217.586 88.4876 226.191 77.8732 226.191H77.1387C66.5242 226.191 57.9195 217.586 57.9195 206.972ZM120.229 187.753C109.614 187.753 101.009 196.358 101.009 206.972C101.009 217.586 109.614 226.191 120.229 226.191H120.963C131.578 226.191 140.182 217.586 140.182 206.972C140.182 196.358 131.578 187.753 120.963 187.753H120.229ZM144.1 206.972C144.1 196.358 152.704 187.753 163.319 187.753H164.053C174.668 187.753 183.272 196.358 183.272 206.972C183.272 217.586 174.668 226.191 164.053 226.191H163.319C152.704 226.191 144.1 217.586 144.1 206.972ZM206.409 187.753C195.794 187.753 187.189 196.358 187.189 206.972C187.189 217.586 195.794 226.191 206.409 226.191H207.143C217.757 226.191 226.362 217.586 226.362 206.972C226.362 196.358 217.757 187.753 207.143 187.753H206.409ZM230.28 206.972C230.28 196.358 238.884 187.753 249.499 187.753H250.233C260.848 187.753 269.452 196.358 269.452 206.972C269.452 217.586 260.848 226.191 250.233 226.191H249.499C238.884 226.191 230.28 217.586 230.28 206.972ZM292.589 187.753C281.974 187.753 273.37 196.358 273.37 206.972C273.37 217.586 281.974 226.191 292.589 226.191H293.323C303.938 226.191 312.542 217.586 312.542 206.972C312.542 196.358 303.938 187.753 293.323 187.753H292.589ZM14.8295 164.534C14.8295 153.919 23.4342 145.315 34.0486 145.315H34.7831C45.3976 145.315 54.0023 153.919 54.0023 164.534C54.0023 175.148 45.3976 183.753 34.7831 183.753H34.0486C23.4342 183.753 14.8295 175.148 14.8295 164.534ZM77.1387 145.315C66.5242 145.315 57.9195 153.919 57.9195 164.534C57.9195 175.148 66.5242 183.753 77.1387 183.753H77.8732C88.4876 183.753 97.0923 175.148 97.0923 164.534C97.0923 153.919 88.4876 145.315 77.8732 145.315H77.1387ZM101.009 164.534C101.009 153.919 109.614 145.315 120.229 145.315H120.963C131.578 145.315 140.182 153.919 140.182 164.534C140.182 175.148 131.578 183.753 120.963 183.753H120.229C109.614 183.753 101.009 175.148 101.009 164.534ZM163.319 145.315C152.704 145.315 144.1 153.919 144.1 164.534C144.1 175.148 152.704 183.753 163.319 183.753H164.053C174.668 183.753 183.272 175.148 183.272 164.534C183.272 153.919 174.668 145.315 164.053 145.315H163.319ZM187.189 164.534C187.189 153.919 195.794 145.315 206.409 145.315H207.143C217.757 145.315 226.362 153.919 226.362 164.534C226.362 175.148 217.757 183.753 207.143 183.753H206.409C195.794 183.753 187.189 175.148 187.189 164.534ZM249.499 145.315C238.884 145.315 230.28 153.919 230.28 164.534C230.28 175.148 238.884 183.753 249.499 183.753H250.233C260.848 183.753 269.452 175.148 269.452 164.534C269.452 153.919 260.848 145.315 250.233 145.315H249.499ZM273.37 164.534C273.37 153.919 281.974 145.315 292.589 145.315H293.323C303.938 145.315 312.542 153.919 312.542 164.534C312.542 175.148 303.938 183.753 293.323 183.753H292.589C281.974 183.753 273.37 175.148 273.37 164.534ZM34.0486 102.876C23.4342 102.876 14.8295 111.481 14.8295 122.096C14.8295 132.71 23.4342 141.315 34.0486 141.315H34.7831C45.3976 141.315 54.0023 132.71 54.0023 122.096C54.0023 111.481 45.3976 102.876 34.7831 102.876H34.0486ZM57.9195 122.096C57.9195 111.481 66.5242 102.876 77.1387 102.876H77.8732C88.4876 102.876 97.0923 111.481 97.0923 122.096C97.0923 132.71 88.4876 141.315 77.8732 141.315H77.1387C66.5242 141.315 57.9195 132.71 57.9195 122.096ZM120.229 102.876C109.614 102.876 101.009 111.481 101.009 122.096C101.009 132.71 109.614 141.315 120.229 141.315H120.963C131.578 141.315 140.182 132.71 140.182 122.096C140.182 111.481 131.578 102.876 120.963 102.876H120.229ZM144.1 122.096C144.1 111.481 152.704 102.876 163.319 102.876H164.053C174.668 102.876 183.272 111.481 183.272 122.096C183.272 132.71 174.668 141.315 164.053 141.315H163.319C152.704 141.315 144.1 132.71 144.1 122.096ZM206.409 102.876C195.794 102.876 187.189 111.481 187.189 122.096C187.189 132.71 195.794 141.315 206.409 141.315H207.143C217.757 141.315 226.362 132.71 226.362 122.096C226.362 111.481 217.757 102.876 207.143 102.876H206.409ZM230.28 122.096C230.28 111.481 238.884 102.876 249.499 102.876H250.233C260.848 102.876 269.452 111.481 269.452 122.096C269.452 132.71 260.848 141.315 250.233 141.315H249.499C238.884 141.315 230.28 132.71 230.28 122.096ZM292.589 102.876C281.974 102.876 273.37 111.481 273.37 122.096C273.37 132.71 281.974 141.315 292.589 141.315H293.323C303.938 141.315 312.542 132.71 312.542 122.096C312.542 111.481 303.938 102.876 293.323 102.876H292.589ZM15.2102 79.6574C15.2102 69.0429 23.8149 60.4382 34.4293 60.4382H35.1638C45.7782 60.4382 54.3829 69.0429 54.3829 79.6574C54.3829 90.2718 45.7782 98.8765 35.1638 98.8765H34.4293C23.8149 98.8765 15.2102 90.2718 15.2102 79.6574ZM77.5193 60.4382C66.9049 60.4382 58.3002 69.0429 58.3002 79.6574C58.3002 90.2718 66.9049 98.8765 77.5193 98.8765H78.2538C88.8683 98.8765 97.4729 90.2718 97.4729 79.6574C97.4729 69.0429 88.8683 60.4382 78.2538 60.4382H77.5193ZM101.39 79.6574C101.39 69.0429 109.995 60.4382 120.609 60.4382H121.344C131.958 60.4382 140.563 69.0429 140.563 79.6574C140.563 90.2718 131.958 98.8765 121.344 98.8765H120.609C109.995 98.8765 101.39 90.2718 101.39 79.6574ZM163.699 60.4382C153.085 60.4382 144.48 69.0429 144.48 79.6574C144.48 90.2718 153.085 98.8765 163.699 98.8765H164.434C175.048 98.8765 183.653 90.2718 183.653 79.6574C183.653 69.0429 175.048 60.4382 164.434 60.4382H163.699ZM187.57 79.6574C187.57 69.0429 196.175 60.4382 206.789 60.4382H207.524C218.138 60.4382 226.743 69.0429 226.743 79.6574C226.743 90.2718 218.138 98.8765 207.524 98.8765H206.789C196.175 98.8765 187.57 90.2718 187.57 79.6574ZM249.879 60.4382C239.265 60.4382 230.66 69.0429 230.66 79.6574C230.66 90.2718 239.265 98.8765 249.879 98.8765H250.614C261.228 98.8765 269.833 90.2718 269.833 79.6574C269.833 69.0429 261.228 60.4382 250.614 60.4382H249.879ZM273.75 79.6574C273.75 69.0429 282.355 60.4382 292.969 60.4382H293.704C304.318 60.4382 312.923 69.0429 312.923 79.6574C312.923 90.2718 304.318 98.8765 293.704 98.8765H292.969C282.355 98.8765 273.75 90.2718 273.75 79.6574ZM34.4293 18C23.8149 18 15.2102 26.6047 15.2102 37.2191C15.2102 47.8335 23.8149 56.4382 34.4293 56.4382H35.1638C45.7782 56.4382 54.3829 47.8335 54.3829 37.2191C54.3829 26.6047 45.7782 18 35.1638 18H34.4293ZM58.3002 37.2191C58.3002 26.6047 66.9049 18 77.5193 18H78.2538C88.8683 18 97.4729 26.6047 97.4729 37.2191C97.4729 47.8335 88.8683 56.4382 78.2538 56.4382H77.5193C66.9049 56.4382 58.3002 47.8335 58.3002 37.2191ZM120.609 18C109.995 18 101.39 26.6047 101.39 37.2191C101.39 47.8335 109.995 56.4382 120.609 56.4382H121.344C131.958 56.4382 140.563 47.8335 140.563 37.2191C140.563 26.6047 131.958 18 121.344 18H120.609ZM144.48 37.2191C144.48 26.6047 153.085 18 163.699 18H164.434C175.048 18 183.653 26.6047 183.653 37.2191C183.653 47.8335 175.048 56.4382 164.434 56.4382H163.699C153.085 56.4382 144.48 47.8335 144.48 37.2191ZM206.789 18C196.175 18 187.57 26.6047 187.57 37.2191C187.57 47.8335 196.175 56.4382 206.789 56.4382H207.524C218.138 56.4382 226.743 47.8335 226.743 37.2191C226.743 26.6047 218.138 18 207.524 18H206.789ZM230.66 37.2191C230.66 26.6047 239.265 18 249.879 18H250.614C261.228 18 269.833 26.6047 269.833 37.2191C269.833 47.8335 261.228 56.4382 250.614 56.4382H249.879C239.265 56.4382 230.66 47.8335 230.66 37.2191ZM292.969 18C282.355 18 273.75 26.6047 273.75 37.2191C273.75 47.8335 282.355 56.4382 292.969 56.4382H293.704C304.318 56.4382 312.923 47.8335 312.923 37.2191C312.923 26.6047 304.318 18 293.704 18H292.969Z"/>
          
          
          </svg>
          
        
        
        <div id="61" class="cell"></div>
        <div id="62" class="cell"></div>
        <div id="63" class="cell"></div>
        <div id="64" class="cell"></div>
        <div id="65" class="cell"></div>
        <div id="66" class="cell"></div>
        <div id="67" class="cell"></div>
        <div id="51" class="cell"></div>
        <div id="52" class="cell"></div>
        <div id="53" class="cell"></div>
        <div id="54" class="cell"></div>
        <div id="55" class="cell"></div>
        <div id="56" class="cell"></div>
        <div id="57" class="cell"></div>
        <div id="41" class="cell"></div>
        <div id="42" class="cell"></div>
        <div id="43" class="cell"></div>
        <div id="44" class="cell"></div>
        <div id="45" class="cell"></div>
        <div id="46" class="cell"></div>
        <div id="47" class="cell"></div>
        <div id="31" class="cell"></div>
        <div id="32" class="cell"></div>
        <div id="33" class="cell"></div>
        <div id="34" class="cell"></div>
        <div id="35" class="cell"></div>
        <div id="36" class="cell"></div>
        <div id="37" class="cell"></div>
        <div id="21" class="cell"></div>
        <div id="22" class="cell"></div>
        <div id="23" class="cell"></div>
        <div id="24" class="cell"></div>
        <div id="25" class="cell"></div>
        <div id="26" class="cell"></div>
        <div id="27" class="cell"></div>
        <div id="11" class="cell"></div>
        <div id="12" class="cell"></div>
        <div id="13" class="cell"></div>
        <div id="14" class="cell"></div>
        <div id="15" class="cell"></div>
        <div id="16" class="cell"></div>
        <div id="17" class="cell"></div>
    
      </div>
      <!--<div class="btns">
        <button class="btn start" onclick="start()">Start</button>
        <button class="btn start" onclick="nextTurn()">Next Turn</button>
        <button class="btn start" onclick="resetBoard()">Reset Board</button>
    </div>-->
    
    </div>
  </div>

    <script type="text/javascript" src="game.js"></script>
    <script type="text/javascript" src="gamejQuery.js"></script>
    
</body>
</html>