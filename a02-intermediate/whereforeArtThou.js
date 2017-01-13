/*Name: Wherefore art thou
Link: https://www.freecodecamp.com/challenges/wherefore-art-thou

Description:
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching property and value pairs (second argument). Each property and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

Hint:
Global Object
Object.prototype.hasOwnProperty()
Object.keys()
*/

function whatIsInAName(collection, source) {
  var result = [];
  //loop through each object in collection
  for (var i=0; i<collection.length; i++) {
    //variable to track if collection object containing ALL OF/EVERY source key-val
    var sourceVerified = true;
    //loop through each source key-val
    for (var j=0; j<Object.entries(source).length; j++) {
      //source variables for easier readability
      var sourceKey = Object.keys(source)[j];
      var sourceVal = Object.values(source)[j];
      //required conditions in variables for easier readability
      var hasKey = collection[i].hasOwnProperty(sourceKey);
      var matchesVal = collection[i][sourceKey] === sourceVal;
      //if at any point not both conditions are met, then sourceVerified set to false
      if (!(hasKey && matchesVal)) {
        sourceVerified=false;
      }
    }
    //if sourceVerified remains true then pushing collection object into result arr
    if (sourceVerified) {
      result.push(collection[i]);
    }
  }

  //TESTING
  //console.log(JSON.stringify(result));

  return result;
}


//TEST
/**************************************************/
whatIsInAName([
                { first: "Romeo", last: "Montague" },
                { first: "Mercutio", last: null },
                { first: "Tybalt", last: "Capulet" }
              ],
              { last: "Capulet" });
//[{ first: "Tybalt", last: "Capulet" }]


whatIsInAName([
                { "a": 1 },
                { "a": 1 },
                { "a": 1, "b": 2 }
              ],
              { "a": 1 });
//[{ "a": 1 }, { "a": 1 }, { "a": 1, "b": 2 }]

whatIsInAName([
                { "a": 1, "b": 2 },
                { "a": 1 },
                { "a": 1, "b": 2, "c": 2 }
              ],
              { "a": 1, "b": 2 });
//[{ "a": 1, "b": 2 }, { "a": 1, "b": 2, "c": 2 }]

whatIsInAName([
                { "a": 1, "b": 2 },
                { "a": 1 },
                { "a": 1, "b": 2, "c": 2 }
              ],
              { "a": 1, "c": 2 });
//[{ "a": 1, "b": 2, "c": 2 }]
