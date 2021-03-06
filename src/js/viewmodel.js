// the main ViewModel
var ViewModel = function( definedMarkerTypes ) {
    var self = this;
    var markerTypes = definedMarkerTypes || [];
    var bouncingMarker = {};

    // reference of the google map object
    self.map = {};

    // reference of the locations object
    self.locations = ko.observableArray( );
    self.warningMessageVisible = ko.observable( false );
    self.warningMessage = ko.observable( 'The map could not be loaded' );
    self.leftPanelIsVisible = ko.observable( true );

    // initialize the current and selected markers with empty objects
    self.temporaryLocation = ko.observable( new Location( { } ) );
    self.selectedLocation = ko.observable( new Location( { } ) );
    // observable to store the filter value of the filtered textbox
    self.filter = ko.observable('');

    //** Map Operations
    //

    // set the loaded map
    self.setMap = function ( map ) {
        self.map = map;
    };

    // get the map
    self.getMap = function ( ) {
        return self.map;
    };

    //** Marker Operations
    //

    // add a new marker to the observable array.
    self.addMarker = function() {

        // name is empty?
        if( self.temporaryLocation().name().trim().length === 0 )
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
    self.removeMarker = function() {
        // hide the infobox
        self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide');
        //remove the marker from the map
        self.selectedLocation().googleMarker().setMap(null);
        // remove the marker from the observable array
        self.locations.remove( self.selectedLocation() );
    };

    // hide infobox of the selected location
    self.hideInfobox = function() {
        self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide');
    };

    // manage the map clicks
    self.mapClick = function( map, event ) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // add a google marker to the map
        self.addMarkerToView(map, self.temporaryLocation(), lat, lng);
        // writes the clicked position in the console
        console.log( "Lat=" + lat + "; Lng=" + lng );
    };

    // add maker to the map
    self.addMarkerToView = function (map, location, lat, lng)
    {
        // is there another marker in the map?
        if( !$.isEmptyObject( location.googleMarker() ) )
        {
            // remove the existing marker
            self.temporaryLocation().googleMarker().setMap(null);
        }

        // set the small pin as the marker image
        var pinImage = 'images/pin_small.png';
        
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
             content: marker.$infobox[0],
            disableAutoPan: false,
            maxWidth: 0,
            // set the infobox position left, top coordinates
            pixelOffset: new google.maps.Size( -170, -180 ),
            zIndex: null,
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };

        // build the infobox with the options
        marker.ib = new InfoBox(myOptions);
        
        // creates the event listener for the marker click. 
        google.maps.event.addListener(marker, 'click', function( event ) {
            self.selectMarker( marker );
        } );
    };

    // select the marker in the map
    self.selectMarker = function( marker ) {
        // removes the hide class from the infobox
        marker.$infobox.removeClass('infobox-hide');
        // set the selected marker to show specific data in the infobox
        // if the marker.parent exists is a saved marker.
        // if not is a temporary marker
        self.selectedLocation( marker.parent || self.temporaryLocation() );
        marker.ib.open(self.map, marker);
        // add bounce animation to the marker
        if (marker.getAnimation() != null && marker !== bouncingMarker ) {
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

        //center the google map
        var mapPosition = new google.maps.LatLng( 
                        marker.getPosition().k  , marker.getPosition().D - 0.01);
        self.map.setCenter( mapPosition );

    };


    // ** Locations methods
    //

    // set the type of the selected marker
    self.setTypeSelectedLocation = function( markerType ) {
        self.selectedLocation().type( markerType );
        self.selectedLocation().googleMarker().setIcon( markerType.url() );
    };

    // select the location    
    self.selectLocation = function( location ) {
        self.selectMarker( location.googleMarker() );

        // hides the left-bar if is in mobile
        if( $('.collapsed').is(':visible') ) {
            $("#wrapper").toggleClass('toggled');
        }
    };

    // add locations array to the locations object
    self.addLocationsToMap = function( locationsArray ) {
        locationsArray.forEach( function (location) {
            self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
            // set the googleMarker parent as the respective location.
            location.googleMarker().parent = location;

            self.locations.push( location );
        } );
    };

    // hides the left panel
    self.toggleLeftPanel = function( ) {
        $("#wrapper").toggleClass('toggled');
        $('.navbar-collapse').collapse('hide');
    };

    // ** Filter methods
    //

    // manage the keypress of the of the filter input
    self.filterKeyPress = function( model, event) {
        self.filter(self.filter() +  String.fromCharCode( event.keyCode ) );
        // send the filter value to the filtering function
        self.filterLocations( self.filter() );
    };

    self.filterKeyEvent = function( model, event ) {
        self.filterLocations( self.filter() );
    };

    // toggle visibility of locations by the filter text
    self.filterLocations = function( text ) {
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
    self.filterLocationsByType = function( type ) { 
        // hide infobox from the selected marker
        if( self.selectedLocation().googleMarker().$infobox ) {
            self.selectedLocation().googleMarker().$infobox.addClass('infobox-hide'); 
        }
        // toggle the visibility of the location comparing the location's name
        // with the input text
        self.locations().forEach( function( location ) {
            if( type.title() === markerTypes.none.title() || 
                                        location.type().title() === type.title() ) {
                location.isVisible( true );
                location.googleMarker().setMap( self.map );
            } 
            else {
                location.isVisible( false );
                // removes marker from the map
                location.googleMarker().setMap( null );
                           
            }
        } );

        // hides the left-bar if is in mobile
        if( $('.collapsed').is(':visible') ) {
            $("#wrapper").toggleClass('toggled');
        }
    };

    //** Google places API methods
    //

    // callback function of the Google API
    self.googleAPICallback = function( results, status ) {
        // the places library is enabled?
        if ( status === google.maps.places.PlacesServiceStatus.OK ) {
            // loop the results and create the locations
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
            
                // set the location properties
                var location = new Location({
                    name: place.name ,
                    lat: place.geometry.location.k,
                    lng: place.geometry.location.D,
                    type: self.getMarkerTypeByGoogle(place.types),
                    metatags: place.types,
                    rating: place.rating || ''
                });

                // add marker to the map view
                self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
                // set the googleMarker parent as the respective location.
                location.googleMarker().parent = location;
                self.locations.push( location );
            }
        }
    };

    // Get the list of google places
    self.getListOfGooglePlaces = function( ) {

        var locationCoordinates = new google.maps.LatLng( 52.2375111 , 21.0111977 );

        var request = {
            location: locationCoordinates,
            radius: '3000',
            types: [ 'restaurant', 'bar', 'cafe', 'movie_theater', 'aquarium' ]
        };

        service = new google.maps.places.PlacesService( self.map );
        // search for the first 20 places
        service.nearbySearch( request, self.googleAPICallback );
    };

    // get marker type from google place type
    self.getMarkerTypeByGoogle = function( types )
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
        } else {
            return markerTypes.none;
        }
    };

    //** Instagram API Methods
    //

    // callback function for the instagram API call.
    self.instagramAPICallback = function( results ) {
        for (var i = 0; i < results.data.length; i++) {
            var place = results.data[i];
            
            // set the location properties
            var location = new Location({
                name: place.location.name || 'No location name',
                lat: place.location.latitude,
                lng: place.location.longitude,
                imageUrl: place.images.thumbnail.url,
                type: markerTypes.instagram,
                metatags: place.tags
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
    self.getListOfInstagramPlaces = function( ) {
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
        .done( self.instagramAPICallback )
        .fail(function( msg ) {
            console.log('could not connect to instagram to get the images.');
        });
    };

    //** Foursquare API Methods

    self.foursquareAPICallback = function( results ) {
        if( results.response.venues ) {
            results.response.venues.forEach( function( venue ) {
                // set the location properties
                var location = new Location({
                    name: venue.name ,
                    lat: venue.location.lat,
                    lng: venue.location.lng,
                    type: markerTypes.foursquare,
                    address: venue.location.formattedAddress[0],
                    phoneNumber: venue.contact.formattedPhone || '',
                    metatags: []
                });

                // add marker to the map view
                self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
                // set the googleMarker parent as the respective location.
                location.googleMarker().parent = location;
                self.locations.push( location );
            } );
        }
    };

    // get a list of the foursquare places doing the ajax call
    self.getListOfFoursquarePlaces = function( ) {
        // variable definition
        var url = 'https://api.foursquare.com/v2/venues/search';
        var client_id = 'ZY2GSR1TAGZQDZQ0TRLIJ52VRCAOM0HWV4DPN413PIHW3RLQ';
        var client_secret = 'PDIFLQS5ETZJN5BQII51145H4BLN2O4TWI2DWKEVWGJXRRYT';
        var ll = '52.2375111,21.0111977';
        var v = '20130815';
        var query = 'restaurant,bar';

        // do JSONP call to the foursquare api to get the list of locations
        $.ajax({
          method: 'GET',
          url: url,
          dataType: 'jsonp',
          jsonp: 'callback',
          data: { 
                    client_id: client_id, 
                    client_secret: client_secret, 
                    ll: ll, 
                    v: v, 
                    query: query 
                }
        })
        .done( self.foursquareAPICallback )
        .fail(function( msg ) {
            console.log('could not connect to foursquare to get locations.');
        });
    };

    //** Last.fm API Methods
    //

    // callback function for the last fm ajax request
    self.lastFMCallback = function( results ) {
        if( results.events.event) {
            results.events.event.forEach( function( event ) {
                // set the location properties
                var location = new Location({
                    name: event.venue.name ,
                    lat: event.venue.location['geo:point']['geo:lat'],
                    lng: event.venue.location['geo:point']['geo:long'],
                    type: markerTypes.lastfm,
                    address: event.venue.location.street,
                    phoneNumber: event.venue.phonenumber || '',
                    metatags: event.tags ? event.tags.tag : []
                });

                // add marker to the map view
                self.addMarkerToView( 
                        self.map, location,location.lat(), location.lng() );
                // set the googleMarker parent as the respective location.
                location.googleMarker().parent = location;
                self.locations.push( location );
            } );
        }
    };

    // ger a list of last fm places doing the ajax call
    self.getListOfLastFMPlaces = function( ) {
        // variable definitions
        var url = 'http://ws.audioscrobbler.com/2.0/';
        var api_key = '70796ff66b59bb96341f7c58d0f8c0ec';
        var method = 'geo.getevents';
        var format = 'json';
        var lat = 52.2375111;
        var lng = 21.0111977;

        // do JSONP call to the Last FM api to get the list of locations
        $.ajax({
          method: 'GET',
          url: url,
          dataType: 'jsonp',
          jsonp: 'callback',
          data: { 
                    api_key: api_key, 
                    method: method, 
                    format: format, 
                    lat: lat, 
                    long: lng 
                }
        })
        .done( self.lastFMCallback )
        .fail(function( msg ) {
            console.log('could not connect to Last.FM to get locations.');
        });
    };

    //** Model initialization
    //

    // build the markerType observable Array
    self.markerTypes = ko.observableArray( Object.keys(markerTypes).map(function(key){
        return markerTypes[key];
    }));

    // Initialize the model locations
    self.initilizeLocations = function( ) {
        // add the default locations to the map
        self.addLocationsToMap( defaultLocations );

        // get google places from the API.
        self.getListOfGooglePlaces( );

        // get instagram photo-places from the Instagram API
        self.getListOfInstagramPlaces( );

        // get foursquare places from the Foursquare API
        self.getListOfFoursquarePlaces( );

        // get last fm event from the LastFM API
        self.getListOfLastFMPlaces( );
    };

    //** About page
    //

    self.showAboutMessage = function() {
        alert('NANODEGREE \nNano-Maps Project 5\n @ismapro 2015');
    };

    //** Map loading validation
    //

    self.mapTimeout = function( ) { 

            setTimeout(function(  ) {
                if( typeof( google ) === 'undefined' ) {
                    self.warningMessageVisible( true );
                    // hides the left-bar
                    if( !$('#wrapper').hasClass('toggled') ) {
                        $("#wrapper").toggleClass('toggled');
                    }
                }
            }, 5000 );
    }();

};