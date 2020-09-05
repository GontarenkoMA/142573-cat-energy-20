let map;
let marker;
let icon;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.9387, lng: 30.323},
    zoom: 14.25,
    disableDefaultUI:true
  });

  icon = {
      // scaledSize: new google.maps.Size(50, 50),
      // origin: new google.maps.Point(0, 0),
      // anchor: new google.maps.Point(25, 50),
      url: "../img/map-pin.png"
  };

  marker = new google.maps.Marker({
    position: { lat: 59.93838, lng: 30.3231},
    map: map,
    icon: icon
  });
}
//
// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         document.body.style.backgroundColor = "yellow";
//     } else {
//         document.body.style.backgroundColor = "pink";
//     }
// }
//
// var x = window.matchMedia("(max-width: 700px)")
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes
