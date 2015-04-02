// the main ViewModel
var ViewModel = function( markers, markerTypes, map ) {
    var self = this;
    var markers = markers || [];
    var markerTypes = markerTypes || [];

    // build the markerType observable Array
    this.markerTypes = ko.observableArray( markerTypes );

    //reference of the google map object
    this.map = map;

    // map the makers, and create an observable array with them
    this.markers = ko.observableArray( markers.map( function ( marker ) {
       return marker;
    } ) );

    // initialize the current and selected markers with empty objects
    this.currentMarker = ko.observable( new Marker( { } ) );
    this.selectedMarker = ko.observable( new Marker( { } ) );

    // add a new marker to the observable array.
    this.addMarker = function() {
        this.currentMarker().googleMarker().parent = this.currentMarker( );
        this.markers.push( this.currentMarker().googleMarker().parent );
        this.currentMarker(new Marker( {} ) )
    };

    // rsteps to remove a marker
    this.removeMarker = function() {
        // hide the infobox
        this.currentMarker().googleMarker().$infobox.addClass('infobox-hide');
        //remove the marker from the map
        this.currentMarker().googleMarker().setMap(null);
        // remove the marker from the observable array
        this.markers.remove(this.currentMarker);
    };


    // manage the map clicks
    this.mapClick = function( map, event ) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        console.log( "Lat=" + lat + "; Lng=" + lng );

        this.addMarkerToView(map, lat, lng);
    };

    // set the type of the selected marker
    this.setTypeSelectedMarker = function( markerType ) {
        self.selectedMarker().googleMarker().setIcon( markerType.url() );
    };

    // print information into the console log
    this.writeLog = function(text) {
        console.log(text);
    };

    // add maker to the map
    this.addMarkerToView = function (map, lat, lng)
    {
        // is there another marker in the map?
        if( !$.isEmptyObject( this.currentMarker().googleMarker() ) )
        {
            // remove the existing marker
            this.currentMarker().googleMarker().setMap(null);
        }

        // set the small pin as the marker image
        var pinImage = 'images/pin_small.png'
        
        this.currentMarker().lat( lat );
        this.currentMarker().lng( lng );

        // set the marker type as none

        this.currentMarker().type(
            markerTypes.filter( function( markerType ) { 
                    return markerType.type() == 'none';
            })[0]
        );

        var marker = new google.maps.Marker({
            //52.2375111,21.0111977
          position: new google.maps.LatLng(lat, lng),
          map: map,
          icon: this.currentMarker().type().url(),
          title: this.currentMarker().name()
        });

        this.currentMarker().googleMarker(marker);

        // select the infobox and hide old
        marker.$infobox = $('.infobox-inner');
        marker.$infobox.addClass('infobox-hide');
        
        // set the infobox options for the map
        var myOptions = {
             content: marker.$infobox[0]
            ,disableAutoPan: false
            ,maxWidth: 0
            ,pixelOffset: new google.maps.Size( -170, -150 )
            ,zIndex: null
            ,infoBoxClearance: new google.maps.Size(1, 1)
            ,isHidden: false
            ,pane: "floatPane"
            ,enableEventPropagation: false
        };

        // build the infobox with the options
        var ib = new InfoBox(myOptions);
        
        google.maps.event.addListener(marker, 'click', function( event ) {
            // removes the hide class from the infobox
            marker.$infobox.removeClass('infobox-hide');
            // set the selected marker to show specific data in the infobox
            // if the marker.parent exists is a saved marker.
            // if not is a temporary marker
            self.selectedMarker( marker.parent || self.currentMarker() );
            ib.open(map, marker);
        } );
    }



}