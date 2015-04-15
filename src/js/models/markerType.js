// Marker Type to show in the infobox menus
function MarkerType( markerType ) {
    // set the attribute of the Model with observable objects
    this.type = ko.observable( markerType.type || '' );
    this.url = ko.observable( markerType.url || '');
    this.title = ko.observable( markerType.title || '');
    this.selection = ko.observable( markerType.selection || 'map' );
}

// Starting Marker Types 

var markerTypes = {
    none: new MarkerType ( 
        { type:'none', url:'images/pin_small.png', title: 'None'} 
    ),
    restaurant: new MarkerType ( 
        { type:'restaurant', url:'images/Apple.png', title: 'Restaurant' } 
    ),
    bar: new MarkerType ( 
        { type:'bar', url:'images/Beer.png', title: 'Bar' } 
    ),
    coffee: new MarkerType ( 
        { type:'coffe', url:'images/Coffecan.png', title: 'Coffee' } 
    ),
    movies: new MarkerType ( 
        { type:'movies', url:'images/Movierollsmall.png', title: 'Movies' } 
    ),
    instagram: new MarkerType ( 
        { type:'picture', url:'images/Compactcam.png', title: 'Instagram', selection: 'none' } 
    ),
    foursquare: new MarkerType ( 
        { type:'foursquare', url:'images/foursquare.png', title: 'Foursquare', selection: 'none' } 
    ),
    lastfm: new MarkerType ( 
        { type:'lastfm', url:'images/Lastfm.png', title: 'LastFM', selection: 'none' } 
    ),
};