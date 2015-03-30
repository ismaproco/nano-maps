// Marker model to show in the map

function Marker( name, lat, lon )
{
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.metaTags = [];
    this.links = [];
    this.type = '';
}