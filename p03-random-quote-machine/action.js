var randomColor;

$(document).ready(function(){

  //changes color in response to button click
  $("button").on("click", function(){
    randomColor = getRandomColor();
    $("html").css("background-color", randomColor);
    $("body").css("background-color", randomColor);
    $("button").css("background-color", randomColor);
  });
});

//from Anatoliy & Robin, http://stackoverflow.com/a/1484514
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
