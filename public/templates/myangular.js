



var app = angular.module('twitterclone', [
  'ui.router', 'ngAnimate', 'ngCookies']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state({
    name: 'front',
    url: '/',
    templateUrl: 'front.html'
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
    url: '/profile/{username}',
    templateUrl: 'profile.html',
    controller: 'profileController'
  });
  $urlRouterProvider.otherwise('/');
});

app.factory('twitter', function factory($http, $rootScope, $cookies) {
  var service = {};
  var userInfo = {};

  $rootScope.cookieData = null;
  $rootScope.cookieData = $cookies.getObject('cookieData');
  console.log("Printing initial cookie", $rootScope.cookieData);

  if ($rootScope.factoryCookieData) {
  $rootScope.auth = $rootScope.cookieData.token;
  $rootScope.username = $rootScope.cookieData.username;
  }


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
  service.profile = function(username) {
    return $http ({
      method: 'GET',
      url: '/profile/' + username,
    });
  };

  service.timeline = function() {
    return $http ({
      method: "GET",
      url: '/timeline',
      params: {token: $rootScope.auth}
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

app.controller('loginController', function($scope, twitter, $state, $cookies, $rootScope) {

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
    $cookies.putObject('cookieData', data);
    console.log("ADDED COOKIE");
    $rootScope.user_info = data;
    console.log('Hello', $rootScope.user_info);

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

app.controller('profileController', function($scope, twitter, $rootScope, $stateParams) {
  $scope.someonesusername = $stateParams.username;

  twitter.profile($scope.someonesusername)
  .success(function(data){

    $scope.profile = data[0][0];
    console.log("HELLO:", $scope.profile);
    $scope.tweets = data[1];
    console.log(data[1]);
    $scope.numberOfTweets = $scope.tweets.length;
  });
});
