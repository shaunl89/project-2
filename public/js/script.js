function initMap () {
  var latLng = new google.maps.LatLng(1.3521, 103.8198)
  var map = new google.maps.Map(document.getElementById('map2'), {
    zoom: 18,
    center: latLng
  })
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var initialLocation = new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      )
      var marker = new google.maps.Marker({
        position: initialLocation,
        map: map
      })
      map.setCenter(initialLocation)
    })
  }
}

initMap()
