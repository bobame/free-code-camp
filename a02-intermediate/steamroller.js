/*Name: Steamroller
Link: https://www.freecodecamp.com/challenges/steamroller
Description: Flatten a nested array. You must account for varying levels of nesting.
Hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
*/

function steamrollArray(arr) {
  //declaring result array
  var result = [];
  //calling function to check "n" number of nesting
  checkEach(arr);
  //loops each array element and either...
  function checkEach(arr) {
    for (var i=0; i<arr.length; i++) {
      if (Array.isArray(arr[i])) {
        //loops into nested array (until no more nested arrays)
        checkEach(arr[i]);
      } else {
        //else pushes non-array element into result array
        result.push(arr[i]);
      }
    }
  }
  return result;
}

//TEST
steamrollArray([1, {}, [3, [[4]]]]); //[1, {}, 3, 4]
steamrollArray([1, [], [3, [[4]]]]); //[1, 3, 4]
steamrollArray([[["a"]], [["b"]]]); //["a", "b"]
