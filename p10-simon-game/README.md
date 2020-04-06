## Specifications

- see [CodePen](https://codepen.io/gracen/full/GrQyYp/) for completed version

### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/Em-Ant/full/QbRyqq/).


**User Stories:**  

1. [X] I am presented with a random series of button presses.
2. [X] Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
3. [X] I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
4. [X] If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.
5. [X] I can see how many steps are in the current series of button presses.
6. [X] If I want to restart, I can hit a button to do so, and the game will return to a single step. (**Currently user can restart game by toggling off then back on. Need to find way to kill all Deferreds/Promises. Until then, using location.reload() workaround.**)
7. [X] I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
8. [X] I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

see [instructions](https://www.freecodecamp.com/challenges/build-a-simon-game)


**Audio Assets:**

https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.


**ADD PREVIEW**


## Note

- Special thanks to Herman S. for bringing me back.
- Guide to Flex [here](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Compatible colors color picker [here](http://www.colorpicker.com/)
- Deferreds/Promises to handle asynchronous tasks [here](http://stackoverflow.com/a/24660885)
- Set timeout for taking user input [here](http://stackoverflow.com/a/1836140)
- Hover no longer working after changing background-color with jquery [here](http://stackoverflow.com/a/8949379)
- Simple array comparison without for looping [here](http://stackoverflow.com/a/6230314)
- Adding delay for each loop in for loop GOSH* [here](http://stackoverflow.com/a/30865841)
- IIFE, Immediately Invoked Function Expression [here](http://stackoverflow.com/a/8228308)
- Nested setTimeouts [here](http://stackoverflow.com/a/6921279)
- Smooth scrolling to element on page [here](http://stackoverflow.com/a/6677069)
