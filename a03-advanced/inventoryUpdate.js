/*Name: Inventory Update
Link: https://www.freecodecamp.com/challenges/inventory-update

Description:
Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery. Update the current existing inventory item quantities (in arr1). If an item cannot be found, add the new item and quantity into the inventory array. The returned inventory array should be in alphabetical order by item.

Hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
*/

function updateInventory(arr1, arr2) {
  //declaring new objects for each array
  var currentInventory = {};
  var newInventory = {};
  //adding current inventory array data into object for easier accessing
  for (var i=0; i<arr1.length; i++) {
    var currentItem = Object.values(arr1)[i][1];
    var currentValue = Object.values(arr1)[i][0];
    currentInventory[currentItem] = currentValue;
  }
  //adding new inventory array data into object for easier accessing
  for (var j=0; j<arr2.length; j++) {
    var newItem = Object.values(arr2)[j][1];
    var newValue = Object.values(arr2)[j][0];
    newInventory[newItem] = newValue;
  }
  //checking each new inventory data with current inventory data
  for (var k=0; k<Object.keys(newInventory).length; k++) {
    //vars just for readability
    var updateItem = Object.keys(newInventory)[k];
    var updateValue = Object.values(newInventory)[k];
    var newItemExists = Object.keys(currentInventory).indexOf(updateItem) !== -1;
    //if new item not in current inventory, adds new prop-val into current inventory object
    if (!newItemExists) {
      currentInventory[updateItem] = updateValue;
    }
    //otherwise accesses property and increments current value with new value
    else {
      currentInventory[updateItem] += updateValue;
    }
  }
  //need to return alphabetically sorted updated inventory array
  var orderRef = Object.keys(currentInventory).sort();
  var orderedArr = [];
  //using orderedRef to push data into final array in alphabetical order
  for (var r=0; r<orderRef.length; r++) {
    orderedArr.push([currentInventory[orderRef[r]], orderRef[r]]);
  }
  //returining ordered final array
  return orderedArr;
}

//TEST
updateInventory([[0, "Bowling Ball"], [0, "Dirty Sock"], [0, "Hair Pin"], [0, "Microphone"]], [[1, "Hair Pin"], [1, "Half-Eaten Apple"], [1, "Bowling Ball"], [1, "Toothpaste"]]);
//should return [[1, "Bowling Ball"], [0, "Dirty Sock"], [1, "Hair Pin"], [1, "Half-Eaten Apple"], [0, "Microphone"], [1, "Toothpaste"]]
