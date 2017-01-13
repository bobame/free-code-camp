/*Name: Search and Replace
Link: https://www.freecodecamp.com/challenges/search-and-replace

Description:
- Perform a search and replace on the sentence using the arguments provided and return the new sentence.
- First argument is the sentence to perform the search and replace on.
- Second argument is the word that you will be replacing (before).
- Third argument is what you will be replacing the second argument with (after).

NOTE: Preserve the case of the original word when you are replacing it. For example if you mean to replace the word "Book" with the word "dog", it should be replaced as "Dog"

Hints:
Array.prototype.splice()
String.prototype.replace()
Array.prototype.join()
*/


function myReplace(str, before, after) {
  //if before is title-cased
  if (before.charAt(0) === before.charAt(0).toUpperCase()) {
    //uppercase() first char of after
    var titleCased = after.charAt(0).toUpperCase();
    //split to set up for splice
    var afterArr = after.split("");
    //splice(index, count, replaceContent)
    afterArr.splice(0, 1, titleCased);
    
    //join back into string to pass in replace expression
    after = afterArr.join("");
  }

  //workaround since cannot directly incude variable inside /LITERAL/g
  //http://stackoverflow.com/a/494046
  var re = new RegExp(before, "g");
  return str.replace(re, after);
}

//TEST
myReplace("Let us get back to more Coding", "Coding", "algorithms");
