
const TwitchBot = require('twitch-bot');

const Bot = new TwitchBot({
  username: 'yourbotusername',
  oauth: 'oauth:youroauthhere',
  channels : ['yourchannel']
})

function didUserSay(answer, userMessages) {
  for (message in userMessages) {
    if (message.includes(answer)) { return true; }
    console.log("message:" + message)
    return true
  }
  return false;
}

function getAnswerString(words) {
  var answerString = "";
  for (index in words){
    let word = words[index]
    if (word != "!whosaid") {
      answerString += word;
      answerString += " ";
    }
  }
  return answerString
}

Bot.on('join', () => {
  console.log("joined")
  var answers = [];
  var answerString = ""
  var questionOn = false

  Bot.on('message', chatter => {
    var words = chatter.message.toLowerCase().split(" ")
    if ((chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster)) && words.includes("!newquestion")){
      Bot.say("Next Question!!")
      answers = [];
      questionOn = true;
    } else if ((chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster)) && words.includes("!whosaid")) {
      answerString = getAnswerString(words)
      var messageString = "";
      for (key in answers) {
        var userAnswers = answers[key]
        if (didUserSay(answerString, userAnswers)) {
          messageString += key + ", ";
        }
      }
      Bot.say(messageString);
    } else if (else if ((chatter.mod || (chatter.badges != null && chatter.badges.broadcaster != null && chatter.badges.broadcaster)) && words.includes("!stopquestion"))) {
      console.log("stopped message tracking")
      questionOn = false
    } else if (questionOn) { 
      if (answers[chatter.display_name] == null) { answers[chatter.display_name] = []; }
      answers[chatter.display_name].push(chatter.message.toLowerCase())
    }
  })
})

Bot.on('error', err => {
  console.log("nope")
  console.log(err)
})
