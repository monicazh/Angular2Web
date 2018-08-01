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
var db_lfg = mongojs('mongodb://monicaz:monicaz@ds131890.mlab.com:31890/monica_userprofiles',['lfg']);
var firebase = require("firebase");

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
  console.log("!!!!app. POST Image, porfile.image="+profile.image);
  res.json(profile);
});
/*
app.post('/api/images', function(req, res){
  var profile = req.body;
  console.log("!!!!app. POST Image  ##@@@@@222222");
  console.log("!!!!app. POST Image, porfile.image="+profile.image);
  res.json(profile);
});*/

// POST: One case:
// Player Register(username, password, email)
app.post('/api/profiles', function(req, res){
  var profile = req.body;

  if(!profile.username) {
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


// Update user profile
//1) Registered-Player create profile without or with image
//2) update profile: [game-detail component]add an interested game to profile
app.put('/api/profile/:id', function(req, res) {
  var profile = req.body;
  var updProfile = {};
  console.log("!!!!app.PUT: file="+profile);
  // profile structure may contain null-valued entries
  // don't need to update _id field in DB, otherwise there is error in DB
  if(profile.username){
    updProfile.username = profile.username
  }
  if(profile.email){
    updProfile.email = profile.email
  }
  if(profile.password){
    updProfile.password = profile.password
  }
  if(profile.playerid1){
    updProfile.playerid1 = profile.playerid1
  }
  if(profile.playerid2){
    updProfile.playerid2 = profile.playerid2
  }
  if(profile.playerid3){
    updProfile.playerid3 = profile.playerid4
  }
  if(profile.playerid4){
    updProfile.playerid4 = profile.playerid4
  }
  if(profile.playerid5){
    updProfile.playerid5 = profile.playerid5
  }

  if(profile.age){
    updProfile.age = profile.age
  }
  if(profile.playtime){
    updProfile.playtime = profile.playtime
  }
  if(profile.voice){
    updProfile.voice = profile.voice;
  }
  if(profile.playstyles){
    updProfile.playstyles = profile.playstyles;
  }
  if(profile.characters){
    updProfile.characters = profile.characters;
  }

  // interested games on every platform
  updProfile.interested_games = profile.interested_games;

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

//********  LFG Service  ********

// Get all lfg requests
app.get('/api/lfgs', function(req, res) {
  db_lfg.lfg.find(function(err, lfgs){
    if(err){
      res.send(err);
    }
    res.json(lfgs);
    console.log("***app.GET /LFG Requests");
  });
});

// Get single user profile
app.get('/api/lfg/:id', function(req, res) {
  console.log("***app.get /lfg/:id");
  db_lfg.lfg.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, lfg){
    if(err){
      res.send(err);
    }
    res.json(lfg);
  });
});

app.post('/api/lfgs', function(req, res){
  var lfg_request = req.body;

  if(!lfg_request.myid) {
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  }
  db_lfg.lfg.save(lfg_request, function(err, lfg_request){
    if(err){
      res.send(err);
    }
    res.json(lfg_request);
    console.log("****app.POST Successful: lfg_request=",lfg_request);
  })
});

// Update LFG request
app.put('/api/lfg/:id', function(req, res) {
  var lfg = req.body;
  var upd_lfg = {};

  // don't need to update _id field
  if(lfg.username){
    upd_lfg.username = lfg.username
  }
  if(lfg.myid){
    upd_lfg.myid = lfg.myid
  }
  if(lfg.game){
    upd_lfg.game = lfg.game
  }
  if(lfg.platform){
    upd_lfg.platform = lfg.platform
  }
  if(lfg.type){
    upd_lfg.type = lfg.type
  }
  if(lfg.username){
    upd_lfg.username = lfg.username
  }
  if(lfg.activity){
    upd_lfg.activity = lfg.activity
  }
  if(lfg.start_time){
    upd_lfg.start_time = lfg.start_time
  }
  if(lfg.duration){
    upd_lfg.duration = lfg.duration
  }
  if(lfg.description){
    upd_lfg.description = lfg.description
  }
  if(lfg.creat_time){
    upd_lfg.creat_time = lfg.creat_time
  }

  console.log("***app.PUT /lfg/:id,upd_lfg=",upd_lfg);
  if(!upd_lfg){
    res.status(400);
    res.json({
      "error":"Bad Data"
    });
  } else {
    db_lfg.lfg.update({_id: mongojs.ObjectId(req.params.id)},upd_lfg,{}, function(err, lfg){
      if(err){
        res.send(err);
      }
      res.json(upd_lfg);
    });
  }
});

// Delete LFG request
app.delete('/api/lfg/:id', function(req, res) {
  var delete_lfg = req.body;
  db_lfg.lfg.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, lfg){
    if(err){
      res.send(err);
    }
    res.json(delete_lfg);
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
