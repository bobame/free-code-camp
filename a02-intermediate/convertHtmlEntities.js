/*Name: Convert HTML Entities
Link: https://www.freecodecamp.com/challenges/convert-html-entities

Description:
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

Hints:
RegExp, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
HTML Entities, https://dev.w3.org/html5/html-author/charref
String.prototype.replace(), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
*/

function convertHTML(str) {
  //creating ref object for easier translation
  var htmlRef = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;"
  };
  //looping through each entity needing translation
  for (var i=0; i<Object.entries(htmlRef).length; i++) {
    //variable to hold entity, the key
    var entity = Object.keys(htmlRef)[i];
    //variable to hold regex, "g" is for global match
    var re = new RegExp(entity, "g");
    //replacing object key with its value
    str = str.replace(re, Object.values(htmlRef)[i]);
  }
  //returning translated str
  return str;
}
