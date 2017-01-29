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
  let rowColRef = ['a', 'b', 'c'];
  let reHolder;


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

  //for computer moves
  const mCenter = "bb";
  const mCorner = ["aa", "ac", "ca", "cc"];
  const mEdge = ["ab", "bc", "cb", "ba"];
  let movesTracking = [];
  let moveChoices = [];
  let movesOrder = ["aa", "ab", "ac", "bc", "cc", "cb", "ca", "ba"];
  let blockMove;

  //functions - setup
  let getTurn;
  let getPlayers;
  //functions - teardown
  let revertPlayerHighlightDisable;
  let clearGame;
  let clearBoardTracking;
  let clearScoresAndTurn;
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
  //functions - computer moves, user goes first
  let getSecondMove;
  let getFourthMove;

  //functions - computer moves, computer goes first
  let getFirstMove;
  let getThirdMove;

  //functions - block move
  let getBlockMove;

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
      $("#first-turn").html("*");
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

    clearScoresAndTurn = function() {
      scoreX = 0;
      scoreO = 0;
      turn = null;
    }

    //GAME ALL - RESET
    resetGame = function resetGame() {
      // console.log("Clicked reset button");
      clearGame();
      clearBoardTracking();
      clearScoresAndTurn();
      revertPlayerHighlightDisable();
      openGame();
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
      // console.log("[FUNC] - displayTurn()");
      let currentTurn = (turn===user)? turnMessage.user : turnMessage.computer;
      $(".turn").html(currentTurn);
    }

    //GAME OVER SCREEN
    showGameOverScreen = function(selector) {
      // console.log("[FUNC] - showGameOverScreen()");
      gameHeight = getGameHeight();
      $(".right").fadeTo("slow", 0, function(){
        $(".right").hide();
        $(selector).show().fadeTo(0, 0, function(){ //0,0 otherwise flashing in default height
          $(selector)[0].style.height = gameHeight + "px";
          $(selector).fadeTo(2000, 1); //screen with game message
          transitionOverToGame();
          // playGame();
        });
      });
    }

    //TRANSITION - START SCREEN => GAME
    transitionStartToGame = function() {
      // console.log("[FUNC] - transitionStartToGame()");
      $(".right-start").delay(1000).fadeOut(500, function(){
        $(".right").fadeTo(400, 1);
        $(".left").fadeTo(400, 1, function(){
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
      // console.log("[FUNC] - transitionOverToGame()");
      $(".right").delay(1500).fadeOut(500, function(){
        $(".parent").hide();
        clearGame();
        $(".right").fadeTo(1000, 1, function(){
          //display correct turn
          $("#score-x").html(scoreX);
          $("#score-o").html(scoreO);
          playGame(); //***JUST MOVED HERE, NO LONGER SCORING DUPS
        });
      });
    }


    /* ================================================== *///moves

    //BREAK DOWN PLAYER MOVES
    getPlayerMovesBreakdown = function() {
      // console.log("[FUNC] - getPlayerMovesBreakdown()");
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
      // console.log("[FUNC] - playUserMove()");
      if (boardTracking[move].length===0) {
        let target = "#" + move;
        $(target).html(user.toUpperCase()); //updates board
        boardTracking[move] = user; //updates boardTracking
        movesTracking.push(move);  //updates movesTracking
        turn = computer;
        checkGameStatus();
      }
    }

    //PLAY COMPUTER MOVE
    playComputerMove = function() {
      // console.log("[FUNC] - playComputerMove()");

      let availableMoves = Object.keys(boardTracking).filter(function(val){
        return boardTracking[val].length === 0;
      });
      let nextMove = getComputerMove(availableMoves);
      let target = "#" + nextMove;
      $('<div></div>').appendTo(target).hide().append(computer.toUpperCase()).fadeIn(2000);
      boardTracking[nextMove] = computer;
      movesTracking.push(nextMove);  //updates movesTracking
      turn = user;
      checkGameStatus();
    }

    //PLAY NEXT MOVE (USER/COMPUTER)
    playGame = function() {
      // console.log("[FUNC] - playGame()");
      if (turn === user) {
        // $(".game").prop("disabled", false);
        $(".game").on("click", function(){
          playUserMove(this.id);
          // $(".game").prop("disabled", true);
          turn = computer;
        });
      } else {
        playComputerMove();
      }
      displayTurn(); //come back to this one ** TODO **
    }


    /* ================================================== *///logic

    //CHECK - GAME OVER?
    checkGameStatus = function() {
      // console.log("[FUNC] - checkGameStatus()");
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
      // console.log("[FUNC] - didAnyoneWin()");
      getPlayerMovesBreakdown();
      //check if either row(0) or col(1) has 3 of same value (a|b|c)
      for (var i=0; i<xMovesBrokenDown.length; i++) {
        for (var ii=0; ii<rowColRef.length; ii++) {
          let xRe = new RegExp(rowColRef[ii],"g");
          //http://stackoverflow.com/a/881111
          let xCount = (xMovesBrokenDown[i].join("").match(xRe) || []).length;
          if (xCount === 3) {
            scoreX += 1;
            return "x";
          }
        }
      }
      for (var j=0; j<oMovesBrokenDown.length; j++) {
        for (var jj=0; jj<rowColRef.length; jj++) {
          let oRe = new RegExp(rowColRef[jj],"g");
          let oCount = (oMovesBrokenDown[j].join("").match(oRe) || []).length;
          if (oCount === 3) {
            scoreO += 1;
            return "o";
          }
        }
      }
      //http://stackoverflow.com/a/28798478
      function getUniqueChars(str) {
        return str.filter(function(item, i, arr){
          return arr.indexOf(item) === i;
        }).sort().join('');
      }

      //check if both row and col have each of (a,b,c)
      if (getUniqueChars(xMovesBrokenDown[0])==="abc"
          && getUniqueChars(xMovesBrokenDown[1])==="abc") {
        scoreX += 1;
        return "x";
      }
      if (getUniqueChars(oMovesBrokenDown[0])==="abc" &&
          getUniqueChars(oMovesBrokenDown[1])==="abc") {
        scoreO += 1;
        return "o";
      }
      return winner;
    }

    //GET - COMPUTER'S NEXT MOVE
    getComputerMove = function(availableMoves) {
      moveChoices = [];
      console.log("MOVE " + (movesTracking.length+1) + " => " + turn + " (" + $("#score-"+user+"-ref").text() + ")");
      if (movesTracking.length === 0) {
        return getFirstMove();
      }
      //SCENARIO A - user played first
      else if (movesTracking.length === 1) { return getSecondMove(); }
      else if (movesTracking.length === 3) { return getFourthMove(); }
      //SCENARIO B - computer played first
      else if (movesTracking.length === 2) { return getThirdMove(); }
      //SCENARIO C - games continues beyond 4 moves
      else { //default
        return availableMoves[Math.floor(Math.random()*availableMoves.length)];
      }
    }

    /* ================================================== *///functions - computer moves, user played first

    getSecondMove = function(){
      //opponent in corner, play move in center
      console.log("\t~ getting 2nd move");
      if (mCorner.indexOf(movesTracking[0]) > -1) {
        return mCenter;
      }
      //opponent in edge, play move in corner next to opponent
      else if (mEdge.indexOf(movesTracking[0]) > -1) {
        if (movesTracking[0]==="ab") {
          return ["aa","ac"][Math.round(Math.random())];
        } else if (movesTracking[0]==="bc") {
          return ["ac","cc"][Math.round(Math.random())];
        } else if (movesTracking[0]==="cb") {
          return ["ca","cc"][Math.round(Math.random())];
        } else {
          return ["ca","aa"][Math.round(Math.random())];
        }
      }
      //opponent in center, play move in corner
      else {
        return mCorner[Math.floor(Math.random() * mCorner.length)];
      }
    }

    getFourthMove = function(){
      console.log("\t~ getting 4th move");
      //opponent played corner then corner, play move in edge
      if (mCorner.indexOf(movesTracking[0]) !== -1 && mCorner.indexOf(movesTracking[2]) !== -1) {
        //opponent corner plays are diagonal, play any edge
        if ( (/aa|cc/g.test(movesTracking[0]) && /aa|cc/g.test(movesTracking[2])) ||
             (/ca|ac/g.test(movesTracking[0]) && /ca|ac/g.test(movesTracking[2])) ) {
          return mEdge[Math.floor(Math.random() * mEdge.length)];
        }
        //opponent corners are aa (movesOrder[0]) and ca (movesOrder[6])
        else if (/aa|ca/g.test(movesTracking[0]) && /aa|ca/g.test(movesTracking[2])) {
          return "ba";
        }
        //opponent corner plays 2 indexes apart, play in-between
        else {
          //sum of 2 corner moves indices divided by 2 for in-between index
          return movesOrder[(movesOrder.indexOf(movesTracking[0]) + movesOrder.indexOf(movesTracking[2])) / 2];
        }
      }
      //opponent played corner then edge, play move in corner blocking both
      else if (mCorner.indexOf(movesTracking[0]) !== -1 && mEdge.indexOf(movesTracking[2]) !== -1) {
        //aa-ba-ca line is edge case because movesOrder index 0-7-6
        if (/aa/g.test(movesTracking[0]) && /ba/g.test(movesTracking[2])) {
          return "ca";
        } else if (/ca/g.test(movesTracking[0]) && /ba/g.test(movesTracking[2])) {
          return "aa";
        }
        //otherwise corner+2 if edge >corner, corner-2 if edge<corner
        else if (movesOrder.indexOf(movesTracking[2]) > movesOrder.indexOf(movesTracking[0])) {
          return movesOrder[movesOrder.indexOf(movesTracking[0]) + 2];
        } else {
          return movesOrder[movesOrder.indexOf(movesTracking[0]) - 2];
        }
      }
      //opponent played edge then corner, play center unless required to block
      //opponent played center also played same
      else if ( ((mEdge.indexOf(movesTracking[0]) !== -1 && mCorner.indexOf(movesTracking[2]) !== -1)) ||
                (movesTracking[0] === mCenter)) {
          return getBlockMove(0, 2, mCenter);
      }
    }

    /* ================================================== *///functions - computer moves, computer played first

    getFirstMove = function(){
      console.log("\t~ getting 1st move");
      moveChoices = mCorner.concat(mCenter);
      return moveChoices[Math.floor(Math.random()*moveChoices.length)];
    }

    getThirdMove = function(){
      console.log("\t~ getting 3rd move");
      //computer played corner, opponent played edge, computer should play center
      if (mCorner.indexOf(movesTracking[0]) !== -1 && mEdge.indexOf(movesTracking[1]) !== -1) {
        return mCenter;
      }
      //computer played corner, opponent played corner, computer should play any free corner
      else if (mCorner.indexOf(movesTracking[0]) !== -1 && mCorner.indexOf(movesTracking[1]) !== -1 ) {
        moveChoices = mCorner.filter(function(val){
          return movesTracking.indexOf(val) === -1;
        });
        return moveChoices[Math.round(Math.random())];
      }
      //computer played corner, opponent played center, computer should play opposite corner
      else if (mCorner.indexOf(movesTracking[0]) !== -1 && movesTracking[1] === mCenter) {
        //matched whichever is not yet played, need to join back into string
        if (/aa|cc/g.test(movesTracking[0])) {
          reHolder = new RegExp("[^"+movesTracking[0]+"]", "g"); //works because same letters, aa or cc
          return "aacc".match(reHolder).join('');
        } else if (/ca|ac/g.test(movesTracking[0])) {
          // [^c][^a] because not same letters, else returning null
          reHolder = new RegExp("[^"+movesTracking[0].charAt(0)+"][^" + movesTracking[0].charAt(1) + "]", "g");
          return "caac".match(reHolder).join('');
        }
      }


      //computer played center, opponent played edge, computer should play in any corner


      //computer played center, opponent played corner, play default


    }

    /* ================================================== *///functions - block move

    getBlockMove = function(compare1, compare2, other){
      //block if row is shared
      if (movesTracking[compare1].charAt(0) === movesTracking[compare2].charAt(0)) {
        //gets col of opponent 1st & 3rd move
        let usedCol = movesTracking[compare1].charAt(1).concat(movesTracking[compare2].charAt(1));
        //matches if not in opponent 1st or 3rd move
        let reCol = new RegExp("[^"+usedCol+"]", "g");
        //concats shared row and col not in 1st or 3rd move
        blockMove = movesTracking[compare1].charAt(0).concat("abc".match(reCol));
        //if not in used moves plays move, else plays center
        if (movesTracking.indexOf(blockMove) === -1) {
          return blockMove;
        } else {
          return other;
        }
      }
      //block if col is shared
      else if (movesTracking[0].charAt(1) === movesTracking[compare2].charAt(1)) {
        //same logic except for row instead col
        let usedRow = movesTracking[compare1].charAt(0).concat(movesTracking[compare2].charAt(0));
        let reRow = new RegExp("[^"+usedRow+"]", "g");
        blockMove = "abc".match(reRow).join('').concat(movesTracking[compare1].charAt(1));
        if (movesTracking.indexOf(blockMove) === -1) {
          return blockMove;
        } else {
          return other;
        }
      }
      return other;
    }



    // end
});
