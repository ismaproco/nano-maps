// Marker Type to show in the infobox menus
function MarkerType( markerType ) {
    // set the attribute of the Model with observable objects
    this.type = ko.observable( markerType.type || '' );
    this.url = ko.observable( markerType.url || '');
    this.title = ko.observable( markerType.title || '');
    this.remote = ko.observable( markerType.remote || '' );
}

// Starting Marker Types 

var markerTypes = {
    none: new MarkerType ( 
        { type:'none', url:'images/pin_small.png', title: 'None' } 
    ),
    restaurant: new MarkerType ( 
        { type:'restaurant', url:'images/Apple.png', title: 'Restaurant' } 
    ),
    bar: new MarkerType ( 
        { type:'bar', url:'images/Beer.png', title: 'Bar' } 
    ),
    coffe: new MarkerType ( 
        { type:'coffe', url:'images/Coffecan.png', title: 'Coffe' } 
    ),
    diving: new MarkerType ( 
        { type:'diving', url:'images/Diving.png', title: 'Diving' } 
    ),
    movies: new MarkerType ( 
        { type:'movies', url:'images/Movierollsmall.png', title: 'Movies' } 
    ),
};