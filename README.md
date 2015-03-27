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


Resources
---------

- I was struggling finiding a good way to implement a header in html that was reponsive, using bootstrap, and I found this awesome description in the bootstrap documentation. 

http://getbootstrap.com/components/#navbar

-  Work around for the mobile menu search clicking behavior

https://github.com/twbs/bootstrap/issues/12852

-  I wanted to make full use of the height of the application, but didn't know how to apply the necessary styling to the application, to do it I found the following answer:

http://stackoverflow.com/questions/485827/css-100-height-with-padding-margin

- use the google maps API to add the map to the page.

https://developers.google.com/maps/documentation/javascript/tutorial

- Getting started Guide of knockoutJS

http://knockoutjs.com/documentation/introduction.html