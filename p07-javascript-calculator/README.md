## Specifications

- see [CodePen](#) for completed version **UPDATE LINK**


### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/FreeCodeCamp/full/rLJZrA/).

**User Stories:**  

1. I can add, subtract, multiply and divide two numbers.
2. I can clear the input field with a clear button.
3. I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output.

see [instructions](https://www.freecodecamp.com/challenges/build-a-javascript-calculator)


## Plan
1. UI
    - main body
        - [X] solid color background
        - [X] centered calculator container
        - [X] css for rounded border and shadow effect
    - [X] text name
    - display
        - [X] entered number part
        - [X] ongoing calculation reference part
    - buttons
        - [X] css for 3d effect
        - [X] difference colors for AC, CE buttons
        - [X] double col width for 0 button
        - [X] double col height for = button
2. Functionality
    - [] AC button clear all
    - [] CE button clear entry
    - [] calculation buttons (divide, multiply, subtract, add)
    - [] limit entered value to 10 digits
    - [] round calculation to TBD
    - [] display undefined for division by zero
    - [] limit calculation buttons to first clicked, tie with CE and AC
3. Additional Features
    - [] display ongoing calculation in bottom part of display container
    - keyboard presses for number and calculation buttons
        - [] ENTER key for = button
        - [] SHIFT+8 keys for * button
        - [] FORWARD SLASH key for / button
        - [] SHIFT+= keys for + button
        - [] DASH key for - button
    - [] button press behavior
    - [X] button hover behavior

## Note
