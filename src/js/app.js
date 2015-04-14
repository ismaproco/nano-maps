// Initialize google map
function initialize() {
        var mapOptions = {
          center: { lat: 52.2375111, lng: 21.0111977},
          zoom: 14,
          disableDefaultUI: true
        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        // custom style to hide the default interest points of the map
        var noPoints = [
            {
                featureType: "poi",
                stylers: [
                    { visibility: "off" }
                ]   
            }
        ];

        // set the style to the map
        map.setOptions({styles: noPoints});

        // disable double click
        map.setOptions({disableDoubleClickZoom: true });

        // send all map events to the knockout function
        google.maps.event.addListener(map, "click", function(event) {
            viewModel.mapClick(map, event);
        });

        viewModel.setMap( map );
        viewModel.initilizeLocations( );
}

//google library was loaded correctly?
if( typeof( google ) != 'undefined' ) {
    // attach the initialize to the page load
    google.maps.event.addDomListener(window, 'load', initialize);    
}

// create the ViewModel with the created makers and current map
var viewModel = new ViewModel( markerTypes );
// bind a new instance of the viewModel to the page
ko.applyBindings(viewModel);




