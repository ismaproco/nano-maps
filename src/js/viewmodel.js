// the main ViewModel
var ViewModel = function( makers, map ) {
    makers = makers || [];
    
    //reference of the google map object
    this.map = map;

    // map the makers, and create an observable array with them
    this.makers = ko.observableArray( makers.map( function ( maker ) {
       return new Maker();
    } ) );

    // initialize the current maker before being saved into the model
    this.currentMaker = ko.observable();

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