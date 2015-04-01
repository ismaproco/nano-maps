var viewModel;

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

        // disable double click
        map.setOptions({disableDoubleClickZoom: true });

        // create the ViewModel with the created makers and current map
        viewModel = new ViewModel( markers, markerTypes , map);
        // bind a new instance of the viewModel to the page
        ko.applyBindings(viewModel);        

        // send all map events to the knockout function
        google.maps.event.addListener(map, "click", function(event) {
            viewModel.mapClick(map, event);
        });


        addMakers(map);
}

// attach the initialize to the page load
google.maps.event.addDomListener(window, 'load', initialize);

// add maker to the map
function addMakers(map)
{
    var pinImage = 'images/pin_small.png'
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(10.3008886,-85.8380699),
      map: map,
      icon: pinImage,
      title: 'Hello World!'
    });

    var $infobox = $('.infobox-inner');
    $infobox.removeClass('infobox-hide');

    var myOptions = {
         content: $infobox[0]
        ,disableAutoPan: false
        ,maxWidth: 0
        ,pixelOffset: new google.maps.Size( -170, -150 )
        ,zIndex: null
        ,infoBoxClearance: new google.maps.Size(1, 1)
        ,isHidden: false
        ,pane: "floatPane"
        ,enableEventPropagation: false
    };

    var ib = new InfoBox(myOptions);
    var showInfobox = true;
    
    google.maps.event.addListener(marker, 'click', function( event ) {
        if( showInfobox ) {
            ib.open(map, marker);    
        }
        else {
            ib.close();
        }
        showInfobox = !showInfobox;
    } );


/*

    function createMarkerType( type, url, title  )
    {
        var markerHTML  = '<div class="marker-type" data-type="'+type+'">';
        markerHTML += '<img src="'+url+'" alt="'+title+'" >';
        markerHTML += '<span>'+title+'<span></div>';

        return markerHTML;    
    }

    var markerTypes = [
            {type:'restaurant', url:'images/Apple.png', title: 'Restaurant' },
            {type:'bar', url:'images/Beer.png', title: 'Bar' },
            {type:'coffe', url:'images/Coffecan.png', title: 'Coffe' },
            {type:'diving', url:'images/Diving.png', title: 'Diving' },
            {type:'romance', url:'images/Hearts.png', title: 'Romance' },
            {type:'movies', url:'images/movierollsmall.png', title: 'Movies' },
        ];

    var contentHTML = '<span class="markers-types-title">Choose marker type:</span>';

    $.each( markerTypes, function( index, item ) { 
        contentHTML += createMarkerType( item.type, item.url, item.title );
    } );
*/

    
}


