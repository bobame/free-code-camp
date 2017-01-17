/*Name: Arguments Optional
Link: https://www.freecodecamp.com/challenges/arguments-optional

Description:
- Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.
- For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.
- Calling this returned function with a single argument will then return the sum:
  > var sumTwoAnd = addTogether(2);
  > sumTwoAnd(3) returns 5.
- If either argument isn't a valid number, return undefined.

Hints:
Closures, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
Arguments object, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
*/


function addTogether() {
  //getting arguments into array
  var args = Array.prototype.slice.call(arguments);
  //function to check if any non-number in array
  function anyNonNumber(arr) {
    return arr.filter(function(val){
      return typeof val !== "number";
    });
  }
  //function to get sum of all numbers in array
  function getSum(arr) {
    return arr.reduce(function(a, b){
      return a + b;
    });
  }
  //if array contains any non-number then returning undefined
  if (anyNonNumber(args).length > 0) {
    return undefined;
  }
  //if all numbers && array contains at least 2 numbers, returns its sum
  else if (args.length > 1) {
    return getSum(args);
  }
  //otherwise returns another function
  else {
    return function(nextArg){
      //if new argument is non-number, then returns undefined
      if (typeof nextArg !== "number") {
        return undefined;
      } else {
      //otherwise returns sum of current and next arguments
        var currentArg = args[0];
        return currentArg + nextArg;
      }
    };
  }

}

//TEST
addTogether(2, 3); //5
addTogether(2)(3); //5
addTogether("http://bit.ly/IqT6zt"); //undefined
addTogether(2, "3"); //undefined
addTogether(2)([3]); //undefined
