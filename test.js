
var Game = require('./src/Game')
var game = new Game()

function Chatter(display_name, message){
	this.display_name = display_name
	this.message = message
}

function addMessagesToUser(user, messages) {
	for (index in messages) {
		game.addMessageWithChatter(new Chatter(user, messages[index]))
	}
}

var chatter1 = new Chatter("noobs2ninjas", "alcohol")
game.addMessageWithChatter(chatter1)

var messageArray1 = ["tea", "coffee",  "cheese toast"];
addMessagesToUser(chatter1.display_name, messageArray1)

var chatter2 = new Chatter("MattDevelopment", "bread")
game.addMessageWithChatter(chatter2)

var messageArray2 = ["tea", "vitamines", "toast"]
addMessagesToUser(chatter2.display_name, messageArray2)

var chatter3 = new Chatter("DonyelleFreak", "basketball")
game.addMessageWithChatter(chatter3)

var messageArray3 = ["coke", "meth", "tea"]
addMessagesToUser(chatter3.display_name, messageArray3)

console.log(game.getCorrectUsers("tea"))
console.log("Game Score: " + game.getScoreMessage())
console.log(game.getCorrectUsers("toast"))
console.log("Game Score: " + game.getScoreMessage())
console.log(game.getCorrectUsers("vitamines"))
console.log("Game Score: " + game.getScoreMessage())
