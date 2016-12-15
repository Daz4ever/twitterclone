var user1 = new User({
  username: "IAmLyn",
  password: "12345",
  following: [],
  followers: []
});

user1.save();

var user2 = new User({
  username: "IAmDom",
  password: "abcde",
  following: [],
  followers: []
});

user2.save();

var user3 = new User({
  username: 'funkyClam',
  password: '123funkyclam',
  following: [],
  followers: []
});

user3.save();

var user4 = new User({
  username: 'jumpinLollies',
  password: '123jumpinglollies',
  following: [],
  followers: []
});

user4.save();
var user5 = new User({
  username: 'monkeySauce',
  password: '123monkey',
  following: [],
  followers: []
});

user5.save();

var user6 = new User({
  username: 'koalaMee',
  password: '123koalaMee',
  following: [],
  followers: []
});

user6.save();

var tweet0 = new Tweet({
  tweet: "Where's my dog you bastard?!",
  date: Date.now(),
  username: "IAmDom",
  userId: "5851b2bf69405053a9140e0a"
});

tweet0.save();
var tweet01 = new Tweet({
  tweet: "OMG, so funny!",
  date: Date.now(),
  username: "IAmLyn",
  userId: "5851b2bf69405053a9140e09"
});
tweet01.save();

var tweet1 = new Tweet({
  tweet: 'See the monkey sleeping in the tree?',
  date: Date.now(),
  username: 'funkyClam',
  userId: "5851b2bf69405053a9140e0b"
});

tweet1.save();

var tweet2 = new Tweet({
  tweet: 'Wake up the rooster!!',
  date: Date.now(),
  username: 'monkeySause',
  userId: "5851b2bf69405053a9140e0d"
});

tweet2.save();

var tweet3 = new Tweet({
  tweet: 'Cha cha bing bang kooky!',
  date: Date.now(),
  username: 'koalaMee',
  userId: "5851b2bf69405053a9140e0e"
});

tweet3.save();

var tweet4 = new Tweet({
  tweet: 'Run in circles til\' you pass out!!',
  date: Date.now(),
  username: 'jumpinLollies',
  userId: "5851b2bf69405053a9140e0c"
});

tweet4.save();

var tweet5 = new Tweet({
  tweet: 'Foaming at the mouth all day long!',
  date: Date.now(),
  username: 'jumpinLollies',
  userId: "5851b2bf69405053a9140e0c"
});

tweet5.save();

var tweet6 = new Tweet({
  tweet: 'Dance until your legs break!!',
  date: Date.now(),
  username: 'monkeySause',
  userId: "5851b2bf69405053a9140e0d"
});
