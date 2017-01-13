/*Name: Diff Two Arrays
Link: https://www.freecodecamp.com/challenges/diff-two-arrays

Description:
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.

Hints:
Comparison Operators
Array.prototype.slice()
Array.prototype.filter()
Array.prototype.indexOf()
Array.prototype.concat()
*/

function diffArray(arr1, arr2) {
  //filter() & indexOf() - for arr1 not in arr2
  var arr1NotInArr2 = arr1.filter(function(val){
    return arr2.indexOf(val) === -1;
  });
  //filter() & indexOf() - for arr2 not in arr1
  var arr2NotInArr1 = arr2.filter(function(val){
    return arr1.indexOf(val) === -1;
  });
  //concat() to combine filtered arrays
  return arr1NotInArr2.concat(arr2NotInArr1);
}
