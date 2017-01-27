$(document).ready(function(){

 /* ================================================== *///variables & functions

  let gameHeight;
  let user;
  let computer;
  let playerX;
  let playerO;
  let scoreX = 0;
  let scoreO = 0;
  let turn;

  let winner;
  let xMoves = [];
  let oMoves = [];
  let xMovesBrokenDown = [[], []]; //0 for row, 1 for columns
  let oMovesBrokenDown = [[], []];
  let roColRef = ['a', 'b', 'c'];

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

  let playGame;
  let showGameOverScreen;
  let showUserWinScreen;
  let showComputerWinScreen;
  let checkGameStatus;
  let didAnyoneWin;
  let resetGame;
  let transitionStartToGame;
  let transitionOverToGame;
  let clearGame;

  let getTurn;
  let highlightPlayerDisableOther;
  let revertPlayerHighlightDisable;
  let getPlayers;
  let revealFirstTurn;
  let displayTurn;
  let getPlayerMovesBreakdown;
  let playUserMove;
  let getComputerMove;
  let playComputerMove;

 /* ================================================== *///execution

  //starts execution
  openGame();
  function openGame() {
    $(".right-over").hide();
    $(".right-win-user").hide();
    $(".right-win-computer").hide();
    $(".game").html("");
    $(".left, .right").fadeTo(1000, 0.12);
    showStartScreen();
  }

  $(".btn-reset").on('click', function(){
    resetGame();
  });

/* ================================================== *///anonymous functions
  //TypeError: <function> is not a function

  //uses game height for start and result screens
  function getGameHeight() {
    return $('.right').height();
  }

  //start screen asking user to select player
  function showStartScreen() {
    gameHeight = getGameHeight();
    //hiding game board
    $(".right").hide();
    //showing start screen slowly, and settnig height equal to game board height
    $(".right-start").show().fadeTo(0, 1, function(){
        $(".right-start")[0].style.height = gameHeight + "px";
    });
    $(".right-start")[0].style.height = gameHeight + "px";
    $("#start-x, #start-o").on('click', function(){
      getPlayers(this.id);
      revealFirstTurn(getTurn());
      transitionStartToGame();
      playGame();
    });
  }

  /* ================================================== *///named functions

  //assigns turn to either x or o using random
  getTurn = function getTurn() {
    // turn = (Math.floor(Math.random() * (2-1+1) + 1)===1)? 'x' : 'o';
    turn = 'x';
    return turn;
  }

  //highlights user player selection and disables other player
  highlightPlayerDisableOther = function highlightPlayerDisableOther(/*selected, other*/) {
    $("#start-"+user)[0].style.backgroundColor = "#000";
    $("#start-"+computer).prop("disabled", true);
  }

  //reverts highlightPlayerDisableOther()
  revertPlayerHighlightDisable = function() {
    $("#start-"+user)[0].style.removeProperty("background-color");
    $("#start-"+computer).prop("disabled", false);
  }

  //assigns x and o players based on user selection in start screen
  getPlayers = function(userSelection) {
    if (userSelection==="start-x") {
      user = "x"; computer = "o";
      playerX = "user"; playerO = "computer";
    } else {
      user = "o"; computer = "x";
      playerX = "computer"; playerO = "user";
    }
    highlightPlayerDisableOther();
  }

  //reveals randomnly assigned first turn after user completes selection
  revealFirstTurn = function() {
    $("#first-turn").html(turn.toUpperCase());
  }

  //display turn
  displayTurn = function() {
    let currentTurn = (turn===user)? turnMessage.user : turnMessage.computer;
    $(".turn").html(currentTurn);
  }

  //transitions from start screen to game screen
  transitionStartToGame = function() {
    $(".right-start").delay(1000).fadeOut(500, function(){
      $(".right").fadeTo(400, 1);
      $(".left").fadeTo(400, 1, function(){
        //display correct turn
        displayTurn();
        //display correct player next to each score
        $("#score-x-ref").html(playerX);
        $("#score-o-ref").html(playerO);
        //display correct score for each player (adding to accommodate reset flow)
        $('#score-x').html(scoreX);
        $('#score-o').html(scoreO);
      });
    });
  }

  clearGame = function clearGame() {
    $(".game").html("");
    xMoves = [];
    oMoves = [];
    xMovesBrokenDown = [[], []];
    oMovesBrokenDown = [[], []];
    winner = null;
  }

  //transitions from over screen to game screen
  transitionOverToGame = function() {
    $(".right-over").delay(2500).fadeOut(500, function(){
      $(".right").fadeTo(1500, 1, function(){
        //display correct turn
        let startTurn = (turn===user)? turnMessage.user : turnMessage.computer;
        clearGame();
        $(".turn").html(startTurn);
        $("#score-x").html(scoreX);
        $("#score-o").html(scoreO);
      });
    });
  }

  //check status to continue game
  checkGameStatus = function() {
    // console.log("[function] checkGameStatus");
    let getUnused = Object.values(boardTracking).filter(function(val){
      return val.length === 0;
    });

    //check if either player has won
    winner = didAnyoneWin();
    if (winner != null) {
      if (winner === user) showGameOverScreen(".right-win-user");
      else if (winner === computer) showGameOverScreen(".right-win-computer");
      transitionOverToGame();
    }
    else if (getUnused.length > 0) playGame();
    else showGameOverScreen(".right-over");
  }

  //get player moves
  getPlayerMovesBreakdown = function() {
    //clearing old values first
    xMoves = [];
    oMoves = [];
    xMovesBrokenDown = [[], []];
    oMovesBrokenDown = [[], []];
    //filter for player moves
    xMoves = Object.keys(boardTracking).filter(function(val){
      return boardTracking[val] === "x";
    });
    oMoves = Object.keys(boardTracking).filter(function(val){
      return boardTracking[val] === "o";
    });
    //break down row and col
    for (var i=0; i<xMoves.length; i++) {
      xMovesBrokenDown[0].push(xMoves[i].charAt(0));
      xMovesBrokenDown[1].push(xMoves[i].charAt(1));
    }
    for (var j=0; j<oMoves.length; j++) {
      oMovesBrokenDown[0].push(oMoves[j].charAt(0));
      oMovesBrokenDown[1].push(oMoves[j].charAt(1));
    }
  }

  //checking if either player has won
  didAnyoneWin = function didAnyoneWin() {
    getPlayerMovesBreakdown();
    //check if either row(0) or col(1) has 3 of same value (a|b|c)
    for (var i=0; i<xMovesBrokenDown.length; i++) {
      for (var ii=0; ii<roColRef.length; ii++) {
        let xRe = new RegExp(roColRef[ii],"g");
        //http://stackoverflow.com/a/881111
        let xCount = (xMovesBrokenDown[i].join("").match(xRe) || []).length;
        console.log("xMovesBrokenDown +++ " + xMovesBrokenDown[i] + " : " + roColRef[ii] + " : " + xCount);
        if (xCount === 3) {
          scoreX += 1;
          winner = "x";
        }
      }
    }
    for (var j=0; j<oMovesBrokenDown.length; j++) {
      for (var jj=0; jj<roColRef.length; jj++) {
        let oRe = new RegExp(roColRef[jj],"g");
        let oCount = (oMovesBrokenDown[j].join("").match(oRe) || []).length;
        console.log("oMovesBrokenDown +++ " + oMovesBrokenDown[j] + " : " + roColRef[jj] + " : " + oCount);
        if (oCount === 3) {
          scoreO += 1;
          return "y";
        }
      }
    }
    return winner;
  }


  //user move
  playUserMove = function(move) {
    console.log("function - playUserMove (" + new Date() + ")");
    if (boardTracking[move].length===0) {
      let target = "#" + move;
      $(target).html(user.toUpperCase()); //updates board
      boardTracking[move] = user; //updates boardTracking
      turn = computer;
      displayTurn();
      checkGameStatus();
    }
  }

  //get computer's next move
  getComputerMove = function(availableMoves) {
    let randomMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
    console.log("random move " + randomMove);
    return randomMove;
  }

  //computer move
  playComputerMove = function() {
    let availableMoves = Object.keys(boardTracking).filter(function(val){
      return boardTracking[val].length === 0;
    });
    let nextMove = getComputerMove(availableMoves);
    let target = "#" + nextMove;
    // $(target).append(computer.toUpperCase());
    $('<div></div>').appendTo(target).hide().append(computer.toUpperCase()).fadeIn(2000);
    boardTracking[nextMove] = computer;
    turn = user;
    displayTurn();
    checkGameStatus();
  }

  //game screen
  playGame = function() {
    // console.log("[function] playGame()");
    if (turn === user) {
      $(".game").on("click", function(){
        //need this layer else user allowed continued moves
        if (turn === user) playUserMove(this.id);
      });
    } else {
      playComputerMove();
    }
  }



  //game over screen selector reference
  //no win - ".right-over"
  //user win - ".right-win-user"
  //computer win - ".right-win-computer"
  showGameOverScreen = function showGameOverScreen(selector) {
    gameHeight = getGameHeight();
    $(".right").fadeTo("slow", 0, function(){
      $(".right").hide();
      $(selector).show().fadeTo(0, 0, function(){
        $(selector)[0].style.height = gameHeight + "px";
        $(selector).fadeTo(2000, 1);
      });
    });
  }

  //resets game to starting defaults
  resetGame = function resetGame() {
    console.log("Clicked reset button");
  }


/* ================================================== *///



});
