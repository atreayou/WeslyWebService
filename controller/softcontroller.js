//soft-controller

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var mongoose = require('mongoose');
var crypto = require('crypto');
//var nodemailer = require('nodemailer');
//var uuid = require('uuid');

module.exports = {
  JSONin: function (data) {
    var response = JSONparse(data);

  //return final response back to server
    return response;
  },

  matchCommand: function (moduleResponse,JSONresponse){
  var response = matchCommand(moduleResponse,JSONresponse);

  //object to be returned to the user
  return response;
  }
}

var test = JSONparse(JSON.parse(fs.readFileSync(__dirname + '/testjson.json', 'utf8')));
console.log(test);

//parse the JSON object
//var data = JSON.parse(fs.readFileSync(__dirname + '/testjson.json', 'utf8'));
function JSONparse(data){

var keys = Object.keys(data.device);
var response = [];
for(var i=0; i<data.device.length;i++){
	var device = data.device[i].DeviceName;
	var commandkeys = Object.keys(data.device[i].Commands);
	var command = data.device[i].Commands;
	var commands = [];
	var cKeys = Object.keys(command);
	for(var n=0; n<cKeys.length;n++){
		var nm = cKeys[n];
		commands[cKeys[n]] = command[cKeys[n]];
	}
	var res = [];
	res['device'] = device;
	res['commands'] = [commands];
	response[i] = res;
}

return response;
}

function matchCommand(moduleResponse,JSONresponse){
//check the module's response against the availiable commands for the user

for(var i=0; i<JSONresponse.length; i++){	
	//response[0]['commands'][0]['other command'] <-- this is what you're looking for
	if(m<JSONresponse[i]['commands'][moduleResponse]){
		var returnObject = JSONresponse[i]['commands'][moduleResponse];
	}
}

if(!returnObject){
	var returnObject = "No Command Found"
}

return returnObject;
}
