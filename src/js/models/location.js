// Marker model to show in the map
function Location( marker )
{
    // set the marker values with observable values
    this.name = ko.observable ( marker.name || '' );
    this.lat = ko.observable ( marker.lat || '' );
    this.lng = ko.observable ( marker.lng || '' );
    this.metaTags = ko.observable ( [] );
    this.links = ko.observable ( [] );
    // set the default markerType as none
    this.type = ko.observable ( marker.type || markerTypes.none );
    this.googleMarker = ko.observable ( marker.googleMarker || {} );
    this.isVisible = ko.observable(true);
}

// Starting Markers 

var locations = [
    new Location({
        name:'Awesome Fish',
        lat: 52.235474460511696,
        lng: 21.008434295654297,
        type: markerTypes.restaurant
    }),
    new Location({
        name:'Bohemian Rock',
        lat: 52.235474460511696,
        lng: 21.024434295654297,
        type: markerTypes.bar
    }),
    new Location({
        name:'Starbucks',
        lat: 52.225474460511696,
        lng: 20.998434295654297,
        type: markerTypes.coffe
    }),
    new Location({
        name:'iMax Movie',
        lat: 52.245474460511696,
        lng: 21.015434295654297,
        type: markerTypes.movies
    }),
    new Location({
        name:'Pita & Wraps',
        lat: 52.231474460511696,
        lng: 21.018434295654297,
        type: markerTypes.restaurant
    }),
    new Location({
        name:'Dreams Coffe',
        lat: 52.2498460511696,
        lng: 20.99410057067871,
        type: markerTypes.coffe
    }),
    new Location({
        name:'Vortex Bar',
        lat: 52.2394460511696,
        lng: 20.99720057067871,
        type: markerTypes.bar
    }),
    new Location({
        name:'Only Burguers',
        lat: 52.226974460511696,
        lng: 21.039834295654297,
        type: markerTypes.restaurant
    }),
    new Location({
        name:'Vodka and Rum',
        lat: 52.238474460511696,
        lng: 21.024434295654297,
        type: markerTypes.bar
    }),
    new Location({
        name:'Mia\'s Cafe',
        lat: 52.225474460511696,
        lng: 20.978434295654297,
        type: markerTypes.coffe
    }),
    new Location({
        name:'Ticket Master',
        lat: 52.245474460511696,
        lng: 21.015434295654297,
        type: markerTypes.movies
    }),
    new Location({
        name:'Cheese Cakes and Pie\'s',
        lat: 52.221474460511696,
        lng: 21.017434295654297,
        type: markerTypes.restaurant
    }),
    new Location({
        name:'Deep Coffe',
        lat: 52.2468460511696,
        lng: 20.99310057067871,
        type: markerTypes.coffe
    }),
    new Location({
        name:'Austin\'s Bar',
        lat: 52.2384460511696,
        lng: 20.99320057067871,
        type: markerTypes.bar
    }),
    new Location({
        name:'Champagne and Campaign',
        lat: 52.2399460511696,
        lng: 20.98940057067871,
        type: markerTypes.bar
    }),

    new Location({
        name:'Animas Coffe',
        lat: 52.2468460511696,
        lng: 21.02310057067871,
        type: markerTypes.coffe
    }),
    new Location({
        name:'Garbage Place',
        lat: 52.2334460511696,
        lng: 20.99720057067871,
        type: markerTypes.bar
    }),
    new Location({
        name:'Grunchys',
        lat: 52.2369460511696,
        lng: 20.98840057067871,
        type: markerTypes.bar
    }),
]