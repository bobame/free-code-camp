## Specifications

- see [CodePen](http://codepen.io/gracen/full/ggyejz/) for completed version

### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/freeCodeCamp/full/JXrLLE).


**User Stories:**  

1. [X] I can type GitHub-flavored Markdown into a text area.
2. [X] I can see a preview of the output of my markdown that is updated as I type.
3. [X] Must use Sass.
4. [X] Must use React.

**Hints:**

1. [X] You don't need to interpret Markdown yourself - you can import the Marked library for this: https://cdnjs.com/libraries/marked
2. [X] If you want to use the React JSX syntax, you need to enable 'Babel' as a preprocessor

see [instructions](https://www.freecodecamp.com/challenges/build-a-markdown-previewer)


## Note

- Sass guide [tutorialspoint](https://www.tutorialspoint.com/sass/sass_syntax.htm)
- Sass basics [treehouse](https://teamtreehouse.com/library/sass-basics/)
- Modernizr [cdn](https://cdnjs.com/libraries/modernizr), used [this](https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js)
- Sass guide [sass-lang guide](http://sass-lang.com/guide)
- Meyer Web reset, [documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html) [css](http://meyerweb.com/eric/tools/css/reset/reset200802.css)
- Compass [here](http://compass-style.org/)
- Bourbon (sudo gem install) [here](http://bourbon.io/)
- React basics [treehouse](https://teamtreehouse.com/library/react-basics)
- Babel [here](https://babeljs.io/)
- Initial learning curve React [starter](https://teamtreehouse.com/community/our-first-application-doesnt-work)
- CLI "apm install react" for Atom [here](https://orktes.github.io/atom-react/)
- XAMPP for CORS errors running locally [here](https://www.apachefriends.org/index.html)
- CLI "python -m SimpleHTTPServer" [here](http://superuser.com/a/878035)
- React on [codeacademy](https://www.codecademy.com/learn/react-101) , **still buggy**
- Facebook React docs [here](https://facebook.github.io/react/docs/dom-elements.html)
- Major starter boost from Mr. Steven Mayeux videos on Youtube [here](https://www.youtube.com/user/MrSteveMayeux/videos)
- CRAZY, quote and code working in older bootstrap 3.3.7 (https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css) but failing with latest 4.0.0 (https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css)
- On the flip side, height consistency and centering lost using 3.3.7 (vs 4.0.0), but better than marked not working for quotes and code
- Fixing with Flex per Ultimate Cheatsheet [here](http://www.sketchingwithcss.com/samplechapter/cheatsheet.html#center)

```
display: flex;
flex-direction: row;
justify-content: center;
align-items: stretch;
```
