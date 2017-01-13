/*Name: Missing letters
Link: https://www.freecodecamp.com/challenges/missing-letters

Description:
- Find the missing letter in the passed letter range and return it.
- If all letters are present in the range, return undefined.

Hints:
String.prototype.charCodeAt()
String.fromCharCode()
*/


function fearNotLetter(str) {
  //declaring as string and without assigning to allow "undefined"
  var missing;
  //starting compare code at first index
  var compareCode = str.charCodeAt(0);
  for (var i=0; i<str.length; i++) {
    //if current code matching compare code, incrementing compare code
    if (str.charCodeAt(i) === compareCode) {
      compareCode ++;
      console.log("Compare code is now ++ " + compareCode);
    } else {
      //else breaking loop and assigning current code - 1 to missing
      missing = String.fromCharCode(str.charCodeAt(i)-1);
      break;
    }
  }
  //will return either missing char or "undefined"
  return missing;
}

//TEST
fearNotLetter("abce"); //"d"
// fearNotLetter("abcdefghjklmno"); //"i"
// fearNotLetter("bcd"); //"undefined"
// fearNotLetter("yz"); //"undefined"
