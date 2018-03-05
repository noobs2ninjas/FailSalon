module.exports = class User {

	constructor(name, message) {
		this.score = 0;
		this.name = name;
		this.messages = [message];
	}

	didUserSay(answer) {
		for (var index in this.messages) {
  		var words = this.messages[index].split(", ")

      words.forEach(function(word) {
        word.trim()
        console.log(word)
      })
  		if (words.includes(answer)) { 
  			this.score += 1;
  			return true; 
  		}
		}
		return false;
	}
}