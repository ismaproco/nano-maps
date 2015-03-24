function initialize() {
        var mapOptions = {
          center: { lat: 10.3008886, lng: -85.8380699},
          zoom: 16
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
}

//Initialize the map
google.maps.event.addDomListener(window, 'load', initialize);
