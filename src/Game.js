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
				user.messages.push(chatter.message.toLowerCase());
			}
		}
		if (didSet == false) { 
			var user = new User(chatter.display_name, chatter.message.toLowerCase());
			this.users.push(user);
		}
	}

	clearMessages(){
		for (var index in this.users){
			var user = this.users[index]
			user.messages = []
		}
	}

	getCorrectUsers(answer){
		var message = ""
		for (var index in this.users) {
			var user = this.users[index]
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
			if (user.score > 0) { message += user.name + " - " + user.score + ", " }
		}
		return message
	}

}
