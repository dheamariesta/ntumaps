var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

var array =[];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 1.3483, lng: 103.6831}
  });

}

var start;
var end;

var startListener = document.getElementsByTagName('select')[0];
start = startListener.value;
startListener.addEventListener('click', function(){
  start = startListener.value;
})

var endListener = document.getElementsByTagName('select')[1];
end = endListener.value;
endListener.addEventListener('click', function(){
  end = endListener.value;
})

var getSavedPath = document.getElementById('get-saved-path');
function handleData(data){
  for(var i = 0; i < data.length; i++){
    var result = data[i];
    addMarker(result, map);
  }
}

function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });

  array.push(location);

  var flightPath = new google.maps.Polyline({
    path: array,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}


// google.maps.event.addDomListener(window, 'load', initialize);
