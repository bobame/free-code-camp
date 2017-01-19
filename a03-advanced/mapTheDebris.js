/*Name: Map the Debris
Link: https://www.freecodecamp.com/challenges/map-the-debris

Description:
- Return a new array that transforms the element's average altitude into their orbital periods.
- The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.
- The values should be rounded to the nearest whole number. The body being orbited is Earth.
- The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.

Hints:
https://en.wikipedia.org/wiki/Orbital_period
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

Formula:
https://forum.freecodecamp.com/t/map-the-debris-wtf/64216/2?
*/


function orbitalPeriod(arr) {
  // FORMULA, https://forum.freecodecamp.com/t/map-the-debris-wtf/64216/2?
  //          2 * pi * sqrt(r^3/GM)
  //          r = earthRadius+avgAlt (distance from earth midpoint to object)
  //          T = Orbital Period
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  var result = [];

  //function to calculate orbital period
  function calculate(valGM, valEarthRadius, valAvgAlt) {
    var r = valEarthRadius + valAvgAlt;
    var mult_1 = 2 * Math.PI;
    var mult_2 = Math.sqrt( ( Math.pow( r,3) ) / valGM );
    return Math.round(mult_1 * mult_2);
  }

  //looping through each data set
  for (var i=0; i<arr.length; i++) {
    var name = arr[i].name;
    var avgAlt = arr[i].avgAlt;
    var orbitalPeriod = calculate(GM, earthRadius, avgAlt);
    //and pushing calculated object into result arr
    result.push({
      "name" : name,
      "orbitalPeriod" : orbitalPeriod
    });
  }
  return result;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
