
// bind a new instance of the viewModel to the page
ko.applyBindings(viewModel);


// Initialize google map
function initialize() {
        var mapOptions = {
          center: { lat: 10.3008886, lng: -85.8380699},
          zoom: 16
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);
}

// attach the initialize to the page load
google.maps.event.addDomListener(window, 'load', initialize);
