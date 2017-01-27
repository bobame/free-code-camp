## Specifications

- see [CodePen](#) for completed version **UPDATE LINK**

### Objective:
Build a CodePen.io app that is functionally similar to [this](https://codepen.io/freeCodeCamp/full/KzXQgy).

**User Stories:**  

1. I can play a game of Tic Tac Toe with the computer.
2. My game will reset as soon as it's over so I can play again.
3. I can choose whether I want to play as X or O.

see [instructions](https://www.freecodecamp.com/challenges/build-a-tic-tac-toe-game)

## Plan
1. UI
    - screen-1, select player X or O
        - [X] text indicating either player X or O already selected to go first
        - [X] ask user to select either X or O
        - [X] reveal which player selected to go first
        - [X] fade out div
    - screen-2, 2 columns
        - column-1
            - [X] row-1, player turn
            - [] row-2, score player X (you/computer)
            - [] row-3, score player O (you/computer)
            - [] row-4, reset button
        - column-2
            - [X] 3 by 3 divs equal size
            - [X] gradient css for chalk-like effect
            - [X] thick borders
    - screen-3, game status
        - [X] css opacity to fade out background
        - [X] user win
        - [X] computer win
        - [X] tie
2. Functionality
    - game
        - [] TBD
    - scoreboard
        - [] highlight style for higher score
        - [] highlight style for tie score


## Note

- radial-gradient [here](http://www.w3schools.com/css/tryit.asp?filename=trycss3_gradient-radial)
- binding click event to multiple buttons [here](http://stackoverflow.com/a/17715413)
- disable button [here](http://stackoverflow.com/a/15122550)
- specify callback function after fadeOut [here](http://stackoverflow.com/a/1065809)
- random item from array [here](http://stackoverflow.com/a/5915122)
- fade in appended html jquery [here](http://stackoverflow.com/a/1262367)
- show/hide after delay [here](http://stackoverflow.com/a/7288683)
- 8 strategies to never lose tic tac toe [here](https://www.quora.com/Is-there-a-way-to-never-lose-at-Tic-Tac-Toe/answer/Victoria-Vita)
- match countes [here](http://stackoverflow.com/a/881111)
