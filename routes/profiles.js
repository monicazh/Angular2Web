var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('mongodb://monicaz:monicaz@ds131890.mlab.com:31890/monica_userprofiles',['profiles']);

/*
 // Connect to the database server running on this machine
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/bears');
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 console.log('1. Connected to database');// we're connected!
 });

 // Define the schema for our database record (row)
 var Schema = mongoose.Schema;

 var User = new Schema({
 name: { type:String, required: true},
 email: { type:String, required: true},
 age: { type: Number, required: false, max:100, min:0},
 gender: { type:String, required: false},
 image:{ type:String, required: false},
 modified: { type: Date, default: Date.now }
 });

 // Create the prototype object that we will use to create all bears
 var UserModel = mongoose.model('User', User);
 */

// Get all user profiles
router.get('/profiles', function(req, res) {
    //res.send('Profiles Page');
    //res.render('index-backup.html');
    //console.log("!!!Router.GET /profiles 1111");
    db.profiles.find(function(err, profiles){
        if(err){
            res.send(err);
        }
        res.json(profiles);
        console.log("!!!Router.GET /profiles 222");
    });
});

// Get single user profile
router.get('/profile/:id', function(req, res) {
    //res.send('Profiles Page');
    //res.render('index-backup.html');
    console.log("!!!Router.get /profile/:id");
    db.profiles.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
        if(err){
            res.send(err);
        }
        res.json(profile);
    });
});

// Save a new created profile
router.post('/profiles', function(req, res){
    var profile = req.body;
    console.log("!!!Router.POST: profile1111=",profile);
    if(!profile.name || !profile.email){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }else{
        db.profiles.save(profile, function(err, profile){
            if(err){
                res.send(err);
            }
            res.json(profile);
            console.log("!!!Router.POST Successful: profile2222=",profile);
        })
    }
});

// Delete user profile
router.delete('/profile/:id', function(req, res) {
    db.profiles.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, profile){
        if(err){
            res.send(err);
        }
        res.json(profile);
    });
});

// Update user profile
// Delete user profile
router.put('/profile/:id', function(req, res) {
    var profile = req.body;
    var updProfile = {};

    if(profile.name){
        updProfile.name = profile.name
    }

    if(profile.age){
        updProfile.age = profile.age
    }

    if(profile.gender){
        updProfile.gender = profile.gender
    }

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

module.exports = router;
