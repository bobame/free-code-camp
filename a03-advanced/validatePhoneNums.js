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
https://regex101.com/ (more beginner-friendly, but not taking in $ correctly)
http://www.regexpal.com/ (less training wheels, but taking $ end correctly)
*/

function telephoneCheck(str) {
  //^1? : starts "^" with "1" maybe "?"
  //[\s-]? : whitespace "\s" or "-" maybe "?"
  //((\d{3})|(\((\d{3})\))) : either 3 digits or 3 digits enclosed in escaped "\" ()
  //\d{3} : 3 digits
  //\d{4}$ : 4 digits ending "$"
  var re = /^1?[\s-]?((\d{3})|(\((\d{3})\)))[\s-]?\d{3}[\s-]?\d{4}$/;
  return re.test(str);
}

//wanted to declare parts separately then concat together
//but losing escape characters, and consequently regex failing
