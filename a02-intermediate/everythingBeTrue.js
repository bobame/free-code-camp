/*Name: Everything Be True
Link: https://www.freecodecamp.com/challenges/everything-be-true
Description: Check if the predicate (second argument) is truthy on all elements of a collection (first argument).
*/

function truthCheck(collection, pre) {
  for (var i=0; i<collection.length; i++) {
    //check if pre included in object keys
    var keysArr = Object.keys(collection[i]);
    if (keysArr.indexOf(pre) !== -1) {
      var itsVal = collection[i][pre];
      if (itsVal==null || itsVal.length<1) {
        //check if null or length<1
        return false;
      } else {
        //checks if val<1 or val is NaN (if number type)
        if (typeof itsVal==="number") {
          if (itsVal < 1 || isNaN(itsVal)) {
            return false;
          }
        }
      }
    }
    //if pre not in keys then returns false
    else return false;
  }
  //if all checks passing then returns true
  return true;
}

//TEST
truthCheck([{"single": "double"}, {"single": NaN}], "single"); //false
truthCheck([{"single": "double"}, {"single": undefined}], "single"); //false
truthCheck([{"single": ""}, {"single": "double"}], "single"); //false
