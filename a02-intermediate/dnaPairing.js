/*Name: DNA Pairing
Link: https://www.freecodecamp.com/challenges/dna-pairing

Description:
- The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.
- Base pairs are a pair of AT and CG. Match the missing element to the provided character.
- Return the provided character as the first element in each array.
- For example, for the input GCG, return [["G", "C"], ["C","G"],["G", "C"]]
- The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

Hints:
https://en.wikipedia.org/wiki/Base_pair
Array.prototype.push()
String.prototype.split()
*/


function pairElement(str) {
  var result = [];
  //for easier pairing
  var pairRef = {
    "A": "T",
    "T": "A",
    "C": "G",
    "G": "C"
  };
  //looping though str
  for (var i=0; i<str.length; i++) {
    var currentChar = str.charAt(i);
    //and pushing arr of current char and corresponding pair into result arr
    result.push([currentChar, pairRef[currentChar]]);
  }
  return result;
}

//TEST
//pairElement("ATCGA"); //[["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]
