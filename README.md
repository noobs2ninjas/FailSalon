Before beginning please install [NodeJS](https://nodejs.org/en/)

# FailSalon Geo Game Bot
    To get started with the FailSalon Geo Game Bot follow the instructions below!

1. Create a new Twitch account to use as your bot!
    Pretty self explanitory!

2. Logged in as your Twitch Bot and aquire a oAuth Token.
    Many sites out there that do this. Best one in my opinion is [Twitch Apps]((https://twitchapps.com/tmi/). Simply authenticate and copy the token it gives you. It should read "oauth: XXXXXXXXXXX".

3. Edit the index.js file
    After downloading(best method) the package from this page or cloning the repository travel into the folder and open index.js in a text editor. Then travel to line 5, 6, and 7 and fill in the information for your bot and your channel as well as the oauth token you just aquired. Pretty self explanitory.

4. Start the application.
    The fastest way to do this is to back out of the folder this project is in and shift + right-click the folder. Then select the option "Open cmd line here" or "Open in Powershell"(depending on the version of windows you have). When the cmd or powershell window opens type in "npm start" and hit enter.
    **The first time you download and run this application type "npm install" BEFORE running npm start**

# Commands

* !newquestion
    This begins a new question. Duh.
* !whosaid Word
    This command will search for the word or phrase typed after it. So "!whosaid pizza" will search for "pizza". "!whosaid Phil Has a Perrty Mouth" will search for "phil has a perrty mouth". All answers are stored in in lower case. All words or phrases for !whosaid will be converted to lower case.
* !stopquestion
    This will stop tracking messages. Which is helpful for saving computer resources.

