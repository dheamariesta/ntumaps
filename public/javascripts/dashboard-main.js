var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var start;
var end;
var array =[];



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

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 1.3483, lng: 103.6831}
  });
  var pathData = {
    start: start,
    end: end
  }

  var getSavedPath = document.getElementById('get-saved-path');
  getSavedPath.addEventListener('click', function(){
    $.ajax({
      method: 'POST',
      url: '/',
      data: pathData
    }).done(function(data){
      handleData(data);
      return data;
    });
  })


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
}

// function getCurrentUserId() {
//   $.ajax({
//     method: 'GET',
//     url: '/dashboard/' + userid
//   }).done(function(data){
//     return data;
//   });
// }
var updateProfile = document.getElementById('update');
updateProfile.addEventListener('click', function() {

  var email = document.getElementById('inputEmail');
  console.log(email.value);

  // var userUsername = user.username;
  // console.log(userUsername);
  $.ajax({
    method: 'GET',
    url: '/user',
  }).done(function(data){
    console.log(data._id)
    handleUserId(data._id)
    return data;
  });

  function handleUserId(id){
    $.ajax({
      method: 'PUT',
      url: '/dashboard/' +id,
      data: {email:email.value}
    }).done(function(data){
      console.log(data)
      return data;
    });
  }


})

var logout = document.getElementById('logout');
logout.addEventListener('click', function(){
  alert('logout Successful')

})

var deleteAccount = document.getElementById('delete');
deleteAccount.addEventListener('click', function() {


  // var userUsername = user.username;
  // console.log(userUsername);
  $.ajax({
    method: 'GET',
    url: '/user',
  }).done(function(data){
    console.log(data._id)
    handleUserId(data._id)
    return data;
  });

  function handleUserId(id){
    $.ajax({
      method: 'DELETE',
      url: '/dashboard/' +id
    }).done(function(data){
      console.log(data)
      window.location.href = '/'
      //return data;
    });
  }


})



// google.maps.event.addDomListener(window, 'load', initialize);
