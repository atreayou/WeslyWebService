//server.js homie



var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mainController = require('./node_modules/voice/MC.js');
//var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
var http = require('http');
var mongoose = require('mongoose');
//var sonus = require('');



mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
  


});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    console.log(err);
});


var userSchema = new mongoose.Schema({
    userName: String,
    passWord: String
});

var User = mongoose.model('User', userSchema);



var db = mongoose.connect('mongodb://pawn:password@ds045664.mongolab.com:45664/sonusjsdb');




function checkAuth(req, res, next) {
    if (!req.session.user_id) {
        res.send('You are not authorized to view this page');
    } else {
        next();
    }
}


app.use(bodyParser.urlencoded());



app.use(bodyParser.json({
    limit: '50mb',
    urlencoded: false
}));


app.use(bodyParser.raw({
    type: 'audio/wav',
    limit: '50mb'
}));





app.use(express.static(__dirname + '/public'));



var port = process.env.PORT || 9000;

//NOTE: routes for api
var router = express.Router();



router.get('/', function (req, res) {



    console.log("GET Success! status code 200");
    res.sendstatus(200).sendfile('public/index.html');


});


app.get('/login', function (req, res) {
    var post = req.body;
    if (post.user === 'john' && post.password === 'johnspassword') {
        req.session.user_id = johns_user_id_here;
        res.redirect('/my_secret_page');
    } else {
        res.send('Bad user/pass');
    }
});





app.get('/my_secret_page', checkAuth, function (req, res) {
    res.send('if you are viewing this page it means you are logged in');
});


app.post('/signup', function (req, res) {

    
    
    
    User.find({ userName : 'swagthug' }, function(err, user) {
       
        
        
       if(err) {
          console.log('error connecting to db');
       } 
       
       if(user.length != 0){
        
           console.log('user already exsists');
           
       }
        
        else{
            
            var newUser = new User({

                userName: req.body.username
                ,passWord: req.body.password



            });

            newUser.save(function(err) {
                if (err) throw err;

                console.log('User created!');
            });

            
        }
        
        
    
        
       
    
        
        
        
        
                });


 
    res.send('hugs n kisses xoxoxoxo');
});
    
    
   









//NOTE: This is the endpoint for passing data for the WAV/audio files



app.get('/logout', function (req, res) {
    delete req.session.user_id;
    res.redirect('/login');
});


router.post('/api/audio', function (req, res) {





    console.log('POST Success!! Status code 200');

    console.log("RECIEVED AUDIO: ", req.body);








});



// REGISTER OUR ROUTES -------------------------------




app.use('/', router);



var server = http.createServer(app);

// Start Binary.js server




/*

var bs = new BinaryServer({
    port: 3000
});

// Wait for new user connections
bs.on('connection', function (client) {
    // Incoming stream from browsers
    client.on('stream', function (stream, meta) {
        //old
        //var file = fs.createWriteStream(__dirname+ '/public/' + meta.name);
        var file = fs.createWriteStream(__dirname + '/node_modules/voice/wav/wavin.wav');
        stream.pipe(file);
        //
        // Send progress back
        stream.on('data', function (data) {
            stream.write({
                rx: data.length / meta.size
            });
        });
        //run file through sonus
        mainController.sonus();
    });
});
*/



server.listen(port);

// START THE SERVER
// =============================================================================

console.log('Magic happens on port ' + port);