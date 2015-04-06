var ViewModel=function(markers,markerTypes,map){var self=this;var markers=markers||[];var markerTypes=markerTypes||[];this.markerTypes=ko.observableArray(markerTypes);this.map=map;this.markers=ko.observableArray(markers.map(function(marker){return marker}));this.currentMarker=ko.observable(new Marker({}));this.selectedMarker=ko.observable(new Marker({}));this.addMarker=function(){this.currentMarker().googleMarker().parent=this.currentMarker();this.markers.push(this.currentMarker().googleMarker().parent);this.currentMarker(new Marker({}))};this.removeMarker=function(){this.currentMarker().googleMarker().$infobox.addClass("infobox-hide");this.currentMarker().googleMarker().setMap(null);this.markers.remove(this.currentMarker)};this.mapClick=function(map,event){var lat=event.latLng.lat();var lng=event.latLng.lng();console.log("Lat="+lat+"; Lng="+lng);this.addMarkerToView(map,lat,lng)};this.setTypeSelectedMarker=function(markerType){self.selectedMarker().googleMarker().setIcon(markerType.url())};this.writeLog=function(text){console.log(text)};this.addMarkerToView=function(map,lat,lng){if(!$.isEmptyObject(this.currentMarker().googleMarker())){this.currentMarker().googleMarker().setMap(null)}var pinImage="images/pin_small.png";this.currentMarker().lat(lat);this.currentMarker().lng(lng);this.currentMarker().type(markerTypes.filter(function(markerType){return markerType.type()=="none"})[0]);var marker=new google.maps.Marker({position:new google.maps.LatLng(lat,lng),map:map,icon:this.currentMarker().type().url(),title:this.currentMarker().name()});this.currentMarker().googleMarker(marker);marker.$infobox=$(".infobox-inner");marker.$infobox.addClass("infobox-hide");var myOptions={content:marker.$infobox[0],disableAutoPan:false,maxWidth:0,pixelOffset:new google.maps.Size(-170,-150),zIndex:null,infoBoxClearance:new google.maps.Size(1,1),isHidden:false,pane:"floatPane",enableEventPropagation:false};var ib=new InfoBox(myOptions);google.maps.event.addListener(marker,"click",function(event){marker.$infobox.removeClass("infobox-hide");self.selectedMarker(marker.parent||self.currentMarker());ib.open(map,marker)})}};