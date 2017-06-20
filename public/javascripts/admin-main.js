var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

var array =[];
var leeweenam;
function initialize() {
  leeweenam = { lat: 1.3475, lng: 103.6809};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: leeweenam
  });
  array.push(leeweenam);

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    let coordObj = JSON.parse(JSON.stringify(event.latLng));
    array.push(coordObj);
    console.log(array);

    var flightPath = new google.maps.Polyline({
      path: array,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  });

  // Add a marker at the center of the map.
  addMarker(leeweenam, map);


}
var submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function() {
  console.log(array)
  var pathData = {
    start: document.getElementById('start').value,
    end: document.getElementById('end').value,
    route: JSON.stringify(array)
  }
  console.log(pathData)
  $.ajax({
    method: 'POST',
    url: '/adminmap',
    data: pathData
  }).done(function(data){
    alert('path is saved');
  }).fail(function(){
    console.log('error');
  }).always(function(){
    console.log('always');
  });
})

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}
