// Marker model to show in the map
function Marker( marker )
{
    // set the marker values with observable values
    this.name = ko.observable ( marker.name || '' );
    this.lat = ko.observable ( marker.lat || '' );
    this.lon = ko.observable ( marker.lon || '' );
    this.metaTags = ko.observable ( [] );
    this.links = ko.observable ( [] );
    this.type = ko.observable ( '' );
}

// Starting Markers 

var markers = [
    
]