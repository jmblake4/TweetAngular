var app = angular.module('TweetApp', []);


app.controller('tweetController', ['$scope', '$http', function($scope, $http) {

$scope.tweetText = "test text";
	$scope.userName = 'Anonymous';
	$scope.tweets = [];
	
	$http.get('/messages')
	.then(function(http) {
		$scope.tweets = http.data.reverse();
	}).catch(function(err) {
		alert('Something horrible happened!');
	});
	
$scope.postTweet = function() {
		var tweetObj = { text: $scope.tweetText,
						userName: $scope.userName
		};
		$http.post('/messages', JSON.stringify(tweetObj))
		.then(function(http) {
			$scope.tweetText = '';
			return $http.get('/messages');
		}).then(function(http) {
			$scope.tweets = http.data.reverse();
		}).catch(function(err) {
			alert('Something horrible happened!')
		});
	}

}]);

// var messages;

// $(document).ready(function() {

// 	function parseData(data, status) {
// 		messages = data.toString();
// 		var msgArray = messages.split(String.fromCharCode(10));
// 		displayMessages(msgArray);
// 	}
	
// 	function displayMessages(msgArray) {
// 		var msg;
// 		$('#msgContainer').html("");
// 		for (var i=0; i<msgArray.length-1; i++) {
// 			msg = JSON.parse(msgArray[i]);
// 			$('#msgContainer').prepend('<div class="row"><span>' + msg.userName + ':&nbsp</span><span>' + msg.text + '</span></div>');
// 		}
// 	}

// 	function getData() {
// 		$.get("http://localhost:3000/messages", parseData)
// 	}

// 	$('#postTweet').click(postTweet);
	
// 	function postTweet() {
// 		var userID = $('#userInput').val();
// 		var msgText = $('#textInput').val();
// 		if ( userID === "" ) {
// 			userID = "anonymous";
// 		}
// 		var data = {text:msgText, userName: userID};
// 		if ( msgText != "" && userID != "" ) {
// 			$('#msgContainer').prepend('<div class="row"><span>' + data.userName + ':&nbsp</span><span">' + data.text + '</span></div>');
// 			$.post("http://localhost:3000/messages", JSON.stringify(data), addTweetToPage);
// 		}
// 	}
	
// 	function addTweetToPage(data) {
// 		var msg = JSON.parse(data).toString();
// 		console.log(data); 
// 		$('#msgContainer').prepend('<div class="row col-lg-12 keys-row msg"><span class="col-lg-10 well well-lg msg-text">' + msg.text + '</span><span class="col-lg-2 well well-lg msg-user">' + msg.userName + '</span></div>');
// 	}

// 	getData();
// 	setInterval(getData,1000);
// });