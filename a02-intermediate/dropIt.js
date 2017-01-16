/*Name: Drop it
Link: https://www.freecodecamp.com/challenges/drop-it

Description:
- Drop the elements of an array (first argument), starting from the front, until the predicate (second argument) returns true.
- The second argument, func, is a function you'll use to test the first elements of the array to decide if you should drop it or not.
- Return the rest of the array, otherwise return an empty array.

Hints:
Arguments object
Array.prototype.shift()
Array.prototype.slice()
*/


function dropElements(arr, func) {
  //starting with emty result array
  var result = [];
  for (var i=0; i<arr.length; i++) {
    //if array contains element passing func
    if (func(arr[i])) {
      //then assigning array from passing element until end to result
      result = arr.slice(i, arr.length);
      //breakig loop
      break;
    }
  }
  return result;
}

//TEST
//dropElements([1, 2, 3], function(n) {return n < 3; });
