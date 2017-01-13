/*Name: Boo who
Link: https://www.freecodecamp.com/challenges/boo-who
Description: Check if a value is classified as a boolean primitive. Return true or false.
Hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
*/


function booWho(bool) {
  //using typeof to check if argument is boolean type
  return typeof bool === "boolean";
}

//TEST
booWho(null); //false
booWho(NaN); //false
booWho({ "a": 1 }); //false
booWho("true"); //false
booWho(false); //true
