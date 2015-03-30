// Marker Type to show in the infobox menus
function MarkerType( markerType ) {
    // set the attribute of the Model with observable objects
    this.type = ko.observable( markerType.type || '' );
    this.url = ko.observable( markerType.url || '');
    this.title = ko.observable( markerType.title || '');
}

// Starting Marker Types 

var markerTypes = [
    new MarkerType ( 
        { type:'restaurant', url:'images/Apple.png', title: 'Restaurant' } 
    ),
    new MarkerType ( 
        { type:'bar', url:'images/Beer.png', title: 'Bar' } 
    ),
    new MarkerType ( 
        { type:'coffe', url:'images/Coffecan.png', title: 'Coffe' } 
    ),
    new MarkerType ( 
        { type:'diving', url:'images/Diving.png', title: 'Diving' } 
    ),
    new MarkerType ( 
        { type:'romance', url:'images/Hearts.png', title: 'Romance' } 
    ),
    new MarkerType ( 
        { type:'movies', url:'images/movierollsmall.png', title: 'Movies' } 
    ),
];