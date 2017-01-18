/*Name: Exact Change
Link: https://www.freecodecamp.com/challenges/exact-change

Description:
- Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.
- cid is a 2D array listing available currency.

Specs:
- Return the string "Insufficient Funds" if cash-in-drawer is less than the change due.
- Return the string "Closed" if cash-in-drawer is equal to the change due.
- Otherwise, return change in coin and bills, sorted in highest to lowest order.

Hint:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object

References:
http://stackoverflow.com/a/15762794 (round to 2 decimal into string, convert into num)
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Unary_plus
*/

function checkCashRegister(price, cash, cid) {
  var change = cash - price;
  var drawerSum = 0;
  var refDrawer = {};
  //breaking down cid into prop-val pairs & getting total/sum cid
  for (var i=0; i<cid.length; i++) {
    drawerSum += cid[i][1];
    refDrawer[cid[i][0]] = cid[i][1];
  }
  //bills-coins breakdown for easier referencing
  var refBills = {
    "ONE HUNDRED" : 100,
    "TWENTY" : 20,
    "TEN" : 10,
    "FIVE" : 5,
    "ONE" : 1,
    "QUARTER" : 0.25,
    "DIME" : 0.10,
    "NICKEL" : 0.05,
    "PENNY" : 0.01
  };
  //case 1 - price matches amount paid, no change required
  if (drawerSum === change) {
    return "Closed";
  }
  //case 2 - drawer has less cash than change value
  else if (drawerSum < change) {
    return "Insufficient Funds";
  }
  //case 3 - need to get change breakdown array
  else {
    //creating new var to hold result array
    var changeBreakdown = [];
    //looping through each bill-coin type
    for (var j=0; j<Object.entries(refBills).length; j++) {
      var billType = Object.keys(refBills)[j];  //current index bill-coin type
      var billVal = Object.values(refBills)[j]; //current index bill-coin value
      //if at least 1 bill-coin value can go inside change
      if (change/billVal >= 1) {
        //getting floor whole value EXCEPT for LAST (PENNY)
        var inBills = billType!=="PENNY"? Math.floor(change/billVal) * billVal : Math.round(change * 100) / 100;
        //the amount in drawer for current bill type
        var inDrawer = refDrawer[billType];
        //smaller of two to prevent overdraft of insifficient bill type
        var smallerOfTwo = Math.min(inBills, inDrawer);
        //pushing array of bill type and bill value into result array
        changeBreakdown.push([billType, smallerOfTwo]);
        //subtracting amount from drawer
        refDrawer[billType] -= smallerOfTwo;
        //substracting amount from remaining change
        change -= smallerOfTwo;
      }
    }
    //if change still remaining after going through all bills
    if (change > 0) return "Insufficient Funds";
    //otherwise returning change breakdown array
    else return changeBreakdown;
  }
}

//TEST
checkCashRegister(3.26, 100.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
//should return [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]]
