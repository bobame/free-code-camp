/*Name: Binary Agents
Link: https://www.freecodecamp.com/challenges/binary-agents

Description:
- Return an English translated sentence of the passed binary string.
- The binary string will be space separated.

Hints:
String.prototype.charCodeAt()
String.fromCharCode()
*/


function binaryAgent(str) {
  //variable to split str and hold final/converted str
  var result = str.split(" ");
  //loop through each binary in split str array
  for (var i=0; i<result.length; i++) {
    //need to convert from binary to decimal
    //http://stackoverflow.com/a/10258846
    var digit = parseInt(result[i], 2);
    //re-assigning binary code with char translation
    result[i] = String.fromCharCode(digit);
  }

  //return result array joined into string format
  return result.join("");
}

//TEST
binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001"); //"I love FreeCodeCamp!"
