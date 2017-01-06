var forismaticAPI = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";
var randomColor;
var $html = $("html");
var $body = $("body");
var $quoteBtn = $("button");
var $quote = $("#quote");
var $author = $("#author");
var $fontAwesome = $(".fa");
var $foot = $(".foot");

$(document).ready(function(){

  //changes color in response to button click
  $("button").click(function(){
    applyRandomColor();
    showRandomQuote();
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

//applys color to target elements
function applyRandomColor() {
  randomColor = getRandomColor();
  $html.css("background-color", randomColor);
  $body.css("background-color", randomColor);
  $quoteBtn.css("background-color", randomColor);
  $quote.css("color", randomColor);
  $author.css("color", randomColor);
  $fontAwesome.css("color", randomColor);
}

//gets data, then clears old and appends new quote & author
function showRandomQuote() {
  $.getJSON(forismaticAPI, function(data){
    //adds 5% bottom margon when quote text length is longer
    if (data.quoteText.length > 115) {
        $foot.css("margin-bottom", "5%");
    }
    $quote.html(data.quoteText);
    $author.html(data.quoteAuthor);
  });
}
