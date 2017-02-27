## Specifications

see [CodePen](http://codepen.io/gracen/full/MJggGd/) for completed version **UNDER CONVERSION**


### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/NNvBQW/).

see [instructions](https://www.freecodecamp.com/challenges/build-a-tribute-page)


## Plan
1. Select tributary candidate.
2. Make main body container
    - Margin on all sides
    - Add background color within container
    - Outside of container should not be same background color as inside container
3. Make footer
    - Add horizontal line between main body and footer
    - Center align text “Written and coded by <name>”
4. Make container content
    - Section 1 - div with header
        - Add h1 header with candidate name
        - Add smaller supporting header below, with short single line highlighting accomplishment
    - Section 2 - div with image
        - Add large image
        - Add thumbnail describing image
    - Section 3 - div with timeline of candidate’s life
        - Smaller header with title indicating timeline
        - Unordered list of timeline
    - Section 4 - div with quote from another individual regarding candidate
        - Larger quote
        - Smaller citation
    - Section 5 - div with call to action
        - Large text with call to action
        - Link to external website containing more info on candidate

## Plan - REDO using React and Sass
1. [X] extract style elements from html file into Sass variables
2. [X] clear html file into single div with id "app"
3. [X] tackle React
4. [X] create list elements by looping through array within render function
5. [X] ajax CORS solution to get timeline items directly from source (using cors proxy)
6. [] get CORS fix for codepen


## Notes

**Title:** First Lady, Activist, Champion of Human Rights, Astounding Role Model for All

**Image:** Eleanor Roosevelt holding a poster of the Universal Declaration of Human Rights

**Quote:**

> One's philosophy is not best expressed in words; it is expressed in the choices one makes... and the choices we make are ultimately our responsibility.

> Freedom makes a huge requirement of every human being. With freedom comes responsibility. For the person who is unwilling to grow up, the person who does not want to carry his own weight, this is a frightening prospect.

**Link to external site:** https://en.wikipedia.org/wiki/Eleanor_Roosevelt

- jquery and map to get all elements sharing class [here](http://stackoverflow.com/a/16630214)
- modify state array [here](http://stackoverflow.com/a/26254086)
- render text as html [here](http://stackoverflow.com/a/31851195)
- component lifecycle [here](http://busypeoples.github.io/post/react-component-lifecycle/)
