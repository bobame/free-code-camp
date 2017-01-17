/*Name: Record Collection
Link: https://www.freecodecamp.com/challenges/record-collection

Description:
- You are given a JSON object representing a part of your musical album collection. Each album has several properties and a unique id number as its key. Not all albums have complete information.
- Write a function which takes an album's id (like 2548), a property prop (like "artist" or "tracks"), and a value (like "Addicted to Love") to modify the data in this collection.
- Your function must always return the entire collection object.

Specs:
- If prop isn't "tracks" and value isn't empty (""), update or set the value for that record album's property.
- If prop is "tracks" but the album doesn't have a "tracks" property, create an empty array before adding the new value to the album's corresponding property.
- If prop is "tracks" and value isn't empty (""), push the value onto the end of the album's existing tracks array.
- If value is empty (""), delete the given prop property from the album.
*/

// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [
        "Let It Rock",
        "You Give Love a Bad Name"
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [
        "1999",
        "Little Red Corvette"
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

function updateRecords(id, prop, value) {
  //1. if prop not "tracks" && value not empty
  //   setting value for given property
  if (prop !== "tracks" && value.length > 0) {
    collection[id][prop] = value;
  }
  //2. if prop is "tracks" and no "tracks" property in album
  //   creating array and pushing given value
  else if (prop === "tracks" && Object.keys(collection[id]).indexOf(prop) === -1) {
    collection[id][prop] = [];
    collection[id][prop].push(value);
  }
  //3. if prop is "tracks" and value isn't empty
  //   pushing given value to end of tracks array
  else if (prop === "tracks" && value.length > 0) {
    collection[id][prop].push(value);
  }
  //4. if value is empty
  //   deleting property from collection
  else {
    delete collection[id][prop];
  }
  return collection;
}
