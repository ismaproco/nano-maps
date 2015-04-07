// Marker model to show in the map
function Location( marker )
{
    // set the marker values with observable values
    this.name = ko.observable ( marker.name || '' );
    this.lat = ko.observable ( marker.lat || '' );
    this.lng = ko.observable ( marker.lng || '' );
    this.metaTags = ko.observable ( [] );
    this.links = ko.observable ( [] );
    this.type = ko.observable ( marker.type || {} );
    this.googleMarker = ko.observable ( marker.googleMarker || {} );
}

// Starting Markers 

var locations = [
    
]