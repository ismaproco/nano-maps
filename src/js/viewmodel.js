// the main ViewModel
var ViewModel = function( makers ) {
    makers = makers || [];
    // map the makers, and create an observable array with them
    this.makers = ko.observableArray( makers.map( function ( maker ) {
       return new Maker();
    } ) );
}