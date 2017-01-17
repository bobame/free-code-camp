/*Name: Symmetric Difference
Link: https://www.freecodecamp.com/challenges/symmetric-difference
Description: Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.
*/

function sym(args) {
  //get arguments of unknown length
  var arrs = Array.prototype.slice.call(arguments);
  //continue until only 1 array left in arrs
  while (arrs.length > 1) {
    //getting 1st and 2nd array
    var firstArr = arrs[0];
    var nextArr = arrs[1];
    //filtering for values not in each other
    var notInNextArr = firstArr.filter(function(val){
      return nextArr.indexOf(val) === -1;
    });
    var notInFIrstArr = nextArr.filter(function(val){
      return firstArr.indexOf(val) === -1;
    });
    //shit()-ing twice to remove 1st and 2nd array
    arrs.shift();
    arrs.shift();
    //unshift-ing to add combined unique array into arrs
    arrs.unshift(notInNextArr.concat(notInFIrstArr));
  }
  //result is remaining single array in arrs
  var result = arrs[0];
  //needed to remove dups
  ////http://stackoverflow.com/a/39272754
  return result.filter((x,i,a) => a.indexOf(x) == i);
}

//TEST
sym([1, 2, 5], [2, 3, 5], [3, 4, 5]); //[1, 4, 5]
sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]); //3 elements
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3]); //5 elements
sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]); //8 elements
