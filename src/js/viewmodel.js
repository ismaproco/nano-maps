// the main ViewModel
var ViewModel = function( markers, markerTypes, map ) {
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

    // initialize the current maker before being saved into the model
    var currentMaker = new Marker( { } );

    this.currentMarker = ko.observable( currentMaker );

    // add a new maker to the observable array.
    this.saveMaker = function() {
        var maker = this.currentMaker();
    };

    // manage the map clicks
    this.mapClick = function( map, event ) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        console.log( "Lat=" + lat + "; Lng=" + lng );
    };

    // manage the markers clicks
    this.markerClick = function( marker, event ) {

    };

    // print information into the console log
    this.writeLog = function(text) {
        console.log(text);
    };

}