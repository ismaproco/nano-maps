// the main ViewModel
var ViewModel = function( markerTypes ) {
    var self = this;
    var markerTypes = markerTypes || [];
    var bouncingMarker = {};

    // reference of the google map object
    this.map = {};

    // reference of the locations object
    this.locations = ko.observableArray( );
    this.warningMessageVisible = ko.observable( false );
    this.warningMessage = ko.observable( 'The map could not be loaded' );
    this.leftPanelIsVisible = ko.observable( true );

    // initialize the current and selected markers with empty objects
    this.temporaryLocation = ko.observable( new Location( { } ) );
    this.selectedLocation = ko.observable( new Location( { } ) );
    // observable to store the filter value of the filtered textbox
    this.filter = ko.observable('');

    //** Map Operations
    //

    // set the loaded map
    this.setMap = function ( map ) {
        self.map = map;
    }

    // get the map
    this.getMap = function ( ) {
        return self.map;
    }

    //** Marker Operations
    //

    // add a new marker to the observable array.
    this.addMarker = function() {

        // name is empty?
        if( self.temporaryLocation().name().trim().length == 0 )
        {
            // set the value as 'no name'
            self.temporaryLocation().name('no name');
        }

        // hides the infobox.
        self.temporaryLocation().googleMarker().$infobox.addClass( 'infobox-hide' );
        // set the parent of the current google marker's parent with the app marker.
        self.temporaryLocation().googleMarker().parent = self.temporaryLocation( );
        // push the current marker to the applications markers.
        self.locations.push( self.temporaryLocation().googleMarker().parent );
        // reset the current marker.
        self.temporaryLocation( new Location( {} ) );
    };

    // steps to remove a marker
    this.removeMarker = function() {
        // hide the infobox
        self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide');
        //remove the marker from the map
        self.selectedLocation().googleMarker().setMap(null);
        // remove the marker from the observable array
        self.locations.remove( self.selectedLocation() );
    };

    // hide infobox of the selected location
    this.hideInfobox = function() {
        self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide');
    }

    // manage the map clicks
    this.mapClick = function( map, event ) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // add a google marker to the map
        self.addMarkerToView(map, self.temporaryLocation(), lat, lng);
        // writes the clicked position in the console
        console.log( "Lat=" + lat + "; Lng=" + lng );
    };

    // add maker to the map
    this.addMarkerToView = function (map, location, lat, lng)
    {
        // is there another marker in the map?
        if( !$.isEmptyObject( location.googleMarker() ) )
        {
            // remove the existing marker
            self.temporaryLocation().googleMarker().setMap(null);
        }

        // set the small pin as the marker image
        var pinImage = 'images/pin_small.png'
        
        location.lat( lat );
        location.lng( lng );

        // load the marker url and resize it to the given value in runtime
        var pinIcon = new google.maps.MarkerImage(
            location.type().url(),
            null,
            null,
            null,
            new google.maps.Size(42, 42)
        );

        // set the clickable shape of the marker
        var shape = {
          coords: [10, 10, 10, 35, 35, 35, 35 , 10],
          type: 'poly'
        };

        // Create the google marker
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          icon: pinIcon,
          title: location.name(),
          animation: google.maps.Animation.DROP,
          shape: shape
        });

        // set the google marker of the temporaryLocation.
        location.googleMarker(marker);

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
        marker.ib = new InfoBox(myOptions);
        
        // creates the event listener for the marker click. 
        google.maps.event.addListener(marker, 'click', function( event ) {
            self.selectMarker( marker );
        } );
    }

    // select the marker in the map
    this.selectMarker = function( marker ) {
        // removes the hide class from the infobox
        marker.$infobox.removeClass('infobox-hide');
        // set the selected marker to show specific data in the infobox
        // if the marker.parent exists is a saved marker.
        // if not is a temporary marker
        self.selectedLocation( marker.parent || self.temporaryLocation() );
        marker.ib.open(self.map, marker);
        // add bounce animation to the marker
        if (marker.getAnimation() != null && marker != bouncingMarker ) {
            marker.setAnimation(null);
        }
        else {
            // Bouncing marker animation exists?  
            if( bouncingMarker.setAnimation ) {
                bouncingMarker.setAnimation(null);    
            }
            //Animate the clicked marker    
            marker.setAnimation(google.maps.Animation.BOUNCE);
            bouncingMarker = marker;
        }   
    }


    // ** Locations methods
    //

    // set the type of the selected marker
    this.setTypeSelectedLocation = function( markerType ) {
        self.selectedLocation().type( markerType );
        self.selectedLocation().googleMarker().setIcon( markerType.url() );
    };

    // select the location    
    this.selectLocation = function( location ) {
        self.selectMarker( location.googleMarker() );
    }

    // add locations array to the locations object
    this.addLocationsToMap = function( locationsArray ) {
        locationsArray.forEach( function (location) {
            self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
            // set the googleMarker parent as the respective location.
            location.googleMarker().parent = location;

            self.locations.push( location );
        } );
    };

    // hides the left panel
    this.toggleLeftPanel = function( ) {
        $("#wrapper").toggleClass('toggled');
        google.maps.event.trigger(self.map, 'resize' );
        $('.navbar-collapse').collapse('hide');
    }

    // ** Filter methods
    //

    // manage the keypress of the of the filter input
    this.filterKeyPress = function( model, event) {
        self.filter(self.filter() +  String.fromCharCode( event.keyCode ) );
        // send the filter value to the filtering function
        self.filterLocations( self.filter() );
    };

    this.filterKeyEvent = function( model, event ) {
        self.filterLocations( self.filter() );
    };

    // toggle visibility of locations by the filter text
    this.filterLocations = function( text ) {
        // text is initialize with empty array if input argument is empty
        text = text || '';
        // transform the text to lower case to be compared
        text = text.toLowerCase();
    
        // hide infobox from the selected marker
        if( self.selectedLocation().googleMarker().$infobox ) {
            self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide'); 
        }

        // toggle the visibility of the location comparing the location's name
        // with the input text
        self.locations().forEach( function( location ) {
            if( location.name().toLowerCase().indexOf( text ) > -1 ) {
                location.isVisible( true );
                location.googleMarker().setMap( self.map );
            } 
            else {
                location.isVisible( false );
                // removes marker from the map
                location.googleMarker().setMap( null );
                           
            }
        } );
    };

    //toggle visibility of locations by the type
    this.filterLocationsByType = function( type ) { 
        // hide infobox from the selected marker
        if( self.selectedLocation().googleMarker().$infobox ) {
            self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide'); 
        }
        // toggle the visibility of the location comparing the location's name
        // with the input text
        self.locations().forEach( function( location ) {
            if( type.title() == markerTypes.none.title() || 
                                        location.type().title() == type.title() ) {
                location.isVisible( true );
                location.googleMarker().setMap( self.map );
            } 
            else {
                location.isVisible( false );
                // removes marker from the map
                location.googleMarker().setMap( null );
                           
            }
        } );
    };

    //** Google places API methods
    //

    // callback function of the Google API
    this.googleAPICallback = function( results, status ) {
        // the places library is enabled?
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            // loop the results and create the locations
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
            
                // set the location properties
                var location = new Location({
                    name: place.name ,
                    lat: place.geometry.location.k,
                    lng: place.geometry.location.D,
                    type: self.getMarkerTypeByGoogle(place.types)
                });

                // add marker to the map view
                self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
                // set the googleMarker parent as the respective location.
                location.googleMarker().parent = location;
                self.locations.push( location );
            }
        }
    }

    // Get the list of google places
    this.getListOfGooglePlaces = function( ) {

        var locationCoordinates = new google.maps.LatLng( 52.2375111 , 21.0111977 );

        var request = {
            location: locationCoordinates,
            radius: '3000',
            types: [ 'restaurant', 'bar', 'cafe', 'movie_theater', 'aquarium' ]
        };

        service = new google.maps.places.PlacesService( self.map );
        // search for the first 20 places
        service.nearbySearch( request, this.googleAPICallback );
    };

    // get marker type from google place type
    this.getMarkerTypeByGoogle = function( types )
    {
        // returns the markerType for the respective google place type 
        if( _.contains( types, 'restaurant' ) ) {
            return markerTypes.restaurant;
        } else if( _.contains( types, 'cafe' ) ) {
            return markerTypes.coffee;
        } else if( _.contains( types, 'bar' ) ) {
            return markerTypes.bar;
        } else if( _.contains( types, 'movie_theater' ) ) {
            return markerTypes.movies;
        } else if( _.contains( types, 'aquarium' ) ) {
            return markerTypes.diving;
        }
    };

    //** Instagram API Methods
    //

    // callback function for the instagram API call.
    this.instagramAPICallback = function( results ) {
        for (var i = 0; i < results.data.length; i++) {
            var place = results.data[i];
            
            // set the location properties
            var location = new Location({
                name: place.location.name || 'No location name',
                lat: place.location.latitude,
                lng: place.location.longitude,
                imageUrl: place.images.thumbnail.url,
                type: markerTypes.instagram
            });

            // add marker to the map view
            self.addMarkerToView( 
                    self.map, location,location.lat(), location.lng() );
            // set the googleMarker parent as the respective location.
            location.googleMarker().parent = location;
            self.locations.push( location );
        }
    };

    // get a list of the instagram places doing the ajax call
    this.getListOfInstagramPlaces = function( ) {
        var url = 'https://api.instagram.com/v1/media/search';
        var lat = 52.2375111;
        var lng = 21.0111977;
        var client = 'ebeaa3a1b977409795c334ba887232f4';
        var distance = 2000;

        // do JSONP call to the instagram api to get the list of locations
        $.ajax({
          method: 'GET',
          url: url,
          dataType: 'jsonp',
          jsonp: 'callback',
          data: { lat: lat, lng: lng, client_id: client, distance: distance }
        })
        .done( this.instagramAPICallback )
        .fail(function( msg ) {
            console.log('could not connect to instagram to get the images.')
        });
    };

    //** Model initialization
    //

    // build the markerType observable Array
    this.markerTypes = ko.observableArray( Object.keys(markerTypes).map(function(key){
        return markerTypes[key];
    }));

    // Initialize the model locations
    this.initilizeLocations = function( ) {
        // add the default locations to the map
        this.addLocationsToMap( defaultLocations );

        // get google places from the API.
        this.getListOfGooglePlaces( );

        // get google places from the Instagram API
        this.getListOfInstagramPlaces( );
    }

    //** Map loading validation
    //

    this.mapTimeout = function( ) { 

            setTimeout(function(  ) {
                if( typeof( google ) == 'undefined' ) {
                    self.warningMessageVisible( true );    
                }
            }, 5000 );
    }();

}