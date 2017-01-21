$(document).ready(function(){
  //display and calculation array
  let ongoingCalc = [];

  //keys reference
  const keysRef = {
    "calc-divide": "/",
    "calc-multiply": "*",
    "calc-subtract": "-",
    "calc-add": "+",
    "num-0": 0,
    "num-1": 1,
    "num-2": 2,
    "num-3": 3,
    "num-4": 4,
    "num-5": 5,
    "num-6": 6,
    "num-7": 7,
    "num-8": 8,
    "num-9": 9,
    "etc-decimal": "."
  }

  //breaking down into separate functions to handle different input types
  $("button").on("click", function(){
    if ((/num/).test(this.id)) {
      processNumKey(this.id);
    } else if ((/calc/).test(this.id)) {
      processCalcKey(this.id);
    } else if ((/clear/).test(this.id)) {
      processClearKey(this.id);
    } else if ((/decimal/).test(this.id)) {
      processDecKey();
    } else if ((/equals/).test(this.id)) {
      returnCalculation();
    }
  });

  //handle number keys
  function processNumKey(key) {
    let currentLastEntry = ongoingCalc[ongoingCalc.length-1];

    //if entered number exceeds 9 digits in length then clears all
    if ((/[0-9.]/).test(currentLastEntry) && currentLastEntry.toString().length > 8) {
      alert("Entered digit count outside display width limit");
      processClearKey("clear-ce");
      $("#display-top").empty();
    } else if ((/[0-9.]/).test(currentLastEntry)) {
      //if last entry is number, appends new num to last entry
      ongoingCalc[ongoingCalc.length-1] = currentLastEntry.toString().concat(keysRef[key]);
    } else {
      //otherwise pushes new num as last entry
      ongoingCalc.push(keysRef[key]);
    }
    displayCurrent();
  }

  //handle calculation keys
  function processCalcKey(key) {
    if (ongoingCalc.length===0) {
      //if calc key is first key, pushes 0 first, then pushes calc key
      ongoingCalc.push(0);
      ongoingCalc.push(keysRef[key]);
    } else if (['+','-','*','/'].indexOf(ongoingCalc[ongoingCalc.length-1]) !== -1) {
      //if calc key follows another calc key, alerts user to enter number or clear entry
      alert("Enter next number or click CE to clear last entry");
    } else {
      //otherwise pushes calc key
      ongoingCalc.push(keysRef[key]);
    }
    displayCurrent();
  }

  //handle clear keys
  function processClearKey(key) {
    if ((/ce/).test(key) && ongoingCalc.length > 1) {
      //if button is CE and ongoingCalc length >1 then clears last entry only
      ongoingCalc.splice(ongoingCalc.length-1, 1);
      displayCurrent();
    } else {
      //otherwise clears entire array
      ongoingCalc = [];
      $("#display-top").empty();
      $("#display-bottom").empty();
    }

  }

  //handle decimal key
  function processDecKey() {
    let currentLastEntry = ongoingCalc[ongoingCalc.length-1];
    if (ongoingCalc.length===0 || (/[\+\-\*\\]/).test(currentLastEntry)) {
      ongoingCalc.push("0.");
    } else if ((/[.]/).test(currentLastEntry)) {
      alert("Decimal entered again");
    } else {
      ongoingCalc[ongoingCalc.length-1] = currentLastEntry.toString().concat(keysRef["etc-decimal"]);
    }
    displayCurrent();
  }

  //display current
  function displayCurrent() {
    //display ongoing calculation in bottom part
    let currentDisplay = document.createTextNode(ongoingCalc.join(" "));
    $("#display-bottom").empty();
    $("#display-bottom")[0].appendChild(currentDisplay);
    //display last number in top part
    let currentState;
    $("#display-top").empty();
    //updated to handle cleared array after invalid/unsupported input
    if (ongoingCalc.length===0) {
      $("#display-top").empty();
    } else if ((/\d/).test(ongoingCalc[ongoingCalc.length-1])) {
      //if array last value is number then displays same value at last index
      currentState = document.createTextNode(ongoingCalc[ongoingCalc.length-1]);
    } else {
      //otherwise displays value at index before last index
      currentState = document.createTextNode(ongoingCalc[ongoingCalc.length-2]);
    }
    $("#display-top")[0].appendChild(currentState);
  }

  //returns calculation
  function returnCalculation() {
    //alerts if last key in ongoing calculation is not a number key
    if (!(/[0-9]/).test(ongoingCalc[ongoingCalc.length-1])) {
      alert("Enter a number to continue calculation");
    }
    //otherwise evaluates calculation
    let currentCalculation = eval(ongoingCalc.join(" "));
    $("#display-top").empty();
    if (currentCalculation == "Infinity") {
      //if "Infinity" then displays "undefined"
      $("#display-top")[0].appendChild(document.createTextNode("undefined"));
    } else if (currentCalculation.toString().split(".")[0].length > 8) {
      //alerts if calculated number greater than 99999999.99
      alert("Not currently supporting numbers outside 0.01-99999999.99");
      //and also clears ongoingCalc array
      ongoingCalc = [];
      $("#display-top").empty();
      $("#display-bottom").empty();
    } else if (currentCalculation.toString().length > 10) {
      //rounds if calculated number is under 99999999.99 but total digit count still > 10
      let decimalPlaces = (9 - currentCalculation.toString().split(".")[0].length);
      alert("Rounding to " + decimalPlaces +  " decimal places");
      $("#display-top")[0].appendChild(document.createTextNode(currentCalculation.toFixed(decimalPlaces)));
    } else {
      //otherwise displays all
      $("#display-top")[0].appendChild(document.createTextNode(currentCalculation));
    }
  }


});
