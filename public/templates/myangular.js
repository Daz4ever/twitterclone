var app = angular.module('twitterclone', [
  'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state({
    name: 'index',
    url: '/',
    templateUrl: 'index.html'
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
    controller: 'worldTimelineController'
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

service.worldTimeLine = function() {
  return $http ({
    method: 'GET',
    url: '/alltweets'
  });
};
return service;
});


app.controller('worldTimelineController', function($scope, twitter) {
  twitter.worldTimeLine()
  .success(function (data){
    console.log(data);
    $scope.tweets = data;
  });
});
