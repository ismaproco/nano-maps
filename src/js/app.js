// Initialize google map
function initialize() {
        var mapOptions = {
          center: { lat: 10.3008886, lng: -85.8380699},
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

        //initialize saved makers
        var makers = [];

        // create the ViewModel with the created makers and current map
        var viewModel = new ViewModel(makers, map);
        // bind a new instance of the viewModel to the page
        ko.applyBindings(viewModel);        

        // send all map events to the knockout function
        google.maps.event.addListener(map, "click", function(event) {
            viewModel.mapClick(map, event);
        });
}

// attach the initialize to the page load
google.maps.event.addDomListener(window, 'load', initialize);

// add maker to the map
function addMakers(map)
{
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(10.3008886,-85.8380699),
      map: map,
      title: 'Hello World!'
    });    
}


