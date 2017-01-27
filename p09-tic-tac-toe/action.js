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

  //functions - setup
  let getTurn;
  let getPlayers;
  //functions - teardown
  let revertPlayerHighlightDisable;
  let clearGame;
  let clearBoardTracking;
  let resetGame;
  //functions - display
  let highlightPlayerDisableOther;
  let revealFirstTurn;
  let displayTurn;
  let showGameOverScreen;
  let transitionStartToGame;
  let transitionOverToGame;
  //functions - moves
  let getPlayerMovesBreakdown;
  let playUserMove;
  let playComputerMove;
  let playGame;
  //functions - logic
  let checkGameStatus;
  let didAnyoneWin;
  let getComputerMove;


 /* ================================================== *///execution

  //MAIN EXECUTION
  openGame();
  function openGame() {
    $(".right-over").hide();
    $(".right-win-user").hide();
    $(".right-win-computer").hide();
    $(".game").html("");
    $(".left, .right").fadeTo(1000, 0.12);
    showStartScreen();
  }

  //RESETS GAME
  $(".btn-reset").on('click', function(){
    resetGame();
  });

/* ================================================== *///anonymous functions
  //TypeError: <function> is not a function

  //GET GAME BOARD HEIGHT
  function getGameHeight() {
    return $('.right').height();
  }

  //START SCREEN
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

    /* ================================================== *///setup

    //ASSIGN TURN
    getTurn = function getTurn() {
      // turn = (Math.floor(Math.random() * (2-1+1) + 1)===1)? 'x' : 'o';
      turn = 'x';
      return turn;
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

    /* ================================================== *///teardowns

    //START SCREEN - UNHIGHLIGHT & ENABLE PLAYER SELECTION
    revertPlayerHighlightDisable = function() {
      $("#start-"+user)[0].style.removeProperty("background-color");
      $("#start-"+computer).prop("disabled", false);
    }

    //GAME SCREEN - CLEARS BOARD & ASSIGNMENTS
    clearGame = function clearGame() {
      $(".game").html("");
      clearBoardTracking();
      xMoves = [];
      oMoves = [];
      xMovesBrokenDown = [[], []];
      oMovesBrokenDown = [[], []];
      winner = null;
    }

    clearBoardTracking = function() {
      for (var i=0; i<Object.keys(boardTracking).length; i++){
	      boardTracking[Object.keys(boardTracking)[i]] = "";
      }
    }

    //GAME ALL - RESET
    resetGame = function resetGame() {
      console.log("Clicked reset button");
    }


    /* ================================================== *///display

    //START SCREEN - HIGHLIGHT PLAYER SELECTION
    highlightPlayerDisableOther = function highlightPlayerDisableOther(/*selected, other*/) {
      $("#start-"+user)[0].style.backgroundColor = "#000";
      $("#start-"+computer).prop("disabled", true);
    }

    //START SCREEN - REVEAL FIRST TURN
    revealFirstTurn = function() {
      $("#first-turn").html(turn.toUpperCase());
    }

    //LEFT SCOREBOARD - UPDATE TURN MESSAGE
    displayTurn = function() {
      let currentTurn = (turn===user)? turnMessage.user : turnMessage.computer;
      $(".turn").html(currentTurn);
    }

    //GAME OVER SCREEN
    showGameOverScreen = function(selector) {
      console.log("[FUNC] - showGameOverScreen()");
      gameHeight = getGameHeight();
      $(".right").fadeTo("slow", 0, function(){
        $(".right").hide();
        $(selector).show().fadeTo(200, 0, function(){
          $(selector)[0].style.height = gameHeight + "px";
          $(selector).fadeTo(2000, 1); //screen with game message
          transitionOverToGame();
          playGame();
        });
      });
    }

    //TRANSITION - START SCREEN => GAME
    transitionStartToGame = function() {
      console.log("[FUNC] - transitionStartToGame()");
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

    //TRANSITION - OVER SCREEN => GAME
    transitionOverToGame = function() {
      console.log("[FUNC] - transitionOverToGame()");
      $(".right").delay(1500).fadeOut(500, function(){
        $(".parent").hide();
        clearGame();
        $(".right").fadeTo(1000, 1, function(){
          //display correct turn
          let startTurn = (turn===user)? turnMessage.user : turnMessage.computer;
          $(".turn").html(startTurn);
          $("#score-x").html(scoreX);
          $("#score-o").html(scoreO);
        });
      });
    }


    /* ================================================== *///moves

    //BREAK DOWN PLAYER MOVES
    getPlayerMovesBreakdown = function() {
      console.log("[FUNC] - getPlayerMovesBreakdown()");
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

    //PLAY USER MOVE
    playUserMove = function(move) {
      console.log("[FUNC] - playUserMove()");
      if (boardTracking[move].length===0) {
        let target = "#" + move;
        $(target).html(user.toUpperCase()); //updates board
        boardTracking[move] = user; //updates boardTracking
        turn = computer;
        displayTurn();
        checkGameStatus();
      }
    }

    //PLAY COMPUTER MOVE
    playComputerMove = function() {
      console.log("[FUNC] - playComputerMove()");
      let availableMoves = Object.keys(boardTracking).filter(function(val){
        return boardTracking[val].length === 0;
      });
      let nextMove = getComputerMove(availableMoves);
      let target = "#" + nextMove;
      $('<div></div>').appendTo(target).hide().append(computer.toUpperCase()).fadeIn(2000);
      boardTracking[nextMove] = computer;
      turn = user;
      displayTurn();
      checkGameStatus();
    }

    //PLAY NEXT MOVE (USER/COMPUTER)
    playGame = function() {
      console.log("[FUNC] - playGame()");
      if (turn === user) {
        // $(".game").prop("disabled", false);
        $(".game").on("click", function(){
          playUserMove(this.id);
          // $(".game").prop("disabled", true);
        });
      } else {
        playComputerMove();
      }
    }


    /* ================================================== *///logic

    //CHECK - GAME OVER?
    checkGameStatus = function() {
      console.log("[FUNC] - checkGameStatus()");
      let getUnused = Object.values(boardTracking).filter(function(val){
        return val.length === 0;
      });

      //check if either player has won
      winner = didAnyoneWin();
      if (winner != null) {
        if (winner === user) showGameOverScreen(".right-win-user");
        else if (winner === computer) showGameOverScreen(".right-win-computer");
      }
      else {
        if (getUnused.length > 0) playGame();
        else showGameOverScreen(".right-over");
      }
    }

    //CHECK - WINNING PLAYER?
    didAnyoneWin = function() {
      console.log("[FUNC] - didAnyoneWin()");
      getPlayerMovesBreakdown();
      //check if either row(0) or col(1) has 3 of same value (a|b|c)
      for (var i=0; i<xMovesBrokenDown.length; i++) {
        for (var ii=0; ii<roColRef.length; ii++) {
          let xRe = new RegExp(roColRef[ii],"g");
          //http://stackoverflow.com/a/881111
          let xCount = (xMovesBrokenDown[i].join("").match(xRe) || []).length;
          if (xCount === 3) {
            scoreX += 1;
            return "x";
          }
        }
      }
      for (var j=0; j<oMovesBrokenDown.length; j++) {
        for (var jj=0; jj<roColRef.length; jj++) {
          let oRe = new RegExp(roColRef[jj],"g");
          let oCount = (oMovesBrokenDown[j].join("").match(oRe) || []).length;
          if (oCount === 3) {
            scoreO += 1;
            return "o";
          }
        }
      }
      return winner;
    }

    //GET - COMPUTER'S NEXT MOVE
    getComputerMove = function(availableMoves) {
      let randomMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
      return randomMove;
    }

});
