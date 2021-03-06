var TweetApp = angular.module('TweetApp', ['ngRoute']);

TweetApp.config(function($routeProvider) {
        $routeProvider

            // route for the welcome page
            .when('/', {
                templateUrl : 'welcome.html',
                controller  : 'welcomeController'
            })

            // route for the welcome page
            .when('/welcome', {
                templateUrl : 'welcome.html',
                controller  : 'welcomeController'
            })

            // route for the tweets page
            .when('/tweets', {
                templateUrl : 'tweets.html',
                controller  : 'tweetController'
            });
    });


TweetApp.controller('tweetController', ['$scope', '$http', '$rootScope', '$window', function($scope, $http, $rootScope, $window) {

	$scope.userName = $rootScope.userName;
	$scope.tweets = [];
	var urlPath = 'http://localhost:3000/messages';
	
	$http.get(urlPath)
	.then(function(res) {
		$scope.tweets = res.data.reverse();
	}).catch(function(err) {
		alert('Something horrible happened!');
		console.log(err);
	});
	
	$scope.postTweet = function() {
		var tweetObj = { text: $scope.tweetText, userName: $scope.userName };
		$http.post(urlPath, JSON.stringify(tweetObj))
		.then(function(res) {
			$scope.tweetText = '';
			return $http.get(urlPath);
		}).then(function(res) {
			$scope.tweets = res.data.reverse();
		}).catch(function(err) {
			alert('Something horrible happened!');
			console.log(err);
		});
	};
}]);

TweetApp.controller('welcomeController', ['$scope', '$http', '$rootScope', '$window', function($scope, $http, $rootScope, $window) {

	$scope.setUser = function() {
		if ( $scope.userName = '' ) {
			$rootScope.userName = 'Anonymous';
		} else {
			$rootScope.userName = $scope.userName;
		}
		$window.location.href = './tweets.html';
	}

}]);