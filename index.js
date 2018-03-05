var Game = require('./src/Game')
var game = new Game();
const TwitchBot = require('twitch-bot');

const Bot = new TwitchBot({
  username: process.env.USERNAME,
  oauth: process.env.OAUTH,
  channels : [process.env.CHANNEL]
})

// const Bot = new TwitchBot({
//   username: 'Noobs2NinjasBot',
//   oauth: 'oauth:q3kwhkj6lbhvox73gmmugr6a2jg5x1',
//   channels : ['noobs2ninjas']
// })

function didUserSay(answer, userMessages) {
  for (messageIndex in userMessages) {
    var words = userMessages[messageIndex].split(" ")
    if (words.includes(answer)) { return true; }
  }
  return false;
}

function getAnswerString(words) {
  var answerString = "";
  for (index in words){
    var word = words[index]
    if (word != "!whosaid") {
      answerString += word;
      answerString += " ";
    }
  }
  console.log("looking for: " + answerString)
  return answerString.toLowerCase().trim()
}

function canAdmin(chatter) {
  return (chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster))
}

Bot.on('join', () => {

  console.log("joined")

  var answerString = ""
  var questionOn = false

  Bot.on('message', chatter => {
    var words = chatter.message.toLowerCase().split(" ")
    if (canAdmin(chatter) && words.includes("!newgame")){
      game = new Game()
      questionOn = false
    } else if (canAdmin(chatter) && words.includes("!nextquestion")){
      game.clearMessages(); 
      answerString = "";
      questionOn = true;
      Bot.say("Next Question!!")
    } else if (canAdmin(chatter) && words.includes("!whosaid")) {
      var answerString = getAnswerString(words)
      var message = game.getCorrectUsers(answerString);
      Bot.say(message);
    } else if (canAdmin(chatter) && words.includes("!score")) {
      Bot.say(game.getScoreMessage(false))
    } else if (canAdmin(chatter) && words.includes("!finalscore")) {
      Bot.say("Final Score: " + game.getScoreMessage(true))
      questionOn = false
    } else if (canAdmin(chatter) && words.includes("!endquestion")) {
      console.log("stopped message tracking")
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
