const mongoose = require('mongoose');
const bluebird = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const uuidV1 = require('uuid/v1');

app.use(express.static('public/templates'));
app.use(bodyParser.json());
mongoose.Promise = bluebird;
const ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://localhost/twitterclone_db');

var randomToken = uuidV1();

const User = mongoose.model('User', {
 username: { type: String, required: true },
 password: { type: String, required: true },
 following: [String],
 followers: [String],
 token: String,
 date: Date
});

const Tweet = mongoose.model('Tweet', {
 tweet: { type: String, required: true },
 date: Date,
 username: String,
 userId: ObjectId
});








// User.update({
//   // IAmDom is....
//   _id: "5851b2bf69405053a9140e09"
//   }, {
//       $set: {
//         following: [
//           // following IAmLyn and jumpinLollies
//           "5851b2bf69405053a9140e0b",
//           "5851b2bf69405053a9140e0d"
//         ]
//     }
//   })
//   .then(function(following) {
//     console.log("FOLLOWING::", following);
//   })
//   .catch(function(err) {
//     console.log('error grabbing who im following::', err.message);
//   });

app.post('/signup', function(request, response){
var userdata = request.body;
console.log(userdata);
  if(userdata.password === userdata.password2) {
    bcrypt.genSalt(10)
    .then(function(salt){
      return bcrypt.hash(request.body.password, salt);
    })
    .then(function(encryptedpass) {
      console.log(encryptedpass);
      var newUser = new User({
        username: userdata.username,
        password: encryptedpass,
        following: [],
        followers: [],
        token: String,
      });
      return newUser.save();

    })
    .then(function(){
      response.send("Success!");
    })
    .catch(function(err){
      console.log("AHHHH",  err.stack);
    });
  }
  else{
    response.status(400);
    response.json("passwords don't match");
  }
 });



app.post('/login', function(request, response) {
  var userdata = request.body;
  console.log("XXXXXXXXXX", userdata);
  User.findOne({ username: userdata.username})
  .then(function(user){
    console.log(userdata.password);
    console.log(user.password);
    return [user, bcrypt.compare(userdata.password, user.password)];
        //bcrypt.compare === true or false
  })
  .spread(function(user, boolean) {
    if (boolean === true) {
      console.log("Login Success");
      user.token = randomToken;
      return user.save();
    }
    else {
      console.log("Login Failed");
      response.send('failed');
    }
  })
  .then(function(user) {
    response.send(user);
  })
  .catch(function(err){
    console.log('OMG ERROR: ', err.message);

  });
});



// we want to capture all tweets limited to the first 20
app.get('/alltweets', function(request, response) {
  Tweet.find().limit(20)
  .then(function(allTweets) {
    response.send(allTweets);
  })
  .catch(function(err){
    console.log(err);
  });
});

// we want to grab all the data for profile including all the tweets for a specific
// user and the details for a specific user(which includes followers and following)
app.get('/profile/:username', function(request, response) {
  var username= request.params.username;
  bluebird.all([Tweet.find({ username: username}).sort({date: -1}).limit(5),
  User.find({username: username})
  ])
  .spread(function(tweets, user){
    console.log("tweets: ", tweets);
    console.log("user: ", user);
    response.send([user, tweets]);
  });


});


function auth(request, response, next) {
  //verify auth token

  var token = request.query.token;
  User.find({token: token})
  .then(function(user){
    if(user.token === token) {

      next();
    } else {
      response.status(401);
      response.json({error: "you are not logged in"});
    }


});
}

app.use(auth);

app.get('/timeline', function(request, response) {

  // hard code IAmLyn's_id
  var user_id = "5851b2bf69405053a9140e09";
  //takes the array bar out
  User.findOne({ _id: user_id})
    .then(function(userInfo) {
      console.log('USER INFO:::', userInfo);
      return Tweet.find({
        //filter through all tweets
        //finds all userIds that userInfo is following and including himself (.concat[user_id])
        userId: {
          $in: userInfo.following.concat([user_id])
        }
      });
    })
    .then(function(allTweets) {
      console.log('ALL Tweets::', allTweets);
    })
    .catch(function(err) {
      console.log('Error not grabbing all the tweets::', err);
    });

});


app.listen(3000, function() {
  console.log('I am listening.');
});
