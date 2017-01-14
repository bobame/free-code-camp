/*Name: Finders Keepers
Link: https://www.freecodecamp.com/challenges/finders-keepers

Description: Create a function that looks through an array (first argument) and returns the first element in the array that passes a truth test (second argument).

Hint: Array.prototype.filter()
*/


function findElement(arr, func) {
  //using filter to apply arg-func on arg-arr
  var filtered = arr.filter(func);
  //returning 1st element passing truth test
  return arr.filter(func)[0];
}

//TEST
findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; }); //2
findElement([1, 3, 5, 8, 9, 10], function(num) { return num % 2 === 0; }); //8
findElement([1, 3, 5, 9], function(num) { return num % 2 === 0; }); //undefined
