var viewModel;

// Initialize google map
function initialize() {
        var mapOptions = {
          center: { lat: 52.2375111, lng: 21.0111977},
          zoom: 15,

        };
        var map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        // custom style to hide the default interest points of the map
        var noPoi = [
            {
                featureType: "poi",
                stylers: [
                    { visibility: "off" }
                ]   
            }
        ];

        // set the style to the map
        map.setOptions({styles: noPoi});

        // disable double click
        map.setOptions({disableDoubleClickZoom: true });

        // create the ViewModel with the created makers and current map
        viewModel = new ViewModel( locations, markerTypes , map);
        // bind a new instance of the viewModel to the page
        ko.applyBindings(viewModel);        

        // send all map events to the knockout function
        google.maps.event.addListener(map, "click", function(event) {
            viewModel.mapClick(map, event);
        });

}

// attach the initialize to the page load
google.maps.event.addDomListener(window, 'load', initialize);




