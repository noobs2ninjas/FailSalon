var User = require('./User')

module.exports = class Game {

	constructor(){
		this.users = null;
	}

	addMessageWithChatter(chatter) {
		var didSet = false;
		if (this.users == null) { this.users = [] }
		for (var index in this.users) {
			var user = this.users[index];
			if (user.name == chatter.display_name) { 
				didSet = true;
				user.messages.push(chatter.message);
			} else { console.log("nope"); }
		}
		if (didSet == false) { 
			var user = new User(chatter.display_name, chatter.message);
			this.users.push(user);
		}
		console.log("users: " + this.users.length)
	}

	clearMessages(){
		for (var index in this.users){
			var user = this.users[index]
			user.messages = []
		}
	}

	getCorrectUsers(answer){
		var message = ""
		console.log("starting: " + this.users.length)
		for (var index in this.users) {
			var user = this.users[index]
			console.log("user:" + user.name)
			console.log("messages: " + user.messages)
			if (user.didUserSay(answer)) {
				message += user.name + ", "
			}
		}
		return message
	}

	getScoreMessage() {
		this.users.sort(function(user1, user2) {
			return user1.score < user2.score
		})
		var message = ""
		for (var index in this.users) {
			var user = this.users[index]
			message += user.name + " - " + user.score + ", "
		}
		return message
	}

}
