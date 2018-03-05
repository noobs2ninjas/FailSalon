var Game = require('./src/Game')
var game = new Game();
const TwitchBot = require('twitch-bot');

var questionOn = false;
var lastUsed;
var timerSet = false;

const Bot = new TwitchBot({
  username: process.env.USERNAME,
  oauth: process.env.OAUTH,
  channels : [process.env.CHANNEL]
})

function getAnswerString(words) {
  var answerString = "";
  for (index in words){
    var word = words[index]
    if (word != "!whosaid") {
      answerString += word;
      answerString += " ";
    }
  }
  return answerString.toLowerCase().trim()
}

function checkLastUsed() {
  var now  = new Date()
  var difference = new Date().getTime() - lastUsed.getTime()
  if (difference < 36000) {
    game = null;
  } else { 
    setTimeOut(checkLastUsed, difference); 
  }
}

function canAdmin(chatter) {
  return (chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster))
}

Bot.on('join', () => {
  console.log("bot joined")
  var answerString = ""
  Bot.on('message', chatter => {
    var words = chatter.message.toLowerCase().split(" ")
    if (canAdmin(chatter) && words.includes("!newgame")){
      lastUsed = new Date()
      game = new Game()
      questionOn = false
      Bot.say("New Game!")
    } else if (canAdmin(chatter) && words.includes("!nextquestion")){
      lastUsed = new Date()
      game.clearMessages(); 
      answerString = "";
      questionOn = true;
      Bot.say("Next Question!")
      if (!timerSet) { setTimeOut(checkLastUsed, 36000) }
    } else if (canAdmin(chatter) && words.includes("!whosaid")) {
      lastUsed = new Date()
      var answerString = getAnswerString(words)
      var message = game.getCorrectUsers(answerString);
      questionOn = false
      Bot.say(message);
    } else if (canAdmin(chatter) && words.includes("!score")) {
      lastUsed = new Date()
      Bot.say(game.getScoreMessage(false))
    } else if (canAdmin(chatter) && words.includes("!finalscore")) {
      lastUsed = new Date()
      Bot.say("Final Score: " + game.getScoreMessage(true))
      questionOn = false
    } else if (questionOn) { 
      game.addMessageWithChatter(chatter)
    } else { console.log("Game Not On!") }
  })
})

Bot.on('error', err => {
  console.log("nope")
  console.log(err)
})
