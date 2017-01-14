/*Name: Smallest Common Multiple
Link: https://www.freecodecamp.com/challenges/smallest-common-multiple

Description:
- Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.
- The range will be an array of two numbers that will not necessarily be in numerical order.
- e.g. for 1 and 3 - find the smallest common multiple of both 1 and 3 that is evenly divisible by all numbers between 1 and 3.

References:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
*/


function smallestCommons(arr) {
  //assigning min and max to variables
  var sm = Math.min.apply(null, arr);
  var lg = Math.max.apply(null, arr);
  //starting commonMultiple with larger of 2 nums
  var commonMultiple = lg;
  //divides arg by every number between min and max
  function noRemainders(x) {
    var noRemainders = true;
    for (var j=lg; j>=sm; j--) {
      if (x % j !== 0){
        noRemainders = false;
        break;
      }
    }
    //returns true if every modulo returns 0, else false
    return noRemainders;
  }
  //keeps incrementing by larger of 2 nums and rechecks for remainders
  while(!noRemainders(commonMultiple)) {
    commonMultiple += lg;
  }
  return commonMultiple;
}

//TEST
smallestCommons([5, 1]); //60
smallestCommons([1,13]); //360360
smallestCommons([23, 18]); //6056820
