$(document).ready(function(){

  var toggleIsOn = false;
  var gameIsOn = false;
  var counter = 1;
  var gamePlays = [];
  var userPlays = [];
  var colorsArr = ["green", "red", "blue", "yellow"];
  var audioRef = {
    "green": "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "red": "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "blue": "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "yellow": "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };

  //Uncaught TypeError: Cannot read property 'done' of undefined
  var getGamePlays;
  var getUserPlays;

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
      gameIsOn = true;
    }


  });

  //click on color buttons
  $(".btnColor").on("click", function(){
    console.log("INFO:\tclicked on color button, id:" + this.id);

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
  }

  function toggleOff() {
    console.log("INFO:\tcalled function toggleOff()");
    $("#switch-toggle").removeClass("toggle-on");
    $("#switch-toggle").addClass("toggle-off");
    toggleIsOn = false;
    $(".pointer-when-on").css("cursor", "default");
    $("#count-field").html("");
  }

  /* ==================================================
     HELPERS - START BUTTON
  ================================================== */

  function startGame() {
    console.log("INFO:\tcalled function startGame()");

    //Deferreds/Promises to handle async tasks, http://stackoverflow.com/a/24660885
    getGamePlays().done(function(){
      console.log("INFO:\tcompleted function getGamePlays()");
      getUserPlays().done(function(){
        console.log("INFO:\tcompleted function getUserPlays()");
      });
    });
  }

  getGamePlays = function() {
    console.log("INFO:\tcalled function getGamePlays()");
    var deferred1 = $.Deferred();
    var deferred2 = $.Deferred();

    setTimeout(function(){
      getMoves();
      deferred1.resolve();
    }, 750);

    setTimeout(function(){
      playMoves();
      deferred2.resolve();
    }, 1000);
    return $.when(deferred1, deferred2).done().promise();
  }


  getUserPlays = function() {
    console.log("INFO:\tcalled function getUserPlays()");

    var deferred = $.Deferred();
    setTimeout(function(){
      deferred.resolve();
    }, 2000);
    return deferred.promise();
  }


  function getMoves() {
    console.log("INFO:\tcalled function getMoves()");

    if (gamePlays.length < 20) {
      var newMove = colorsArr[Math.floor(Math.random() * colorsArr.length)];
      gamePlays.push(newMove);
    }

  }

  function playMoves() {
    console.log("INFO:\tcalled function playMoves()");

    for (var i=0; i<gamePlays.length; i++) {
      new Audio(audioRef[gamePlays[i]]).play();
    }

  }





});
