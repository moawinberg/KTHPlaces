var map;

//initiate map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.3498092, lng: 18.0684758},
    zoom: 15,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        mapTypeIds: ['roadmap', 'hybrid', 'satellite'],
        position: google.maps.ControlPosition.LEFT_BOTTOM
    }

    });
  //remove built in info windows
   var noPoi = [
    {
        featureType: "poi",
        stylers: [
          { visibility: "off" }
        ]   
      }
    ];

    map.setOptions({
      clickableIcons: false,
      styles: noPoi
    });
}


//Get geolocation
function getLocation() {
    console.log("getLocation running")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Place marker on current position
function showPosition(position) {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    currPos = {lat: position.coords.latitude, lng: position.coords.longitude};
    position = map.setCenter(currPos);
    var marker = new google.maps.Marker({
      position: currPos,
      map: map,
      title: 'Current Position'
    });
}

//add info window
function addInfoWindow(room, marker) {
  var infowindow = new google.maps.InfoWindow({
    content:  "<b>" + room.name + "</b>" + "<br/>" +
            "Byggnad: " + room.buildingName + "<br/>" +
            "Våning: " + room.floor + "<br/>" +
            "Sal: " + room.roomType + "<br/>" +
            "Adress: " + room.address + " " + room.addressNumber + " " + "<br/>" 
  });

  //open info window on click
  marker.addListener('click', function() {
  infowindow.open(map, marker);
  });
}

//Place new marker
function setMarker(room, currPos){
  var marker = new google.maps.Marker({
    position: currPos,
    map: map,
    title: room.placeName 
  });
  addInfoWindow(room, marker);
}