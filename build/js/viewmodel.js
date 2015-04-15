var ViewModel=function(markerTypes){var self=this;var markerTypes=markerTypes||[];var bouncingMarker={};this.map={};this.locations=ko.observableArray();this.warningMessageVisible=ko.observable(false);this.warningMessage=ko.observable("The map could not be loaded");this.leftPanelIsVisible=ko.observable(true);this.temporaryLocation=ko.observable(new Location({}));this.selectedLocation=ko.observable(new Location({}));this.filter=ko.observable("");this.setMap=function(map){self.map=map};this.getMap=function(){return self.map};this.addMarker=function(){if(self.temporaryLocation().name().trim().length==0){self.temporaryLocation().name("no name")}self.temporaryLocation().googleMarker().$infobox.addClass("infobox-hide");self.temporaryLocation().googleMarker().parent=self.temporaryLocation();self.locations.push(self.temporaryLocation().googleMarker().parent);self.temporaryLocation(new Location({}))};this.removeMarker=function(){self.selectedLocation().googleMarker().$infobox.addClass("infobox-hide");self.selectedLocation().googleMarker().setMap(null);self.locations.remove(self.selectedLocation())};this.hideInfobox=function(){self.selectedLocation().googleMarker().$infobox.addClass("infobox-hide")};this.mapClick=function(map,event){var lat=event.latLng.lat();var lng=event.latLng.lng();self.addMarkerToView(map,self.temporaryLocation(),lat,lng);console.log("Lat="+lat+"; Lng="+lng)};this.addMarkerToView=function(map,location,lat,lng){if(!$.isEmptyObject(location.googleMarker())){self.temporaryLocation().googleMarker().setMap(null)}var pinImage="images/pin_small.png";location.lat(lat);location.lng(lng);var pinIcon=new google.maps.MarkerImage(location.type().url(),null,null,null,new google.maps.Size(42,42));var shape={coords:[10,10,10,35,35,35,35,10],type:"poly"};var marker=new google.maps.Marker({position:new google.maps.LatLng(lat,lng),map:map,icon:pinIcon,title:location.name(),animation:google.maps.Animation.DROP,shape:shape});location.googleMarker(marker);marker.$infobox=$(".infobox-inner");marker.$infobox.addClass("infobox-hide");var myOptions={content:marker.$infobox[0],disableAutoPan:false,maxWidth:0,pixelOffset:new google.maps.Size(-170,-180),zIndex:null,infoBoxClearance:new google.maps.Size(1,1),isHidden:false,pane:"floatPane",enableEventPropagation:false};marker.ib=new InfoBox(myOptions);google.maps.event.addListener(marker,"click",function(event){self.selectMarker(marker)})};this.selectMarker=function(marker){marker.$infobox.removeClass("infobox-hide");self.selectedLocation(marker.parent||self.temporaryLocation());marker.ib.open(self.map,marker);if(marker.getAnimation()!=null&&marker!=bouncingMarker){marker.setAnimation(null)}else{if(bouncingMarker.setAnimation){bouncingMarker.setAnimation(null)}marker.setAnimation(google.maps.Animation.BOUNCE);bouncingMarker=marker}var mapPosition=new google.maps.LatLng(marker.getPosition().k,marker.getPosition().D-.01);self.map.setCenter(mapPosition)};this.setTypeSelectedLocation=function(markerType){self.selectedLocation().type(markerType);self.selectedLocation().googleMarker().setIcon(markerType.url())};this.selectLocation=function(location){self.selectMarker(location.googleMarker());if($(".collapsed").is(":visible")){$("#wrapper").toggleClass("toggled")}};this.addLocationsToMap=function(locationsArray){locationsArray.forEach(function(location){self.addMarkerToView(self.map,location,location.lat(),location.lng());location.googleMarker().parent=location;self.locations.push(location)})};this.toggleLeftPanel=function(){$("#wrapper").toggleClass("toggled");$(".navbar-collapse").collapse("hide")};this.filterKeyPress=function(model,event){self.filter(self.filter()+String.fromCharCode(event.keyCode));self.filterLocations(self.filter())};this.filterKeyEvent=function(model,event){self.filterLocations(self.filter())};this.filterLocations=function(text){text=text||"";text=text.toLowerCase();if(self.selectedLocation().googleMarker().$infobox){self.selectedLocation().googleMarker().$infobox.addClass("infobox-hide")}self.locations().forEach(function(location){if(location.name().toLowerCase().indexOf(text)>-1){location.isVisible(true);location.googleMarker().setMap(self.map)}else{location.isVisible(false);location.googleMarker().setMap(null)}})};this.filterLocationsByType=function(type){if(self.selectedLocation().googleMarker().$infobox){self.selectedLocation().googleMarker().$infobox.addClass("infobox-hide")}self.locations().forEach(function(location){if(type.title()==markerTypes.none.title()||location.type().title()==type.title()){location.isVisible(true);location.googleMarker().setMap(self.map)}else{location.isVisible(false);location.googleMarker().setMap(null)}});if($(".collapsed").is(":visible")){$("#wrapper").toggleClass("toggled")}};this.googleAPICallback=function(results,status){if(status==google.maps.places.PlacesServiceStatus.OK){for(var i=0;i<results.length;i++){var place=results[i];var location=new Location({name:place.name,lat:place.geometry.location.k,lng:place.geometry.location.D,type:self.getMarkerTypeByGoogle(place.types),metatags:place.types,rating:place.rating||""});self.addMarkerToView(self.map,location,location.lat(),location.lng());location.googleMarker().parent=location;self.locations.push(location)}}};this.getListOfGooglePlaces=function(){var locationCoordinates=new google.maps.LatLng(52.2375111,21.0111977);var request={location:locationCoordinates,radius:"3000",types:["restaurant","bar","cafe","movie_theater","aquarium"]};service=new google.maps.places.PlacesService(self.map);service.nearbySearch(request,this.googleAPICallback)};this.getMarkerTypeByGoogle=function(types){if(_.contains(types,"restaurant")){return markerTypes.restaurant}else if(_.contains(types,"cafe")){return markerTypes.coffee}else if(_.contains(types,"bar")){return markerTypes.bar}else if(_.contains(types,"movie_theater")){return markerTypes.movies}else{return markerTypes.none}};this.instagramAPICallback=function(results){for(var i=0;i<results.data.length;i++){var place=results.data[i];var location=new Location({name:place.location.name||"No location name",lat:place.location.latitude,lng:place.location.longitude,imageUrl:place.images.thumbnail.url,type:markerTypes.instagram,metatags:place.tags});self.addMarkerToView(self.map,location,location.lat(),location.lng());location.googleMarker().parent=location;self.locations.push(location)}};this.getListOfInstagramPlaces=function(){var url="https://api.instagram.com/v1/media/search";var lat=52.2375111;var lng=21.0111977;var client="ebeaa3a1b977409795c334ba887232f4";var distance=2e3;$.ajax({method:"GET",url:url,dataType:"jsonp",jsonp:"callback",data:{lat:lat,lng:lng,client_id:client,distance:distance}}).done(this.instagramAPICallback).fail(function(msg){console.log("could not connect to instagram to get the images.")})};this.foursquareAPICallback=function(results){if(results.response.venues){results.response.venues.forEach(function(venue){var location=new Location({name:venue.name,lat:venue.location.lat,lng:venue.location.lng,type:markerTypes.foursquare,address:venue.location.formattedAddress[0],phoneNumber:venue.contact.formattedPhone||"",metatags:[]});self.addMarkerToView(self.map,location,location.lat(),location.lng());location.googleMarker().parent=location;self.locations.push(location)})}};this.getListOfFoursquarePlaces=function(){var url="https://api.foursquare.com/v2/venues/search";var client_id="ZY2GSR1TAGZQDZQ0TRLIJ52VRCAOM0HWV4DPN413PIHW3RLQ";var client_secret="PDIFLQS5ETZJN5BQII51145H4BLN2O4TWI2DWKEVWGJXRRYT";var ll="52.2375111,21.0111977";var v="20130815";var query="restaurant,bar";$.ajax({method:"GET",url:url,dataType:"jsonp",jsonp:"callback",data:{client_id:client_id,client_secret:client_secret,ll:ll,v:v,query:query}}).done(this.foursquareAPICallback).fail(function(msg){console.log("could not connect to foursquare to get locations.")})};this.lastFMCallback=function(results){if(results.events.event){results.events.event.forEach(function(event){var location=new Location({name:event.venue.name,lat:event.venue.location["geo:point"]["geo:lat"],lng:event.venue.location["geo:point"]["geo:long"],type:markerTypes.lastfm,address:event.venue.location.street,phoneNumber:event.venue.phonenumber||"",metatags:event.tags?event.tags.tag:[]});self.addMarkerToView(self.map,location,location.lat(),location.lng());location.googleMarker().parent=location;self.locations.push(location)})}};this.getListOfLastFMPlaces=function(){var url="http://ws.audioscrobbler.com/2.0/";var api_key="70796ff66b59bb96341f7c58d0f8c0ec";var method="geo.getevents";var format="json";var lat=52.2375111;var lng=21.0111977;$.ajax({method:"GET",url:url,dataType:"jsonp",jsonp:"callback",data:{api_key:api_key,method:method,format:format,lat:lat,"long":lng}}).done(this.lastFMCallback).fail(function(msg){console.log("could not connect to Last.FM to get locations.")})};this.markerTypes=ko.observableArray(Object.keys(markerTypes).map(function(key){return markerTypes[key]}));this.initilizeLocations=function(){this.addLocationsToMap(defaultLocations);this.getListOfGooglePlaces();this.getListOfInstagramPlaces();this.getListOfFoursquarePlaces();this.getListOfLastFMPlaces()};this.showAboutMessage=function(){alert("NANODEGREE \nNano-Maps Project 5\n @ismapro 2015")};this.mapTimeout=function(){setTimeout(function(){if(typeof google=="undefined"){self.warningMessageVisible(true);if(!$("#wrapper").hasClass("toggled")){$("#wrapper").toggleClass("toggled")}}},5e3)}()};