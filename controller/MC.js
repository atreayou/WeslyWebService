//Justin LeJeune - Sonus.js
//
//Sonus main controller
//

var sys = require("sys");
var stdin = process.openStdin();
var wordList = require('./wordList.js');
//var s = require('./sonus.js');
var fs = require('fs');
//var cmud = require('cmusphinxdict');
var word;
var adder;


module.exports = {
  sonus: function () {
    stdin.removeAllListeners('data');
    s.recognizeWav('wavin');
  },
enterDB: function (JSONFile) {
    		var data = JSON.parse(fs.readFileSync(JSONFile, 'utf8'));

		var keys = Object.keys(data.object);
		var device = keys[0];
		var id = keys[1];
		var commandkeys = Object.keys(data.object.commands);
		var commands = data.object.commands;
		var response = [data.object.id, data.object.device, commands];
		var command = data.object.commands;
		var commands = [];
		var cKeys = Object.keys(command);
		for(var i=0; i<cKeys.length;i++){
			commands[cKeys[i]] = command[cKeys[i]];
		}

		var response = [data.object.id,data.object.device,commands];

		return response;
  }
}
start();

function start(){
console.log("\n\nBasic User Interface for testin and demo purposes only");
console.log("\n\nPlease enter the the number for the operation you would like to run:"+"\n 1.Run Sonus"+"\n 2.Add a new word to the CMU dictionary"+"\n 3.Add a new command"+"\n 4.Exit\n");
stdin.addListener("data", function(d) {
	if(d.toString().trim() == 4){stdin.removeAllListeners('data');process.exit();}
	else if(d.toString().trim() == 5){
		stdin.removeAllListeners('data');
		var j = JSON.parse(fs.readFileSync(__dirname + '/testjson.json', 'utf8'));
		console.log(j.widget.window.title);
	}
	else if(d.toString().trim() == 1){
		stdin.removeAllListeners('data');
		s.recognizeWav('wavin');
	}
	else if(d.toString().trim() == 2){
		console.log("\n\nEnter the word you want to add, followed by the pronunciation(separated by a pipe).");
		stdin.addListener("data", function(d){
			if(d.toString().trim()){
				word = d.toString().trim();
				word = word.split("|");
				if(!word[1]){
					word[1] = cmud.get(word[0]);
					console.log(word[1]);
				}
				else {console.log(word[1]);}
				s.addWordToList(word[0],word[1]);
				setTimeout(console.log("Your word has been added"), 1000);
				stdin.removeAllListeners('data');
				start();
			}
		});
	
	}
	else if(d.toString().trim() == 3){console.log("\nPlease enter the command you wish to add:\n");
					stdin.addListener("data", function(d){
			if(d.toString().trim()){
				word = d.toString().trim();
				word = word.split(" ");
				s.addGrammar(word);

				console.log("\nYour command has been added");
				stdin.removeAllListeners('data');
				start();
			}
		});}
  });
}
