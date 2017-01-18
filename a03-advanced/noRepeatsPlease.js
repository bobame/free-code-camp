/*Name: No repeats please
Link: https://www.freecodecamp.com/challenges/no-repeats-please

Description:
Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.
*/

function permAlone(str) {
  var strArr = str.split("");               //splitting into arr for easier accessing
  var permArrBuilding = [strArr[0]];        //initializing with first char
  var permArrBuilt = [];                    //to hold processed values to be assigned to final arr
  strArr.shift();                           //making sure to remove processed char

  while (strArr.length > 0) {               //looping until no more chars left to process
    var currentChar = strArr[0];            console.log("\nChar: " + currentChar);

    while (permArrBuilding.length > 0) {    //looping until no more elements left to process
      var currentPerm = permArrBuilding[0]; console.log("\tPerm: " + currentPerm);

      //inserts current char to every element at each index (up to last index, length+1)
      for (var i=0; i<currentPerm.length+1; i++) {
        var newPerm = currentPerm.slice(0, i) + currentChar + currentPerm.slice(i);
        permArrBuilt.push(newPerm);         console.log("\t\tNew: " + newPerm);
      }
      permArrBuilding.shift();              //making sure to remove processed element
    }
    //staging elements processed/empty, now replacing with built elements
    permArrBuilding = permArrBuilt;         console.log("\tPerms: " + permArrBuilding);
    //clearing built elements to set up for new iteration of built elements
    permArrBuilt = [];
    strArr.shift();                         //making sure to remove processed char
  }

  //regex to match repeating chars, //http://stackoverflow.com/a/644724
  //needed to remove "g", http://stackoverflow.com/a/16859795
  var re = /(\w)\1+/;
  var filteredResult = permArrBuilding.filter(function(val){
    return !re.test(val);
  });                                       console.log("Filterd -> " + filteredResult);

  return filteredResult.length;            //returning just the length of filtered arr
}

//TEST
//permAlone('abc'); //easier to understand permutation
//permAlone('aab'); //to test filtering (aab, aab, aba, aba, baa, baa) => (aba, aba)

//still failing
permAlone("abcdefa"); //returns 3600 correctly but failing fcc validation
permAlone("abfdefa"); //returns 2640 correctly but failing fcc validation

//console.log permutation reference
//          Char: b
// VM358:12 	Perm: a
// VM358:17 		New: ba
// VM358:17 		New: ab
// VM358:22 	Perms: ba,ab
// VM358:9  Char: c
// VM358:12 	Perm: ba
// VM358:17 		New: cba
// VM358:17 		New: bca
// VM358:17 		New: bac
// VM358:12 	Perm: ab
// VM358:17 		New: cab
// VM358:17 		New: acb
// VM358:17 		New: abc
// VM358:22 Perms: cba,bca,bac,cab,acb,abc
