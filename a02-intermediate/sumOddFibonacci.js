/*Name: Sum All Odd Fibonacci Numbers
Link: https://www.freecodecamp.com/challenges/sum-all-odd-fibonacci-numbers

Description:
- Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.
- For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than 10 are 1, 1, 3, and 5.

Hints:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder
*/


function sumFibs(num) {
  //arr to store fibonacci numbers
  var fibArr = [1, 1];
  //continues until sum of last 2 in array <= num
  while(fibArr[fibArr.length-1] + fibArr[fibArr.length-2] <= num) {
    //pushes sum of last 2 in array into fibArr
    fibArr.push(fibArr[fibArr.length-1] + fibArr[fibArr.length-2]);
  }
  //filters list for only odd values
  var onlyOddArr = fibArr.filter(function(val){
    return val % 2 !== 0;
  });
  //sums all values in odd array
  var sumOddArr = onlyOddArr.reduce(function(a, b){
    return a + b;
  });
  //returns summed odd array
  return sumOddArr;
}

//TEST
sumFibs(4); //5
sumFibs(75024); //60696
sumFibs(75025); //135721
