/*Name: Pairwise
Link: https://www.freecodecamp.com/challenges/pairwise

Description:
- Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.
- If multiple pairs are possible that have the same numeric elements but different indices, return the smallest sum of indices. Once an element has been used, it cannot be reused to pair with another.

Example:
For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.

Index	0	1	2	3	4
Value	7	9	11	13	15
Below we'll take their corresponding indices and add them.

7 + 13 = 20 → Indices 0 + 3 = 3
9 + 11 = 20 → Indices 1 + 2 = 3
3 + 3 = 6 → Return 6
*/

function pairwise(arr, arg) {
  var targetSum = arg;
  var sourceArr = arr;
  var remainingIndices = [];
  var eligibleIndexPairs = [];
  var indiceSum = 0;
  for (var i=0; i<sourceArr.length; i++) remainingIndices.push(i);

  //PART-1: getting eligible index pairs
  for (var j=0; j<sourceArr.length; j++) {
    var currentVal = sourceArr[j];
    var compareVal;
    for (var k=0; k<sourceArr.length; k++) {
      //pushing pair if sum of values === targeSum and not duplicating/adding to itself
      if (j !== k && ( sourceArr[j]+sourceArr[k]===targetSum )) {
        compareVal = sourceArr[k];
        eligibleIndexPairs.push([j, k]);
      }
    }
  }
  console.log("\neligibleIndexPairs -> " + eligibleIndexPairs + " (" + eligibleIndexPairs.length + ")");

  //PART-2: sort eligible pairs by its sum (indices)
  eligibleIndexPairs.sort(function(a, b){
    a = a[0] + a[1];
    b = b[0] + b[1];
    return a - b;
  });
  console.log("eligibleIndexPairs -> " + eligibleIndexPairs + " (sorted)");

  //PART-3: get sum of indices
  for (var r=0; r<eligibleIndexPairs.length; r++) {
    var firstPart = eligibleIndexPairs[r][0];
    var secondPart = eligibleIndexPairs[r][1];
    var firstPartAvailable = remainingIndices.indexOf(firstPart) !== -1;
    var secondPartAvailable = remainingIndices.indexOf(secondPart) !== -1;
    var sumPairIndices = firstPart + secondPart;
    //if both indice pairs are still remaining in remainingIndices array
    if (firstPartAvailable && secondPartAvailable) {
      console.log("\nremaining indices -> " + remainingIndices);
      //adding sum of pair indices to indiceSum variable
      indiceSum += sumPairIndices;
      console.log("\tindiceSum is now " + indiceSum);
      //and making sure to remove from remainingIndices array
      remainingIndices.splice(remainingIndices.indexOf(firstPart), 1);
      remainingIndices.splice(remainingIndices.indexOf(secondPart), 1);
      console.log("\tremaining indices -> " + remainingIndices);
    }
  }
  //returning sum total
  return indiceSum;
}

//SAMPLE TEST & CONSOLE OUTPUT
// pairwise([1,4,2,3,0,5], 7);
// eligibleIndexPairs -> 1,3,2,5,3,1,5,2 (4)
// eligibleIndexPairs -> 1,3,3,1,2,5,5,2 (sorted)
//     remaining indices -> 0,1,2,3,4,5
//         indiceSum is now 4
//         remaining indices -> 0,2,4,5
//     remaining indices -> 0,2,4,5
//         indiceSum is now 11
//         remaining indices -> 0,4
// 11
