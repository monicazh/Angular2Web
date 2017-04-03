/**
 * Created by monicaz on 2017-Mar-15.
 */
var express = require('express');
var bodyParser = require('body-parser');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var path = require('path');
const http = require('http');

//const index = require('./routes/index');
//const profiles = require('./routes/profiles');

var mongojs = require('mongojs');
var db = mongojs('mongodb://monicaz:monicaz@ds131890.mlab.com:31890/monica_userprofiles',['profiles']);

var app = express();
// Body Parser MW
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Static folder
app.use(express.static(path.join(__dirname, '/public')));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set Static folder for angular2
app.use(express.static(path.join(__dirname, 'src')));

// Catch all other routes and return the index file
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/

const port = process.env.PORT || '3000';
app.set('port', port);

// View Engine
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'ejs');
app.engine('html',require("ejs").renderFile);

// global URL for uploaded images
var GLOBAL_URL="http://localhost:"+port;
var DEFAULT_IMG="profile_default_img.jpg";

// START THE SERVER
//app.listen(port, function(){
//  console.log('Sever start on port ' + port);
//});
/*
var server = app.listen(port, function() {
  var host = 'localhost';
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});*/


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/


// REST API
app.get('/api',function(req,res){
  res.send('Restful API is running.');
});

// Get all user profiles
app.get('/api/profiles', function(req, res) {
  db.profiles.find(function(err, profiles){
    if(err){
      res.send(err);
    }
    res.json(profiles);
    console.log("!!!app.GET /profiles 222");
  });
});

// Get single user profile
app.get('/api/profile/:id', function(req, res) {
  //res.send('Profiles Page');
  //res.render('index-backup.html');
  console.log("!!!app.get /profile/:id");
  db.profiles.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
    if(err){
      res.send(err);
    }
    res.json(profile);
  });
});


//Multer for uploading image
var multer  = require("multer");
//upload image and store on disk
var upload= multer({dest:"./public/uploads/"});
// post image to server when player creating profile and uploading an image
app.post('/api/images',upload.single('image'), function(req, res){
  var profile = req.body;
  console.log("!!!!app. POST Image=111"+req.file);
  if( !req.file){
    res.status(400);
    res.json({"error": "Bad Data"
    });
  }
  profile.image = GLOBAL_URL+"/uploads/"+req.file.filename;
  console.log("!!!!app. POST Image 222URL="+profile.image);
  res.json(profile);
});

// POST: One case:
// Player Register(username, password, email)
app.post('/api/profiles', function(req, res){
  var profile = req.body;

  if(!profile.username || !profile.email) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }
  db.profiles.save(profile, function(err, profile){
    if(err){
      res.send(err);
    }
    res.json(profile);
    console.log("!!!app.POST Successful: profile=",profile);
  })
});

/*
// POST: Two case:
// 1) Player Register(username, password, email)
// 2) Registered-Player create profile (id, age, gender?, image, platform, character, etc.)
app.post('/api/profiles',upload.single('image'), function(req, res){
  var profile = req.body;
  console.log("!!!!app. POST: file="+req.file);
  // No image, either registration or create profile without an image
  if( !req.file){
    if(!profile.username || !profile.email) {
      res.status(400);
      res.json({
        "error": "Bad Data"
      });
    }
    if( profile.image ){
      profile.image = "uploads/"+DEFAULT_IMG;
    }
    db.profiles.save(profile, function(err, profile){
      if(err){
        res.send(err);
      }
      res.json(profile);
      console.log("!!!app.POST Successful: profile=",profile);
    })
  } else {
    // create profile with image, no update profile option
    // since user has already registered, so a PUT is needed to update this user
    var updProfile = {};
    updProfile.image = GLOBAL_URL+"/uploads/"+req.file.filename;
    if(profile.username){
      updProfile.username = profile.username
    }
    if(profile.email){
      updProfile.email = profile.email
    }
    if(profile.password){
      updProfile.password = profile.password
    }
    if(profile.playerid){
      updProfile.playerid = profile.playerid
    }
    if(profile.age){
      updProfile.age = profile.age
    }
    if(profile.playtime){
      updProfile.playtime = profile.playtime
    }
    if(profile.voice){
      updProfile.voice = profile.voice
    }
    if(profile.gamelist){
      updProfile.gamelist = profile.gamelist
    }
    if(profile.playstyle){
      updProfile.playstyle = profile.playstyle
    }
    if(profile.character){
      updProfile.character = profile.character
    }
    if(profile.playstyle){
      updProfile.playstyle = profile.playstyle
    }
    if(profile.myid){
      updProfile.myid = profile.myid
    }
    console.log("!!!!app.PUT+POST: image uploaded!!!updProfile="+updProfile);

    if(!updProfile){
      res.status(400);
      res.json({
        "error":"Bad Data"
      });
    } else {
      db.profiles.update({_id: mongojs.ObjectId(req.params.id)},updProfile,{}, function(err, profile){
        if(err){
          res.send(err);
        }
        res.json(updProfile);
      });
    }
  }
});
*/

// Update user profile
// Registered-Player create profile without or with image
app.put('/api/profile/:id', function(req, res) {
  var profile = req.body;
  var updProfile = {};
  console.log("!!!!app.PUT: file="+profile);
  // profile structure may contain null-valued entries
  if(profile.username){
    updProfile.username = profile.username
  }
  if(profile.email){
    updProfile.email = profile.email
  }
  if(profile.password){
    updProfile.password = profile.password
  }
  if(profile.playerid){
    updProfile.playerid = profile.playerid
  }
  if(profile.age){
    updProfile.age = profile.age
  }
  if(profile.playtime){
    updProfile.playtime = profile.playtime
  }
  if(profile.voice){
    updProfile.voice = profile.voice
  }
  if(profile.gamelist){
    updProfile.gamelist = profile.gamelist
  }
  if(profile.playstyle){
    updProfile.playstyle = profile.playstyle
  }
  if(profile.character){
    updProfile.character = profile.character
  }
  if(profile.playstyle){
    updProfile.playstyle = profile.playstyle
  }
  if(profile.myid){
    updProfile.myid = profile.myid
  }
  if(profile.image){
    updProfile.image = profile.image;
  }
  console.log("!!!!app.PUT: create Profile!!!updProfile="+updProfile);

  if(!updProfile){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
    db.profiles.update({_id: mongojs.ObjectId(req.params.id)},updProfile,{}, function(err, profile){
      if(err){
        res.send(err);
      }
      res.json(updProfile);
    });
  }
});

// Delete user profile
app.delete('/api/profile/:id', function(req, res) {
  db.profiles.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
    if(err){
      res.send(err);
    }
    res.json(profile);
  });
});

/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

/**
 * Create HTTP server.
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
server.listen(port, () => console.log(`API running on localhost:${port}`));*/


// START THE SERVER

app.listen(port, function(){
  console.log('Sever start on port ' + port);
});

//module.exports = app;
// Set our api routes
//app.use('/', index);
//app.use('/api', profiles);
