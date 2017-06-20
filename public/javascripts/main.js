function initMap() {
  var markerArray = [];

  // Instantiate a directions service.
  var directionsService = new google.maps.DirectionsService;

  // Create a map and center it on Manhattan.
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 1.3483, lng: 103.6831}
  });

  // Create a renderer for directions and bind it to the map.
  var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

  directionsDisplay.setPanel(document.getElementById('directionsPanel'))

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(
      directionsDisplay, directionsService, markerArray, stepDisplay, map);
  // Listen to change events from the start and end lists.
  var onChangeHandler = function() {
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
  };
  document.getElementById('from').addEventListener('change', onChangeHandler);
  document.getElementById('to').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route({
    origin: document.getElementById('from').value,
    destination: document.getElementById('to').value,
    travelMode: 'WALKING'
  }, function(response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      // document.getElementById('warnings-panel').innerHTML =
      //     '<b>' + response.routes[0].warnings + '</b>';
      directionsDisplay.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.

  console.log(JSON.stringify(directionResult.routes));
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
        stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    console.log(text);
    stepDisplay.open(map, marker);
  });
}

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

var array =[];

function initialize() {
  var leeweenam = { lat: 1.3475, lng: 103.6809};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: leeweenam
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    console.log(JSON.stringify(event.latLng));
    array.push(JSON.stringify(event.latLng));
    console.log(array);
  });

  // Add a marker at the center of the map.
  addMarker(leeweenam, map);
}

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

// google.maps.event.addDomListener(window, 'load', initialize);
