/**
DEBUG mode because location.reload() rejected by codepen non-debug mode
*/

$(document).ready(function(){

  //variables to capture states
  var toggleIsOn = false;
  var gameIsOn = false;
  var strictIsOn = false;
  var turnIsUser = false;
  var readyForNextMove = true;
  var counter = 1;
  var gamePlays = [];
  var userPlays = [];
  var colorsArr = ["green", "red", "blue", "yellow"];

  //variables to hold constants
  var playsMax = 20;
  var audioRef = {
    "green": "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "red": "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "blue": "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "yellow": "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };
  var colorsRef = {
    "green": ["#42f44e", "rgb(2, 166, 13)"], //[original, active]
    "red": ["#ea533f", "rgb(181, 0, 51)"],
    "blue": ["#3f45ea", "rgb(12, 17, 138)"],
    "yellow": ["#f6f927", "rgb(201, 198, 0)"]
  }
  var messageRef = {
    "win": "You Win!",
    "lose": "You lose, try again.",
    "chance": "Try again.",
    "clear": ""
  }

  //naming functions to utilize deferreds/promises else getting exception below
  //Uncaught TypeError: Cannot read property 'done' of undefined
  var getGamePlays;
  var getUserPlays;
  var updateColor;
  var playIsMatching;
  var flashMessage;

  /* ==================================================
     CLICKS
  ================================================== */

  //click on off-on switch toggle
  $("#switch-field").on("click", function(){
    console.log("INFO:\tclicked on toggle switch, id:" + this.id);
    if ( $("#switch-toggle").hasClass("toggle-off") &&
        !$("#switch-toggle").hasClass("toggle-on"))
    {
      toggleOn();
    }
    else if ( $("#switch-toggle").hasClass("toggle-on") &&
               !$("#switch-toggle").hasClass("toggle-off"))
    {
      //refer message in toggleOff() function definition
      // toggleOff();
      console.log("TASK:\ttoggle off behavior unexpected, forcing reload as workaround for now");
      location.reload();
    } else {
      console.log("ERROR:\tExpecting .toggle-off or .toggle-on in #switch-toggle element");
    }
  });

  //click on start button
  $("#start-button").on("click", function(){
    console.log("INFO:\tclicked on start button, id:" + this.id);
    if (toggleIsOn && !gameIsOn) {
      startGame();
      gameIsOn = true;
    }
  });

  //click on strict button
  $("#strict-button").on("click", function(){
    console.log("INFO:\tclicked on strict button, id:" + this.id);
    if (toggleIsOn && !gameIsOn) {
      if (  $("#strict-light-status").hasClass("strict-light-off") &&
           !$("#strict-light-status").hasClass("strict-light-on") )
      {
        turnStrictOn();
      } else if (  $("#strict-light-status").hasClass("strict-light-on") &&
                  !$("#strict-light-status").hasClass("strict-light-off") )
      {
        turnStrictOff();
      } else {
        console.log("ERROR:\tExpecting .strict-light-off or .strict-light-on");
      }
    }
  });

  //click on color buttons
  $(".btnColor").on("click", function(){
    console.log("INFO:\tclicked on color button, id:" + this.id);
    if (toggleIsOn && gameIsOn && turnIsUser && (userPlays.length < gamePlays.length)) {
      userPlays.push(this.id);
      new Audio(audioRef[this.id]).play();
    }
  });


  /* ==================================================
     HELPERS - TOGGLE ON/OFF SWITCH & STRICT
  ================================================== */

  function toggleOn() {
    console.log("INFO:\tcalled function toggleOn()");
    $("#switch-toggle").removeClass("toggle-off");
    $("#switch-toggle").addClass("toggle-on");
    toggleIsOn = true;
    $(".pointer-when-on").css("cursor", "pointer");
    $("#count-field").html("--");
    gameIsOn = false; //needed to restart after toggling off
  }

  //TODO: stop or reject pending deferreds/promises?
  //currently game continuing once user toggles back on
  //disabling feature for now as future enhancement
  function toggleOff() {
    console.log("INFO:\tcalled function toggleOff()");
    $("#switch-toggle").removeClass("toggle-on");
    $("#switch-toggle").addClass("toggle-off");
    toggleIsOn = false;
    $(".pointer-when-on").css("cursor", "default");
    $("#count-field").html("");
    //clears following 3 in case toggled off before finishing game
    counter = 1;
    gamePlays = [];
    userPlays = [];
  }

  function turnStrictOn() {
    $("#strict-light-status").removeClass("strict-light-off");
    $("#strict-light-status").addClass("strict-light-on");
    strictIsOn = true;
  }

  function turnStrictOff() {
    $("#strict-light-status").removeClass("strict-light-on");
    $("#strict-light-status").addClass("strict-light-off");
    strictIsOn = false;
  }


  /* ==================================================
     HELPERS - START & STRICT BUTTONS
  ================================================== */

  function startGame() {
    console.log("INFO:\tcalled function startGame()");
    //setup
    $("#count-field").html(counter);

    //Deferreds/Promises to handle async tasks, http://stackoverflow.com/a/24660885
    getGamePlays().done(function(){
      console.log("INFO:\tcompleted function getGamePlays() from startGame()");
      getUserPlays().done(function(){
        console.log("INFO:\tcompleted function getUserPlays() from startGame()");
        turnIsUser = true;
      });
    });
  }


  /* ==================================================
     HELPERS - GAME PLAYS
  ================================================== */

  getGamePlays = function() {
    console.log("INFO:\tcalled function getGamePlays()");
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    //first action
    setTimeout(function(){
      getMoves();
      deferred1.resolve();
    }, 750);
    //second action
    setTimeout(function(){
      playMoves();
      deferred2.resolve();
    }, 1000);
    return $.when(deferred1, deferred2).done().promise();
  }

  function getMoves() {
    console.log("INFO:\tcalled function getMoves()");
    //if moves under 20 and readyForNextMove then add next random move
    if (gamePlays.length < playsMax && readyForNextMove) { //STAGE - added readyForNextMove
      var newMove = colorsArr[Math.floor(Math.random() * colorsArr.length)];
      console.log("INFO:\tinside getMoves(), adding new move, " + newMove);
      gamePlays.push(newMove);
    }
  }

  function playMoves() {
    console.log("INFO:\tcalled function playMoves()");
    console.log("INFO:\tinside playMoves(), looping through gamesPlays, " + gamePlays);
    //IIFE, http://stackoverflow.com/a/8228308
    (function(){
      for (var i = 0; i < gamePlays.length; i++) {
      //delay else subsequent moves playing over each other ** (this was killing me) **
      //http://stackoverflow.com/a/30865841 ****
      (function (i) {
        setTimeout(function () {
          console.log("INFO:\tinside playMoves(), gamePlays[i] => " + gamePlays[i]);
          // new Audio(audioRef[gamePlays[i]]).play();
          updateColor(gamePlays[i], colorsRef[gamePlays[i]][1], colorsRef[gamePlays[i]][0]);
        }, 1000 * i);
      })(i);
    };
    })();
  }

  updateColor = function(target, color1, color2) {
    console.log("INFO:\tcalled function updateColor()");
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    //highlight with darker color
    setTimeout(function(){
      $("#"+target).css("background-color", color1);
      deferred1.resolve();
      new Audio(audioRef[target]).play();
    }, 200);
    //after half second set back to original color
    setTimeout(function(){
      $("#"+target).css("background-color", color2);
      deferred1.resolve();
    }, 500);
    return $.when(deferred1, deferred2).done().promise();
  }


  /* ==================================================
     HELPERS - USER PLAYS
  ================================================== */

  getUserPlays = function() {
    console.log("INFO:\tcalled function getUserPlays()");
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    var waitTime = gamePlays.length * 1000 + 2500;
    turnIsUser = true;
    //waiting for user moves
    console.log("INFO:\tinside getUserPlays(), waiting " + waitTime + " milliseconds for user turn");
    setTimeout(function(){
      turnIsUser = false;
      deferred1.resolve();
    }, waitTime);

    //checking if user moves matching game moves
    console.log("INFO:\tinside getUserPlays(), checking if user plays matches game plays");
    setTimeout(function(){
      console.log("INFO:\tinside getUserPlays(), comparing gamePlays[" + gamePlays + "] vs [" + userPlays + "]");
      console.log("INFO:\tinside getUserPlays(), gamePlays matching userPlays => " + playIsMatching());

      if (playIsMatching() && counter < playsMax) {
        readyForNextMove = true;
        continueGame();
      } else if (playIsMatching() && !(counter < playsMax)) {
        userWin();
      } else if (!playIsMatching() && !strictIsOn) {
        replayGame();
      } else if (!playIsMatching() && strictIsOn) {
        restartGame();
      } else {
        console.log("ERROR:\tshould not reach here");
      }

      deferred2.resolve();
    }, waitTime);
    return $.when(deferred1, deferred2).done().promise();
  }


  /* ==================================================
     HELPERS - GAME ANALYSIS
  ================================================== */

  playIsMatching = function() {
    console.log("INFO:\tcalled function playIsMatching()");
    //simple array comparing without for looping, http://stackoverflow.com/a/6230314
    var isMatching = gamePlays.sort().join(",") === userPlays.sort().join(",");
    console.log("isMatching?: " + isMatching);
    return isMatching;
  }


  /* ==================================================
     HELPERS - GAME (NEXT) FLOW
  ================================================== */

  function continueGame() {
    console.log("INFO:\tcalled function continueGame()");
    //setup for continuing game
    userPlays = [];
    counter += 1;
    $("#count-field").html(counter);

    //same as start game, just with different setup
    getGamePlays().done(function(){
      console.log("INFO:\tcompleted function getGamePlays() from continueGame()");
      getUserPlays().done(function(){
        console.log("INFO:\tcompleted function getUserPlays() from continueGame()");
      });
    });
  }

  function replayGame() {
    console.log("INFO:\tcalled function replayGame()");
    var waitTime = gamePlays.length * 1000 + 2500;
    //nested setTimeouts, http://stackoverflow.com/a/6921279
    setTimeout(function() {
      //setup to replay games moves and take user retry moves
      userPlays = [];
      userChance();
      playMoves();
      turnIsUser = true;
      setTimeout(function() {
        //if matching then continuing game else ending game
        if (playIsMatching()) {
          console.log("\t\tuser got it right in retry, continuing game...");
          continueGame();
        } else {
          console.log("\t\tuser got it wrong in retry, ending game...");
          restartGame();
        }
      }, waitTime);
    }, waitTime);

  }

  function restartGame() {
    console.log("INFO:\tcalled function restartGame()");
    userLose();
  }


  /* ==================================================
     HELPERS - FLASH MESSAGES
  ================================================== */

  function userWin() {
    toggleOff();
    flashMessage("win");
    setTimeout(function(){
      flashMessage("clear");
      toggleOn();
    }, 1000);
  }

  function userLose() {
    //better to turn light off or remain on?
    if ( $("#strict-light-status").hasClass("strict-light-on") ) {
      turnStrictOff();
    }
    toggleOff();
    flashMessage("lose");
    setTimeout(function(){
      flashMessage("clear");
      toggleOn();
    }, 1000);
  }

  function userChance() {
    flashMessage("chance");
    setTimeout(function(){
      flashMessage("clear");
    }, 1000);
  }

  flashMessage = function(message) {
    console.log("INFO:\tcalled function flashMessage() for " + messageRef[message]);
    $("#message").html(messageRef[message]);
    //fade in slow, http://stackoverflow.com/a/4668587
    $("#message").fadeOut(0, function(){
      $("#message").fadeIn("slow");
    });
  }
  //end
});
