/*Name: Sum All Primes
Link: https://www.freecodecamp.com/challenges/sum-all-primes

Description:
- Sum all the prime numbers up to and including the provided number.
- A prime number is defined as a number greater than one and having only two divisors, one and itself. For example, 2 is a prime number because it's only divisible by one and two.
- The provided number may not be a prime.

Hints:
For Loops
Array.prototype.push()
*/


function sumPrimes(num) {
  //store prime nums
  var primeNums = [];
  //loop through X in range 2 to num inclusive
  for (var x=2; x<=num; x++) {
    var push = true;
    //loop through Y in range 2 to X
    for (var y=2; y<x; y++) {
      //check if X evenly divisible by Y
      if (x % y === 0) {
        //if so, push is set to false and loop broken
        push = false;
        break;
      }
    }
    //if push remains true then pushing X to primeNums
    if (push) primeNums.push(x);
  }
  //returning sum of primeNums
  var sumPrimeNums = primeNums.reduce(function(a, b){
    return a + b;
  });
  return sumPrimeNums;
}

sumPrimes(977);
sumPrimes(10);
