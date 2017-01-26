$(document).ready(function(){

  let user;
  let computer;
  let scoreX = 0;
  let scoreY = 0;
  let turn;
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


  openGame();


  function openGame() {
    clearBoard();
    fadeGame();
    getTurn();
    askUserXO();
  }

  function startGame() {
    playGame();
  }

  function clearBoard() {
    $(".game").html("");
  }

  function fadeGame() {
    $(".left").fadeTo(1000, 0.12);
    $(".right").fadeTo(1000, 0.12);
  }

  function getTurn() {
    let randomNum = Math.floor(Math.random() * (2-1+1) + 1);
    if (randomNum === 1) turn = 'x';
    else turn = 'y';
    console.log("turn num is " + randomNum + " so turn is " + turn);
  }

  function askUserXO() {
    //set start screen height to game height
    let viewHeight = $('.right').height();
    //hide game to show start screen in its place
    $(".right").hide();
    $(".right-start")[0].style.height = viewHeight + "px";
    $("#start-x, #start-y").on('click', function(){
      //get user player and disable computer player
      user = this.id.split("-")[1];
      computer = (user==='x')? 'y' : 'x';
      $("#start-"+user)[0].style.backgroundColor = "#000";
      $("#start-"+computer).prop("disabled", true);
      //revealing which goes first
      $("#first-turn").html(turn.toUpperCase());
      $(".right-start").delay(1000).fadeOut(500, function(){
        presentGame();
      });
    });
  }

  function presentGame() {
    $(".right").fadeTo(400, 1);
    $(".left").fadeTo(400, 1, function(){
      //display who's turn is next
      if (turn===user) $(".turn").html("Your turn, go!");
      else $(".turn").html("Computer's turn");
      //display player references next to score
      if (user==="x") {
        $("#score-x-ref").html("You");
        $("#score-y-ref").html("Computer");
      } else {
        $("#score-x-ref").html("Computer");
        $("#score-y-ref").html("You");
      }
      startGame();
    });
  }

  function playGame(){
    console.log("Playing game");
  }

});
