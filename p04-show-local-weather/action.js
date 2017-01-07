
//to toggle Fahrenheit/Celsius button
var clickCount = 0;

$(document).ready(function(){
  var url;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      url = getUrl(position);
      getData(url);
    });
  } else {
    //in case no navigator.geolocation
    alert("Geolocation not supported in current browser.");
  }
});

function getUrl(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  return "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=987bdab9b6f926dbb6de05bf67491e93";
}

function getData(url) {
  //2. calls api with built url and retrieves data
  $.getJSON(url, function(data){
    // http://openweathermap.org/img/w/10d.png
    var imgSrc = "http://openweathermap.org/img/w/"+data.weather[0]["icon"]+".png";
    var tempKel = data.main["temp"];
    var tempFah = Math.round(tempKel * (9/5) - 459.67)+"&deg;"+"F";
    var tempCel = Math.round(tempKel - 273.15)+"&deg;"+"C";
    var city = data.name;
    var sky = data.weather[0]["description"];
    var windSpeed = data.wind["speed"]+" m/s";

    //3. show local weather
    $("#weather-icon").html("<img src='"+ imgSrc +"' alt='weather icon'/>");
    $("#degrees").html(tempFah);
    $("#location").html(city);
    $("#sky").html(sky);
    $("#wind").html(windSpeed);

    //4. toggles fahrenheit and celcius
    $("#degrees").on("click", function(){
      clickCount += 1;
      if (clickCount%2==0) {
        $("#degrees").html(tempFah);
      } else {
        $("#degrees").html(tempCel);
      }
    });
  });
}
