const mongoose = require('mongoose');
const bluebird = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public/templates'));

mongoose.Promise = bluebird;
const ObjectId = mongoose.Schema.ObjectId;

mongoose.connect('mongodb://localhost/twitterclone_db');

const User = mongoose.model('User', {
 username: { type: String, required: true },
 password: { type: String, required: true },
 following: [ObjectId],
 followers: [ObjectId]
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
app.get('/profile', function(request, response) {
  bluebird.all([Tweet.find({ userID: "58516e9237515c46d0ba46ab"}),
  User.findById("58516e9237515c46d0ba46ab")
  ])
  .spread(function(tweets, user){
    console.log("tweets: ", tweets);
    console.log("user: ", user);
  });


});

app.get('/timeline', function(request, response) {

  // hard code IAmDom's _id
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
      console.log('ALL THE DAMN TWEETS::', allTweets);
    })
    .catch(function(err) {
      console.log('Error grabbing DOM and his following TWEETS::', err);
    });

});


app.listen(3000, function() {
  console.log('I am listening.');
});
