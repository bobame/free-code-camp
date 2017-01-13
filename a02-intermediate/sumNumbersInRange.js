/* Name: Sum All Numbers in a Range
Link: https://www.freecodecamp.com/challenges/sum-all-numbers-in-a-range

Description:
We'll pass you an array of two numbers. Return the sum of those two numbers and all numbers between them. The lowest number will not always come first.

Hints: Math.min(), Math.max(), Array.prototype.reduce()
*/

function sumAll(arr) {
  //Math.min() and Math.max() to to get accurate start and end ranges
  var min = Math.min(arr[0], arr[1]);
  var max = Math.max(arr[0], arr[1]);
  var arrRange = [];
  for (var i=min; i<=max; i++) {
    arrRange.push(i);
  }
  //reduce() as short cut to for looping
  return arrRange.reduce(function(a, b){
    return a + b;
  });
}
