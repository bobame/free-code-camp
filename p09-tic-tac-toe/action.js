$(document).ready(function(){

 /* ================================================== *///variables

  let gameHeight;
  let user;
  let computer;
  let playerX;
  let playerO;
  let scoreX = 0;
  let scoreO = 0;
  let turn;
  let userTurnEnabled = false;
  let turnMessage = {
    "user": "Your turn, go!",
    "computer": "Computer's turn"
  }
  let boardTracking = {
    "aa": "",
    "ab": "",
    "ac": "",
    "ba": "",
    "bb": "",
    "bc": "",
    "ca": "",
    "cb": "",
    "cc": ""
  };

 /* ================================================== *///execution

  openGame();

  function openGame() {
    $(".game").html("");
    $(".left, .right").fadeTo(1000, 0.12);
    showStartScreen();
  }





/* ================================================== *///

  //assigns turn to either x or o using random
  function getTurn() {
    turn = (Math.floor(Math.random() * (2-1+1) + 1)===1)? 'x' : 'y';
    return turn;
  }

  //uses game height for start and result screens
  function getGameHeight() {
    return $('.right').height();
  }

  //assigns x and o players based on user selection in start screen
  function getPlayers(userSelection) {
    console.log("user selected " + userSelection);
    if (userSelection==="start-x") {
      user = "x"; computer = "o";
      playerX = "user"; playerO = "computer";
    } else {
      user = "o"; computer = "x";
      playerX = "computer"; playerO = "user";
    }
    $("#start-"+user)[0].style.backgroundColor = "#000";
    $("#start-"+computer).prop("disabled", true);
  }

  //reveals randomnly assigned first turn after user completes selection
  function revealFirstTurn() {
    $("#first-turn").html(turn.toUpperCase());
  }

  //transitions from start screen to game screen
  function transitionStartToGame() {
    $(".right-start").delay(1000).fadeOut(500, function(){
      $(".right").fadeTo(400, 1);
      $(".left").fadeTo(400, 1, function(){
        //display correct turn
        let startTurn = (turn===user)? turnMessage.user : turnMessage.computer;
        $(".turn").html(startTurn);
        //display correct player next to each score
        $("#score-x-ref").html(playerX);
        $("#score-o-ref").html(playerO);
      });
    });
  }

  //start screen asking user to select player
  function showStartScreen() {
    gameHeight = getGameHeight();
    $(".right").hide();
    $(".right-start")[0].style.height = gameHeight + "px";
    $("#start-x, #start-y").on('click', function(){
      getPlayers(this.id);
      revealFirstTurn(getTurn());
      transitionStartToGame();
    });
  }


  

/* ================================================== *///



});
