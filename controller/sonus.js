var PS          = require('./pocketsphinx.js')
,   wordList    = require('./wordList.js')
,   grammars    = require('./grammar.js')
,   record      = require('./record')
,   fs          = require('fs')
,   cmud        = require('cmusphinxdict')
,   recognizer  = initRecognizer()
;


module.exports = {
  sonus: function () {
    sonus();
  },
  addGrammar: function addGrammar(words) {
    
	i=0;
	var ids = new PS.Integers();
var grammar = {
	start: 0,
	end: 0,
	numStates: 1,
};
n=0;
	words.forEach(function () {
var transitions = new PS.VectorTransitions();

			console.log(words);
			
				transitions.push_back({from: 0, to: 0, logp: 0, word: words[n]});
				console.log(words[n]);
				n++;
			
		console.log(grammar);

grammar.transitions = transitions;
	    
	    });
recognizer.addGrammar(ids, grammar);	    
ids.delete();
},
  addWordToList: function addWordToList(word, pronouncings) {
    pronouncings.forEach(function (item, i) {
        var wordHolder = word;
        if (i > 0) {
            wordHolder += '(' + (i+1) + ')';
        }
	console.log([wordHolder, item])
        wordList.push([wordHolder, item]);
    });
},
recognizeWav: function recognizeWav(fileName) {
    var buffer  = new PS.AudioBuffer()
    ,   audio   = fs.createReadStream(__dirname+'/wav/'+fileName + '.wav')
    ,   output
    ,   hyp
    ;

    audio.on('data', function (chunk) {
        for (var i = 0; i < chunk.length; i += 1) {
            buffer.push_back(chunk.readUInt8(i));
        }
	
    }).on('end', function () {
        output = recognizer.start();
        output = recognizer.process(buffer);
        output = recognizer.stop();
        hyp = recognizer.getHyp();
	console.log('As is what follows:');
        console.log(hyp);
        console.log('done');
        buffer.delete();
        recognizer.delete();
	process.exit();
    });
}
};
//sonus();
function sonus() {
    var pronunciation;

    var count = 3;


    loadWords();
    addGrammar();
recognizeWav('wav/wavin');
}

// Initializes and returns the recognizer object
function initRecognizer(config) {
    if (!config) {
        config = new PS.Config();
        config.push_back(["-fwdflat", "no"]);
    }

    var recognizer = new PS.Recognizer(config);
    config.delete();

    return recognizer;
}

function addWordToList(word, pronouncings) {
    pronouncings.forEach(function (item, i) {
        var wordHolder = word;
        if (i > 0) {
            wordHolder += '(' + (i+1) + ')';
        }

        wordList.push([wordHolder, item]);
    });
}

// Adds words to recognizer
function loadWords() {
    var words = new PS.VectorWords();

    // Load wordList into VectorWords object
    wordList.forEach(function (wordPair) {
        words.push_back(wordPair);
    });

    if (recognizer.addWords(words) != PS.ReturnType.SUCCESS) {
        // Probably bad format used for pronunciation
        console.log("Error while adding words");
    }
 
    words.delete()
}

function addGrammar() {

	i=0;
	var ids = new PS.Integers();
var transitions = new PS.VectorTransitions();
var grammar = {
	start: 0,
	end: 0,
	numStates: 1,
};

	//grammars.forEach(function () {
		//words = grammars[i][0].split(" ");
			//console.log(words);
			//n=0;
			//while (n < words.length){
				//transitions.push_back({from: n, to: n+1, logp: 0, word: words[n]});
				//console.log(n);
				//n++;
			//}
			//i++;
		//console.log(grammar);	    
	    //});



grammar.transitions = transitions;
recognizer.addGrammar(ids, grammar);	    
ids.delete();
}

function recognizeWav(fileName) {
    var buffer  = new PS.AudioBuffer()
    ,   audio   = fs.createReadStream(fileName + '.wav')
    ,   output
    ,   hyp
    ;

    audio.on('data', function (chunk) {
        for (var i = 0; i < chunk.length; i++) {
            buffer.push_back(chunk.readUInt8(i));
        }
    }).on('end', function () {
        output = recognizer.start();
        output = recognizer.process(buffer);
        output = recognizer.stop();
        hyp = recognizer.getHyp();
	console.log('As is what follows:');
        console.log(hyp);
        console.log('done');
        buffer.delete();
        recognizer.delete();
	process.exit();
    });
}

