# iOSChess

![ioschess]

iOSChess was built over the course of 3 days because I wanted a fun project to work on while I taught myself React Native and ES6 Syntax.

## How To Run
Because I don't have a developer account with Apple yet, I cannot put iOSChess in the App Store. However, you can run iOSChess on OS X or on your iOS device by doing the following:

 1. [Xcode][Xcode] 7.0 or higher is required. It can be installed from the App Store.
 2. Clone this repo on your machine.
 3. Navigate to the directory and run `npm install` and then `npm start` in the terminal.
 4. Open `iosChess.xcodeproj` in Xcode and run it in simulator (best viewed in iPhone 6S Plus)


## Features

iOSChess keeps track of move history

![history]

Completely custom Chess logic including in check, checkmate, and castling

![checkmate]

## Future Improvements
* I learned the move 'en passant' as I was working on this project and didn't have time to finish it (or make sure I understand it completely). The basic logic for the code is written and commented out, but I didn't want to add it without making sure it works perfectly.
* Play against the computer (including creating AI move tree)
* Promotion (forgot about this rule in Chess...I don't play much)
* Add animations and make the layout more aesthetically pleasing
* Reverse a move
* Write tests :)




[ioschess]: ./App/Assets/ioschess2.jpg
[history]: ./App/Assets/ioschess1.jpg
[checkmate]: ./App/Assets/checkmate.jpg
[Xcode]:https://developer.apple.com/xcode/downloads/
