/*Name: Spinal Tap Case
Link: https://www.freecodecamp.com/challenges/spinal-tap-case
Description: Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.

Hints:
RegExp, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
String.prototype.replace(), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
*/


function spinalCase(str) {
  //matches 3 patterns separated with "or" -> "|"
  //starting lowercase -> "[a-z]+"
  //starting w/capital follwed by lowercase -> "[A-Z][a-z]+"
  //starting w/non-letter followed by lowercase -> "[\W][a-z]+"
  var strArr = str.match(/[a-z]+|[A-Z][a-z]+|[\W][a-z]+/g);
      console.log("strArr -> " + strArr);
  //joining string with dash "-" as delimeter
  str = strArr.join("-");
  //replacing any stray whitespaces
  str = str.replace(/[\s]/g, "");
  //replacing redundant dashes with single dash
  str = str.replace(/[-]+/g, "-");
  //return transformed str converted to lowercase
  return str.toLowerCase();
}

//TEST
spinalCase("Teletubbies say Eh-oh"); //teletubbies-say-eh-oh
// spinalCase("thisIsSpinalTap"); //"this-is-spinal-tap"
// spinalCase("AllThe-small Things"); //"all-the-small-things"
// spinalCase("The_Andy_Griffith_Show"); //"the-andy-griffith-show"
