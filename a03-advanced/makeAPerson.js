/*Name: Make a Person
Link: https://www.freecodecamp.com/challenges/make-a-person

Description:
Fill in the object constructor with the following methods below:
  getFirstName()
  getLastName()
  getFullName()
  setFirstName(first)
  setLastName(last)
  setFullName(firstAndLast)
Run the tests to see the expected output for each method.
The methods that take an argument must accept only one argument and it has to be a string.
These methods must be the only available means of interacting with the object.

Hints:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
*/

var Person = function(firstAndLast) {
  //variable to hold copy of argument
  var fullName = firstAndLast;

  //needing "this" to be recognized as "key", towards Object.keys(bob).length
  this.getFirstName = function() {
    return fullName.split(" ")[0];
  };
  this.getLastName = function() {
    return fullName.split(" ")[1];
  };
  this.getFullName = function() {
    return fullName;
  };
  this.setFirstName = function(first) {
    fullName = first + " " + fullName.split(" ")[1];
  };
  this.setLastName = function(last) {
    fullName = fullName.split(" ")[0] + " " + last;
  };
  this.setFullName = function(firstAndLast) {
    fullName = firstAndLast;
  };
};

//TEST
var bob = new Person('Bob Ross');
bob.getFullName(); //should return "Haskell Ross" after bob.setFirstName("Haskell")
