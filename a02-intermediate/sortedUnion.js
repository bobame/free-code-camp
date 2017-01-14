/*Name: Sorted Union
Link: https://www.freecodecamp.com/challenges/sorted-union

Description:
- Write a function that takes two or more arrays and returns a new array of unique values in the order of the original provided arrays.
- In other words, all values present from all arrays should be included in their original order, but with no duplicates in the final array.
- The unique numbers should be sorted by their original order, but the final array should not be sorted in numerical order.

Hints:
Arguments object, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
Array.prototype.reduce(), https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
*/


function uniteUnique(arr) {
  var result = [];
  //converting arguments object into real array
  var args = Array.prototype.slice.call(arguments);
  //looping through each array in args
  for (var i=0; i<args.length; i++) {
    //looping through each element in array
    for (var j=0; j<args[i].length; j++) {
      //pushing into result if current array element not yet in result
      if (result.indexOf(args[i][j]) === -1) {
        result.push(args[i][j]);
      }
    }
  }
  //returning compiled result
  return result;
}

//TEST
uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]); //[1, 3, 2, 5, 4]
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]); //[1, 3, 2, [5], [4]]
