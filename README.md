<<<<<<< HEAD
# TimerApp
Setup Instructions
-install npm
install react native cli => npm install -g
react-native-cli && npm install -g react-native (admin or sudo)
react-native init TimerApp
cd TimerApp
react-native run-ios or run-android


List of Assuptions
-Need to take user Input of Name, Time and Category
-Using Asyncstorage Data saved locally
--Once someone click on Add Timer button after adding (Name, Time and Category) then it will display list of timers on the same screen.
-When someone click on start timer countdown will start running to the provided secondeds, Once click on paused it stopped and when reset it again come to the provided seconds
-Users must manually navigate to the "Add Timer" screen to create a new timer. 
--A separate "History" button given For moving to history screen where all the completed timers get display
