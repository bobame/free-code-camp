## Specifications

see [CodePen](http://codepen.io/gracen/full/pRjgOv/) for completed version


### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/wGqEga/).

**User Stories:**  

1. I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.
2. I can click a button to see a random Wikipedia entry.

**Hints:**

1. Here's a URL you can use to get a random Wikipedia article: https://en.wikipedia.org/wiki/Special:Random
2. Here's an entry on using Wikipedia's API: https://www.mediawiki.org/wiki/API:Main_page
3. Use this [link](https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm) to experiment with Wikipedia's API.


see [instructions](https://www.freecodecamp.com/challenges/build-a-wikipedia-viewer)


## Plan
1. [X] solid color background
2. content
    - random search
        - [X] text indicating random article search
        - [X] click should open random article in new tab
    - user search
        - [X] search icon
        - [X] click on icon toggles textfield
        - [X] click on textfield "X" toggles back icon
    - [X] text instructing click icon to search
3. functionality
    - [X] mimic click on SEARCH button for keypress on ENTER
    - [X] throw alert for search click with null input
    - [X] default pointer to input field
    - [X] new result list per search, clear old
    - [X] no results alert
    - [X] clear input field after click on close
    - [X] scrolls to result after valid search
    - autocomplete?
        - [X] get it working
        - [X] style autocomplete results
        - [X] remove active item text in upper left
        - [X] on enter press trigger click event (first click closes list, 2nd click triggers search)


## Note

- thanks to Herman S. and [Coding Tutorials 360](https://www.youtube.com/channel/UC5Wi_NYysX-LfcqT3Hq9Faw)
- color scheme from [Paletton](http://paletton.com/#uid=14J0u0kllllaFw0g0qFqFg0w0aF)
- creating DOM elements [w3schools](http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_anchor_create)
- [opensearch api](https://www.mediawiki.org/wiki/API:Opensearch)
- [endpoint](https://www.mediawiki.org/wiki/API:Main_page#The_endpoint)
- [HTML5 dropdown](https://helgesverre.com/blog/textbox-dropdown-html5/)
- [cdn for autocomplete](https://cdnjs.com/libraries/jqueryui) (ending /jquery-ui.min.js)
- [autocomplete example](http://w3lessons.info/2015/03/01/autocomplete-search-using-wikipedia-api-and-jquery-ui/)
- look into vertical center-aligning
- cors workaround using crossoriginme [here](https://crossorigin.me/)
- axios documentation and simple example [here](https://www.npmjs.com/package/axios)
