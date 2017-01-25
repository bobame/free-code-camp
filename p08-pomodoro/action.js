
$(document).ready(function(){
  let timerActive = false;

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
    //TODO: stop timer if active
    $('#break-length').html(5);
    $('#session-length').html(25);
  }

  //update timer status
  function updateTimer() {
    console.log('update me');
  }

});
