# nano-maps

Development Process 
-------------------


- The first step was to decide the libraries that are going to be used along with this project, in my first draft the required libraries are:
 - bower: Dependency grabber to manage the javascript libraries.
 - jquery: Framework for dom manipulation and util ajax functions.
 - knockoutJS: MVVM framework for the application.
 - underscore: For JavaScript utility methods.
 - bootstrap: Framework for response development.

- Then I try to implement a basic HTML mockup page using bootstrap, for this I made a heavy use of the bootstrap documentation, specially to implement the header navigation bar, and the columns layout of the page.

- Then I try to add the google map to the page, again I had to go to the google map api to know how to add the map to the project. In this part I create a api secret to be able to load the map in the page.

- Then I start to look experiment with the google map object to center the map in the location that I want to use for the neighborhood in the application, this was done changing the latitude and longitude coordinates of the google map object and increasing the zoom value.

- Then I added the basic file structure to start using KnockoutJS, for this I used the "Getting Started" Guide of the knockoutJS page, with that in place and the knowledge gathered through the JavaScript Pattern course I created the basic scripts for the (models and ViewModels).

- With the folder structure defined and the files in place, I created the Gruntfile.js to created a realease build using grunt.

- To add the map to the page I follow the basic example of the google maps api documentations, was just matter of add some custom code to the app.js to select the map element and the maps API do the loading.

- With the map in full screen, some locations were shown by default like hotels and restaurants I wanted to hide them, because that was part of the project, I found this handy solution on StackOverflow
http://stackoverflow.com/questions/7396722/hide-local-listings-from-google-maps-api

- Then I was thinking about the best possible way to separate the google maps methods and the application information, in this way the MVVM pattern will be applied, was quite hard to this because many maps methods are things that I consider part of the ViewModel, but after try and error, I approach for a better solution that is to use the google maps methods as a View in my ViewModel, so events and references will be linked to the ViewModel and not part of it.

- I try to implement a menu to control when a marker was added in the map, but I wanted to do it inside the map, above the marker so it will work as a map element, I found a library of google that overrides the default infobox and allows to add custom styling and HTML. Using the new library I create a custom Infobox for the map with the HTML menu of marker type.

- After testing the infobox I realize i was breaking the in some way the MVVM pattern in the way I was interacting with the menu, so I start to create a HTML template for the menu, and manage of operations from the knockoutJS library.

- Using knockout flow control components I was able to link the infobox elements to a selected observable object, in this way the changes inside elements are viewed in the model.

- Added the possibility of having multiple markers in one map with different types and icons.

- Is needed a better way to implement the marker management is better that every click add a new marker, or that the position change with every click, I need to evaluate a better UX.

- The images didn't look clear in the map so I added a shadow to them.

- Using the Knockout observable array of location, I implemented a UL list of binded items, using the knockout data-bind expression in the html was very helpful, because no custom hiding/showing logic was needed in the ViewModel, so the elements in the list were in sync with the map markers.

- I use the locations list model to prepoluate the map with custom markers, the list of markers.

- I was designing the marker filtered list and I decide to use the same HTML to show the marker types that are part of the infobox, but they have another click event in them, so the selected marker type will filter only by type.

- Using the knockout observable properties I was able to show and hide markers and list items adding a isVisible property in the location model, and creating some custom logic to filter the items with the text input.

- With the adding of the filtering I had some visual bugs were the infobox keep showing, It took me some time to solve this bugs, but once they get complete the project is now fully functional withouth the adding of any external API.

- I try to implement the google maps places library in the project, it was quite easy with the list and the map already working, I used and example from here:
https://developers.google.com/maps/documentation/javascript/places

- Then I had some trouble managing the google searching types options, so I did a quick seach and found this good specification:
https://developers.google.com/places/supported_types

- Trying to implement the Instagram API I found the only way to get results was using the jsonp type property, so the cross-browsing issue will not apply.

- I got a problem setting the instagram images as markers but I found this awesome answer in stackoverflow on how to resize images in runtime.
http://stackoverflow.com/questions/7842730/change-marker-size-in-google-maps-v3



Resources
---------

- Forum post that shows how the application should look, very helpfull to have an idea of what to expect.

https://github.com/udacity/fend-office-hours/tree/master/Javascript%20Design%20Patterns/P5%20Project%20Overview

- I was struggling finiding a good way to implement a header in html that was reponsive, using bootstrap, and I found this awesome description in the bootstrap documentation. 

http://getbootstrap.com/components/#navbar

-  Work around for the mobile menu search clicking behavior

https://github.com/twbs/bootstrap/issues/12852

-  I wanted to make full use of the height of the application, but didn't know how to apply the necessary styling to the application, to do it I found the following answer:

http://stackoverflow.com/questions/485827/css-100-height-with-padding-margin

- use the google maps API to add the map to the page.

https://developers.google.com/maps/documentation/javascript/tutorial

- Getting started Guide of knockoutJS.

http://knockoutjs.com/documentation/introduction.html

- Infobox library that overrides the default infobox control of the maps api.

https://code.google.com/p/google-maps-utility-library-v3/

- Blog post explaining the use of computed observer to filter observedArrays

http://blog.stevensanderson.com/2013/12/03/knockout-projections-a-plugin-for-efficient-observable-array-transformations/
