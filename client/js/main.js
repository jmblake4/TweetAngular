var app = angular.module('TweetApp', []);


app.controller('tweetController', ['$scope', '$http', function($scope, $http) {

	$scope.userName = 'Anonymous';
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
		var tweetObj = { text: $scope.tweetText,
						userName: $scope.userName
		};
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