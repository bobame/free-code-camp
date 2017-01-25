## Specifications

- see [CodePen](#) for completed version **UPDATE LINK**

### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/freeCodeCamp/full/aNyxXR).

**User Stories:**  

1. I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
2. I can reset the clock for my next pomodoro.
3. I can customize the length of each pomodoro.

see [instructions](https://www.freecodecamp.com/challenges/build-a-pomodoro-clock)


## Plan
1. UI
    - [X] row-1, header
    - row-2
        - col-6 (left), break part
            - [X] row-1, name
            - [X] row-2, minus, time, plus
        - col-6(right), session part
            - [X] row-1, name
            - [X] row-2, minus, time, plus
    - row-3
        - [X] big circular button
        - update ui per state
            - [X] start session (inside circle)
            - [X] pause session (inside circle)
    - row-4, reset button
2. Functionality
    - [X] time remaining
    - [] progress indication green
    - [] progress indication red
    - [X] sound to alert timer end

## Note

- countdown timer how-to [here](http://www.w3schools.com/howto/howto_js_countdown.asp)
- vertically center inside parent container [here](http://stackoverflow.com/a/17996674)
- adding minutes to current [here](http://stackoverflow.com/a/4517698)
- catch all clicks [here](http://stackoverflow.com/a/15234972)
- left pad 0s to string [here](http://stackoverflow.com/a/14760377)
- progress bar how-to [here](http://www.w3schools.com/howto/howto_js_progressbar.asp)
- sound asset [here](https://s3.amazonaws.com/freecodecamp/simonSound1.mp3), from another upcoming project instructions [here](https://www.freecodecamp.com/challenges/build-a-simon-game)
