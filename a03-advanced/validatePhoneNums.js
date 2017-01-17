/*Name: Validate US Telephone Numbers
Link: https://www.freecodecamp.com/challenges/validate-us-telephone-numbers

Description:
- Return true if the passed string is a valid US phone number.
- The user may fill out the form field any way they choose as long as it is a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555

For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any combination of the formats provided above. The area code is required. If the country code is provided, you must confirm that the country code is 1. Return true if the string is a valid US phone number; otherwise return false.

Hint: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
*/

function telephoneCheck(str) {
  var countDigits = str.match(/\d/g).length;
  //first rule out obvious invalid numbers
  if (str.match(/[^0-9()-\s]/) || //characters outside [0-9, (, ), -]
      countDigits===11 && str.charAt(0)!=="1" || //invalid country code
      countDigits>11 || countDigits<10 //length>11 or <9
  ) return false;

  return true;
}
