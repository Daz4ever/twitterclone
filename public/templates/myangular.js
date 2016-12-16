var app = angular.module('twitterclone', [
  'ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state({
    name: 'index',
    url: '/',
    templateUrl: 'index.html'
  })
  .state({
    name: 'signup',
    url: '/signup',
    templateUrl: 'signup.html',
    controller: 'signupController'
  })
  .state({
    name: 'login',
    url: '/login',
    templateUrl: 'login.html',
    controller: 'loginController'
  })
  .state({
    name: 'timeline',
    url: '/timeline',
    templateUrl: 'timeline.html',
    controller: 'timelineController'
  })
  .state({
    name: 'worldtimeline',
    url: '/worldtimeline',
    templateUrl: 'worldtimeline.html',
    controller: 'worldtimelineController'
  })
  .state({
    name: 'profile',
    url: '/profile',
    templateUrl: 'profile.html',
    controller: 'profileController'
  });
  $urlRouterProvider.otherwise('/');
});

app.factory('twitter', function factory($http, $rootScope) {
  var service = {};

service.signup = function(userinfo) {
  return $http ({
    method: 'POST',
    url: '/signup',
    data: userinfo
  });
};



service.login = function(userdata) {
  return $http ({
    method: 'POST',
    url: '/login',
    data: userdata
  });
};

service.worldTimeLine = function() {
  return $http ({
    method: 'GET',
    url: '/alltweets'
  });
};
service.profile = function() {
  return $http ({
    method: 'GET',
    url: '/profile'
  });
};
return service;
});

app.controller('signupController', function($scope, twitter, $state){
  $scope.signUp = function() {

    var userinfo = {
      username: $scope.username,
      password: $scope.password,
      password2: $scope.password2
    };
    twitter.signup(userinfo)
    .success(function(data) {
      console.log("YAY", data);
      $state.go('login');
    })
    .error(function(data){
      console.log("failed");
      $scope.failedPassMatch = true;
    });
  };






});

app.controller('loginController', function($scope, twitter, $state) {

$scope.login = function(){
  loginInfo = {
    username: $scope.username,
    password: $scope.password
  };

  twitter.login(loginInfo)
  .error(function(data){
    console.log("failed");
  })
  .success(function(data){
    console.log(data);
    $state.go('worldtimeline');
  });
};
});

app.controller('worldtimelineController', function($scope, twitter) {
  twitter.worldTimeLine()
  .success(function (data){
    console.log(data);
    $scope.tweets = data;
  });
});

app.controller('profileController', function($scope, twitter) {
  twitter.profile()
  .success(function(data){

    $scope.profile = data[0];
    console.log($scope.profile);
    $scope.tweets = data[1];
    $scope.numberOfTweets = $scope.tweets.length;
  });
});
