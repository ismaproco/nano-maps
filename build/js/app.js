var viewModel;function initialize(){var mapOptions={center:{lat:52.2375111,lng:21.0111977},zoom:14,disableDefaultUI:true};var map=new google.maps.Map(document.getElementById("map"),mapOptions);var noPoi=[{featureType:"poi",stylers:[{visibility:"off"}]}];map.setOptions({styles:noPoi});map.setOptions({disableDoubleClickZoom:true});viewModel=new ViewModel(locations,markerTypes,map);ko.applyBindings(viewModel);google.maps.event.addListener(map,"click",function(event){viewModel.mapClick(map,event)})}google.maps.event.addDomListener(window,"load",initialize);