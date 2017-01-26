
$(document).ready(function(){
  let timerActive = false;
  let timerPaused = false;
  let timerType = 'session';
  let countdownTracking;
  let countdownProgress;
  let countdownStarting;

  //capturing all clicks and calling functions based on click target
  $(document).on('click', function(e){
    //click on minus or plus icons
    if ($(e.target).is('#min-sub-break')) {
      decrementMin('#break-length');
    } else if ($(e.target).is('#min-add-break')) {
      incrementMin('#break-length');
    } else if ($(e.target).is('#min-sub-session')) {
      decrementMin('#session-length');
    } else if ($(e.target).is('#min-add-session')) {
      incrementMin('#session-length');
    }
    //click on reset button
    else if ($(e.target).is('#btn-reset')) {
      resetDefault();
    }
    //click on start button
    else if ($(e.target).is('#circle-status')) {
      updateTimer();
    }
  });

  //decrements if current length > 1 min
  function decrementMin(target) {
    let currentMin = parseInt($(target).text());
    if (currentMin > 1) {
      $(target).html(currentMin-1);
    }
  }

  //increments if current length less than 60 min
  function incrementMin(target) {
    let currentMin = parseInt($(target).text());
    if (currentMin < 60) {
      $(target).html(currentMin+1);
    }
  }

  //resets break and session lengths to starting defaults
  function resetDefault() {
    clearInterval(countdownProgress);
    $('#break-length').html(5);
    $('#session-length').html(25);
    timerActive = false;
    timerPaused = false;
    timerType = 'session';
    $('#circle-status').html("START");
  }

  //update timer status
  function updateTimer() {
    let minutes;
    let milliseconds;
    //timer not started and turn is session
    if (!timerPaused && !timerActive && timerType==='session') {
      minutes = parseInt($('#session-length').text());
      milliseconds = minutes * 60 * 1000;
      countdownTracking = milliseconds;
      startCountdown();
    }
    //timer not started and turn is 'break'
    else if (!timerPaused && !timerActive && timerType==='break') {
      minutes = parseInt($('#break-length').text());
      milliseconds = minutes * 60 * 1000;
      countdownTracking = milliseconds;
      startCountdown();
    }
    //timer is active
    else {
      clearInterval(countdownProgress);
      let partMin = parseInt($('#circle-status').text().split(":")[0]);
      let partSec = parseInt($('#circle-status').text().split(":")[1]);
      milliseconds = ((partMin * 60 * 1000) + (partSec * 1000));
      //if not paused, pause timer and update countdownTracking
      if (!timerPaused) {
        clearInterval(countdownProgress);
        timerPaused = true;
      } else { //otherwise unpause and continue countdown
        startCountdown();
        timerPaused = false;
      }
    }
    countdownTracking = milliseconds;
  }

  //starts countdown
  function startCountdown() {
    timerActive = true;

    //needed to not restart progress bar when countdown paused
    if (!timerPaused) { countdownStarting = countdownTracking; }

    //the actual setInterval() part
    countdownProgress = setInterval(function(){
      countdownTracking -= 1000;
      let countdownMin = Math.floor(countdownTracking / (60 * 1000));
      let countdownSec = Math.floor((countdownTracking % (60 * 1000)) / 1000);
      countdownSec = String("00" + countdownSec).slice(-2);

      //determining progress bar color based on timer type
      if (timerType === 'session') {
        $("#progress-bar-progress")[0].style.backgroundColor = "#92efc4";
      } else {
        $("#progress-bar-progress")[0].style.backgroundColor = "#e1e8e4";
      }

      //updating progress bar UI based on percentage time elapsed
      let progressPercentage = Math.floor(((countdownStarting - countdownTracking) / countdownStarting) * 100);
      $("#progress-bar-progress")[0].style.width = progressPercentage + "%";
      $("#progress-bar-label").html(progressPercentage + "%");

      //displaying countdown
      $('#circle-status').html(countdownMin + ":" + countdownSec);

      if (countdownTracking < 0) {
        //plays 4 notes from simon project
        playAudio();
        clearInterval(countdownProgress);
        timerActive = false;

        //resets progress bar
        $("#progress-bar-progress")[0].style.width = "0%";
        $("#progress-bar-label").html("");

        if (timerType==='session') {
          //if finished turn is 'session' then updates next turn to 'break'
          timerType = 'break';
          $('.big-circle').removeClass("start");
          $('.big-circle').addClass("break");
          $('#circle-status').html("BREAK");
        } else {
          //if finished turn is 'break' then updates next turn to 'session'
          timerType = 'session';
          $('.big-circle').removeClass("break");
          $('.big-circle').addClass("start");
          $('#circle-status').html("START");
        }
      }
    }, 1000);
  }

  //https://www.freecodecamp.com/challenges/build-a-simon-game
  function playAudio() {
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3").play();
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3").play();
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3").play();
    new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3").play();
  }

});
