// the main ViewModel
var ViewModel = function( locations, markerTypes, map ) {
    var self = this;
    var locations = locations || [];
    var markerTypes = markerTypes || [];

    // build the markerType observable Array
    this.markerTypes = ko.observableArray( markerTypes );

    //reference of the google map object
    this.map = map;

    // map the makers, and create an observable array with them
    this.locations = ko.observableArray( locations.map( function ( marker ) {
       return marker;
    } ) );

    // initialize the current and selected markers with empty objects
    this.currentLocation = ko.observable( new Location( { } ) );
    this.selectedLocation = ko.observable( new Location( { } ) );

    // add a new marker to the observable array.
    this.addMarker = function() {
        // set the parent of the current google marker's parent with the app marker.
        this.currentLocation().googleMarker().parent = this.currentLocation( );
        // hides the infobox.
        this.currentLocation().googleMarker().$infobox.addClass( 'infobox-hide' );
        // push the current marker to the applications markers.
        this.locations.push( this.currentLocation().googleMarker().parent );
        // reset the current marker.
        this.currentLocation( new Location( {} ) );
    };

    // rsteps to remove a marker
    this.removeMarker = function() {
        // hide the infobox
        this.currentLocation().googleMarker().$infobox.addClass('infobox-hide');
        //remove the marker from the map
        this.currentLocation().googleMarker().setMap(null);
        // remove the marker from the observable array
        this.locations.remove(this.currentLocation);
    };


    // manage the map clicks
    this.mapClick = function( map, event ) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // add a google marker to the map
        this.addMarkerToView(map, lat, lng);
        // writes the clicked position in the console
        console.log( "Lat=" + lat + "; Lng=" + lng );
    };

    // set the type of the selected marker
    this.setTypeSelectedLocation = function( markerType ) {
        self.selectedLocation().googleMarker().setIcon( markerType.url() );
    };

    // print information into the console log
    this.writeLog = function(text) {
        console.log(text);
    };

    // add maker to the map
    this.addMarkerToView = function (map, lat, lng)
    {
        // is there another marker in the map?
        if( !$.isEmptyObject( this.currentLocation().googleMarker() ) )
        {
            // remove the existing marker
            this.currentLocation().googleMarker().setMap(null);
        }

        // set the small pin as the marker image
        var pinImage = 'images/pin_small.png'
        
        this.currentLocation().lat( lat );
        this.currentLocation().lng( lng );

        // initialize the marker type as none
        this.currentLocation().type(
            markerTypes.filter( function( markerType ) { 
                    return markerType.type() == 'none';
            })[0]
        );

        // Create the google marker
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          icon: this.currentLocation().type().url(),
          title: this.currentLocation().name()
        });

        // set the google marker of the currentLocation.
        this.currentLocation().googleMarker(marker);

        // select the infobox and hide old
        marker.$infobox = $('.infobox-inner');
        marker.$infobox.addClass('infobox-hide');
        
        // set the infobox options for the map
        var myOptions = {
             content: marker.$infobox[0]
            ,disableAutoPan: false
            ,maxWidth: 0
            // set the infobox position left, top coordinates
            ,pixelOffset: new google.maps.Size( -170, -180 )
            ,zIndex: null
            ,infoBoxClearance: new google.maps.Size(1, 1)
            ,isHidden: false
            ,pane: "floatPane"
            ,enableEventPropagation: false
        };

        // build the infobox with the options
        var ib = new InfoBox(myOptions);
        
        // creates the event listener for the marker click. 
        google.maps.event.addListener(marker, 'click', function( event ) {
            // removes the hide class from the infobox
            marker.$infobox.removeClass('infobox-hide');
            // set the selected marker to show specific data in the infobox
            // if the marker.parent exists is a saved marker.
            // if not is a temporary marker
            self.selectedLocation( marker.parent || self.currentLocation() );
            ib.open(map, marker);
        } );
    }
}