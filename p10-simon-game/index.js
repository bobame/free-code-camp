$(document).ready(function(){

  //variables to capture states
  var toggleIsOn = false;
  var gameIsOn = false;
  var turnIsUser = false;
  var counter = 1;
  var gamePlays = [];
  var userPlays = [];
  var colorsArr = ["green", "red", "blue", "yellow"];

  //variables to hold constants
  var playsMax = 2; //TESTING, update back to 20
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

  //naming functions to utilize deferreds/promises else getting exception below
  //Uncaught TypeError: Cannot read property 'done' of undefined
  var getGamePlays;
  var getUserPlays;
  var updateColor;
  var playIsMatching;

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
      toggleOff();
    } else {
      console.log("ERROR:\tExpecting .toggle-off or .toggle-on in #switch-toggle element");
    }
  });

  //click on start button
  $("#start-button").on("click", function(){
    console.log("INFO:\tclicked on start button, id:" + this.id);
    if (toggleIsOn && !gameIsOn) {
      startGame();
      gameIsOn = true; //REVISIT FOR TOGGLING OFF THEN ON THEN START AGAIN
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

  //click on strict button
  $("#strict-button").on("click", function(){
    console.log("INFO:\tclicked on strict button, id:" + this.id);
  });


  /* ==================================================
     HELPERS - OFF/ON SWITCH TOGGLE
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

  /* ==================================================
     HELPERS - START BUTTON GAME
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
      });
    });
  }

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
    //if moves under 20 add next random move
    if (gamePlays.length < playsMax) {
      var newMove = colorsArr[Math.floor(Math.random() * colorsArr.length)];
      console.log("INFO:\tinside getMoves(), adding new move, " + newMove);
      gamePlays.push(newMove);
    }
  }

  function playMoves() {
    console.log("INFO:\tcalled function playMoves()");
    console.log("INFO:\tinside playMoves(), looping through gamesPlays, " + gamePlays);

    for (var i=0; i<gamePlays.length; i++) {
      console.log("INFO:\tinside playMoves(), playing move, " + gamePlays[i]);
      // play corresponding audio sound
      new Audio(audioRef[gamePlays[i]]).play();
      console.log("\n*****Playing sound for => " + gamePlays[i]);
      //highlight corresponding button darker for half second
      updateColor(gamePlays[i], colorsRef[gamePlays[i]][1], colorsRef[gamePlays[i]][0]);
    }

  }

  updateColor = function(target, color1, color2) {
    console.log("INFO:\tcalled function updateColor()");
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();
    //highlight with darker color
    setTimeout(function(){
      $("#"+target).css("background-color", color1);
      deferred1.resolve();
      new Audio(audioRef[color1]).play();
    }, 0);
    //after half second set back to original color
    setTimeout(function(){
      $("#"+target).css("background-color", color2);
      deferred1.resolve();
    }, 200);
    return $.when(deferred1, deferred2).done().promise();
  }


  /* ==================================================
     HELPERS - START BUTTON USER
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

      if (playIsMatching()) {
        console.log("PLAY IS MATCHING");
        testContinue();
      } else {
        console.log("PLAY IS NOT MATCHING");
      }

      deferred2.resolve();
    }, waitTime);
    return $.when(deferred1, deferred2).done().promise();
  }

  playIsMatching = function() {
    console.log("INFO:\tcalled function playIsMatching()");
    //simple array comparing without for looping, http://stackoverflow.com/a/6230314
    var isMatching = gamePlays.sort().join(",") === userPlays.sort().join(",");
    console.log("isMatching?: " + isMatching);
    return isMatching;
  }

  function testContinue() {
    console.log("CHECKING PRINT");
    continueGame();
  }



  /* ==================================================
     HELPERS - CONTINUE GAME
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



  //end
});
