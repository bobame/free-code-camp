var $searchIcon = $("#search-icon");
var $searchInput = $("#search-input");
var $searchBtn = $("#submit");
var $cancelBtn = $("#cancel");
var $filterAll = $("#btn-all");
var $filterOnline = $("#btn-on");
var $filterOffline = $("#btn-off");
var $streamersList = $("#list");


$(document).ready(function(){
  //hide search input and button on load
  hideDefault();
  //slides out all and slides in online and offline
  // $filterAll.animate({width: 'toggle'});

  //tooltip over search icon
  $searchIcon.attr('title', 'Search streamers');

  //click on search icon toggles input field and button
  $searchIcon.click(function(){
    toggleSearch();
  });
  //click on cancel button toggles search icon
  $cancelBtn.click(function(){
    toggleSearch();
  });

  //get streamers data
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams",
    headers: {
      "client-ID": "vc7b62435lvr09pkh9zaaxlrgd66cv"
    },
    success: function(data){
      //printing all streamers count for reference
      console.log(data.streams.length + " streamers");
      for (var i=0; i<data.streams.length; i++) {
        //decalring variables for easier usage
        var logo = data.streams[i].channel.logo;
        var name = data.streams[i].channel.display_name;
        var status = data.streams[i].channel.status;
        //creating elements to reduce hardcoding errors
        var row = document.createElement("div");
        var colLogo = document.createElement("div");
        var colName = document.createElement("div");
        var colStatus = document.createElement("div");
        //setting to bootstrap classes to force into 3 col rows
        row.setAttribute("class", "row");
        colLogo.setAttribute("class", "col-sm-2");
        colName.setAttribute("class", "col-sm-8");
        colStatus.setAttribute("class", "col-dm-2");
        //testing testing...
        colLogo.appendChild(document.createTextNode("Logo!"));
        colName.appendChild(document.createTextNode(name));
        // colStatus.appendChild(document.createTextNode(status))
        row.appendChild(colLogo);
        row.appendChild(colName);
        row.appendChild(colStatus);
        $streamersList[0].appendChild(row);
      }
    },
    error: function(e){
      alert("Error making request");
    }
  });


});

//for modularity, taken out, to be called inside document ready()

function hideDefault() {
  $searchInput.hide();
  $searchBtn.hide();
  $cancelBtn.hide();
}

function toggleSearch() {
  $searchIcon.toggle();
  $searchInput.toggle();
  $searchBtn.toggle();
  $cancelBtn.toggle();
}
