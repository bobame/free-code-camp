var $searchIcon = $("#search-icon");
var $searchInput = $("#search-input");
var $autocomplete = $("#autocomplete");
var $searchBtn = $("#submit");
var $cancelBtn = $("#cancel");
var $filterAll = $("#btn-all");
var $filterOnline = $("#btn-on");
var $filterOffline = $("#btn-off");
var $streamersList = $("#list");
var usersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "summit1g"];
var logoPlaceholder = "http://res.cloudinary.com/nelloreg/image/upload/v1483151812/Screen_Shot_2016-12-30_at_6.23.11_PM_jf1uun.png";


$(document).ready(function(){
  //hide search input and button on load
  hideDefault();
  //slides out all and slides in online and offline
  // $filterAll.animate({width: 'toggle'});

  //tooltip over search icon
  $searchIcon.attr('title', 'Search streamers');

  //populating autocomplete options
  populateAutocomplete();

  //click on search icon toggles input field and button
  $searchIcon.click(function(){
    toggleSearch();
  });
  //click on cancel button toggles search icon
  $cancelBtn.click(function(){
    toggleSearch();
  });

  //loop through given user array
  for (var i=0; i<usersArr.length; i++) {
    //async should be false!! else entire array assigned same last value
    var name = usersArr[i];
    var status;
    var logo;
    var channel;

    //first checking if channel exists
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/channels/"+usersArr[i],
      headers: { "client-ID": "vc7b62435lvr09pkh9zaaxlrgd66cv" },
      async: false,
      success: function(dataChannel){
        //if existing, reassigning more accurate display_name and getting logo
        name = dataChannel.display_name;
        logo = dataChannel.logo;
        channel = dataChannel.url;
        //then checking if currently streaming
        $.ajax({
          type: "GET",
          url: "https://api.twitch.tv/kraken/streams/"+usersArr[i],
          headers: { "client-ID": "vc7b62435lvr09pkh9zaaxlrgd66cv" },
          async: false,
          success: function(dataStream){
            // status = (dataStream==null)? "offline" : "online";
            // working below but not in ternary above, why?
            if (dataStream.stream==null) {
              //if not currently streaming, status is offline
              status = "offline";
            } else {
              //if streaming, status is currently streaming content title
              status = dataStream.stream.channel.status;
            }
          },
          //adding just in case, but don't expect this to fail at this point
          error: function(e){
            alert("Error loading stream url");
          }
        });
      },
      //if not existing, status is notification indicating account not found
      error: function(e){
        status = "unavailable";
        logo = logoPlaceholder;
        channel = "#";
      }
    });
    //calling function to handle the diaplay part
    buildHTML(name, status, logo, channel);
  }

});

//default hides select elemens upon page load
function hideDefault() {
  $searchInput.hide();
  $searchBtn.hide();
  $cancelBtn.hide();
}

//adds options for autocomplete
function populateAutocomplete() {
  for (var i=0; i<usersArr.length; i++) {
    var option = document.createElement("option");
    option.value = usersArr[i];
    option.appendChild(document.createTextNode(usersArr[i]));
    $autocomplete[0].appendChild(option);
  }
}

//toggles search icon vs field set
function toggleSearch() {
  $searchIcon.toggle();
  $searchInput.toggle();
  $searchBtn.toggle();
  $cancelBtn.toggle();
}

//handles display of api data onto html
function buildHTML(name, status, logo, channel) {
  console.log(name + ":"+status+":"+channel+":"+logo);
  //row per streamer
  var row = document.createElement("div");
  row.setAttribute("class", "row");
  //logo column
  var colLogo = document.createElement("div");
  colLogo.setAttribute("class", "col-sm-2");
  var a = document.createElement("a");
  a.setAttribute("href", channel);
  a.setAttribute("target", "_blank");
  var img = document.createElement("img");
  img.setAttribute("src", logo);
  img.setAttribute("alt", "Logo for Streamer: "+name);
  a.appendChild(img);
  colLogo.appendChild(a);
  row.appendChild(colLogo);
  //display name
  var colName = document.createElement("div");
  colName.setAttribute("class", "col-sm-4");
  var a = document.createElement("a");
  a.setAttribute("href", channel);
  a.setAttribute("target", "_blank");
  a.appendChild(document.createTextNode(name));
  colName.appendChild(a);
  row.appendChild(colName);
  //status - streaming / offline / not found
  var colStatus = document.createElement("div");
  //adding classes per status to use for filtering/toggling later
  if (status==="unavailable") {
    colStatus.setAttribute("class", "col-sm-6 unavailable");
  } else if (status==="offline") {
    colStatus.setAttribute("class", "col-sm-6 offline");
  } else {
    colStatus.setAttribute("class", "col-sm-6 online");
  }
  colStatus.appendChild(document.createTextNode(status));
  row.appendChild(colStatus);
  $streamersList[0].appendChild(row);
}
