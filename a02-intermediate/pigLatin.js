/*Name: Pig Latin
Link: https://www.freecodecamp.com/challenges/pig-latin

Description:
- Translate the provided string to pig latin.
- Pig Latin takes the first consonant (or consonant cluster) of an English word, moves it to the end of the word and suffixes an "ay".
- If a word begins with a vowel you just add "way" to the end.
- Input strings are guaranteed to be English words in all lowercase.

Hints:
Array.prototype.indexOf()
Array.prototype.push()
Array.prototype.join()
String.prototype.substr()
String.prototype.split()
*/

function translatePigLatin(str) {
  var vowelsArr = ['a', 'e', 'i', 'o', 'u'];
  var firstConsonantCluster = [];
  //if 1st char is vowel, appending "way" to end
  if (vowelsArr.indexOf(str.charAt(0)) !== -1) {
    return str.concat("way");
  }
  //else moving first consonant cluster to end, then appending "ay"
  else {
    for (var i=0; i<str.length; i++) {
      if (vowelsArr.indexOf(str.charAt(i)) === -1) {
        //pushing consonant into firstConsonantCluster arr
        firstConsonantCluster.push(str.charAt(i));
      } else {
        //stopping only upon reaching first vowel
        break;
      }
    }
    //trying out var names in place of comments
    var clusterAddedEnd = str.concat(firstConsonantCluster.join(""));
    var clusterRemoveIndex = firstConsonantCluster.length;
    var clusterRemovedFront = clusterAddedEnd.substr(clusterRemoveIndex, str.length);
    var addedAy = clusterRemovedFront.concat("ay");
    return addedAy;
  }
}

//TEST
//translatePigLatin("glove"); //"oveglay
