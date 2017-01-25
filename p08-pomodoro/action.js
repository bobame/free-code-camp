
$(document).ready(function(){
  let timerActive = false;
  let timerType = 'session';
  let countdownTracking;
  let countdownProgress;

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
    timerType = 'session';
    $('#circle-status').html("START");
  }

  //update timer status
  function updateTimer() {
    let minutes;
    let milliseconds;
    //timer not started and turn is session
    if (!timerActive && timerType==='session') {
      minutes = parseInt($('#session-length').text());
      milliseconds = minutes * 60 * 1000;
      countdownTracking = milliseconds;
      timerActive = true;
      startCountdown();
    }
    //timer not started and turn is 'break'
    else if (!timerActive && timerType==='break') {
      minutes = parseInt($('#break-length').text());
      milliseconds = minutes * 60 * 1000;
      countdownTracking = milliseconds;
      timerActive = true;
      startCountdown();
    }
    //timer is active
    else {
      clearInterval(countdownProgress);
      timerActive = false;
      if (timerType === 'session') {
        $('#circle-status').html("START");
      } else {
        $('#circle-status').html("BREAK");
      }
    }
    countdownTracking = milliseconds;
  }

  //starts countdown
  function startCountdown() {
    countdownProgress = setInterval(function(){
      countdownTracking -= 1000;
      countdownMin = Math.floor(countdownTracking / (60 * 1000));
      countdownSec = Math.floor((countdownTracking % (60 * 1000)) / 1000);
      countdownSec = String("00" + countdownSec).slice(-2);
      $('#circle-status').html(countdownMin + ":" + countdownSec);

      if (countdownTracking < 0) {
        clearInterval(countdownProgress);
        timerActive = false;
        //timerType = timerType==='session'? 'break' : 'session';

        if (timerType==='session') {
          timerType = 'break';
          $('#circle-status').html("BREAK");
        } else {
          timerType = 'session';
          $('#circle-status').html("START");
        }
      }
    }, 1000);
  }

});
