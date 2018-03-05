var Game = require('./src/Game')
var game = new Game();
const TwitchBot = require('twitch-bot');

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

function canAdmin(chatter) {
  return (chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster))
}

Bot.on('join', () => {
  console.log("Sup Bitches! Bot joined!")
  var answerString = ""
  var questionOn = false;
  Bot.on('message', chatter => {
    var words = chatter.message.toLowerCase().split(" ")
    if (canAdmin(chatter) && words.includes("!newgame")){
      game = new Game()
      questionOn = false
      Bot.say("New Game!")
    } else if (canAdmin(chatter) && words.includes("!nextquestion")){
      game.clearMessages(); 
      answerString = "";
      questionOn = true;
      Bot.say("Next Question!")
    } else if (canAdmin(chatter) && words.includes("!whosaid")) {
      var answerString = getAnswerString(words)
      var message = game.getCorrectUsers(answerString);
      Bot.say(message);
      questionOn = false
    } else if (canAdmin(chatter) && words.includes("!score")) {
      Bot.say(game.getScoreMessage(false))
    } else if (canAdmin(chatter) && words.includes("!finalscore")) {
      Bot.say("Final Score: " + game.getScoreMessage(true))
      questionOn = false
    } else if (questionOn) { 
      game.addMessageWithChatter(chatter)
    } 
  })
})

Bot.on('error', err => {
  console.log("nope")
  console.log(err)
})
