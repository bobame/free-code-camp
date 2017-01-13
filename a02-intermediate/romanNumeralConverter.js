/*Name: Roman Numeral Converter
Link: https://www.freecodecamp.com/challenges/roman-numeral-converter
Description: Convert the given number into a roman numeral.

Hints:
http://www.mathsisfun.com/roman-numerals.html
Array.prototype.splice()
Array.prototype.indexOf()
Array.prototype.join()
*/


function convertToRoman(num) {
  //PART-1: basic setup for easier handling
  /**************************************************/
  //to hold roman char translations
  var romanNumArr = [];
  //to hold value and roman char equivalent for easier looping
  var romanNumRef = [
    [1000, "M"],
    [500, "D"],
    [100, "C"],
    [50, "L"],
    [10, "X"],
    [5, "V"],
    [1, "I"]
  ];

  //PART-2: literal translation per romanNumRef array
  /**************************************************/
  for (var i=0; i<romanNumRef.length; i++) {
    //variables for readability
    var compareVal = romanNumRef[i][0];
    var correspondingChar = romanNumRef[i][1];
    var repeat;
    //if current number is greater than comparing val
    if (num >= compareVal) {
      //push divided while number * corresponding char into arr
      repeat = Math.floor(num / compareVal);
      romanNumArr.push(correspondingChar.repeat(repeat));
      //update current num as remainder after above calculation
      num %= compareVal;
    }
  }

  //Part-3: join() then split() for desired format
  /**************************************************/
  //side effect of using repeat() instead for looping
  romanNumArr = romanNumArr.join("").split("");

  //PART-4: handle roman chars repeating 4x
  /**************************************************/
  for (var j=0; j<romanNumRef.length; j++) {
    //using filter() to get count per roman char
    var romanChar = romanNumRef[j][1];
    var count = romanNumArr.filter(function(val){
      return val === romanChar;
      console.log(val);
    }).length;
    console.log(romanNumArr);
    //only if same roman char repeating 4x
    if (count === 4) {
      var arrIndex = romanNumArr.indexOf(romanChar);
      var arrCharB4 = romanNumArr[arrIndex-1];
      var romanCharB4 = romanNumRef[j-1][1];
      //setting up for splice(index, count, content)
      var replaceIndex;
      var replaceCount;
      var replaceWith;
      //if char preceding is also next level char (XXVIIII / ending 9)
      if (arrCharB4 === romanCharB4) {
        replaceIndex = arrIndex - 1;
        replaceCount = 5;
        replaceWith = romanChar + romanNumRef[j-2][1];
        romanNumArr.splice(replaceIndex, replaceCount, replaceWith);
      }
      //if not (XXIIII / ending in 4)
      else {
        replaceIndex = arrIndex;
        replaceCount = 4;
        replaceWith = romanChar + romanNumRef[j-1][1];
        romanNumArr.splice(replaceIndex, replaceCount, replaceWith);
      }
    }
  }

  //hoin() back to return in desired format
  /**************************************************/
  return romanNumArr.join("");
}

//TEST
// convertToRoman(3999);
// convertToRoman(24);
// convertToRoman(1023);
