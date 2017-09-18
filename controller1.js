(function (){
	var  app = angular.module("githubViewer", []);

	var MainController = function($scope, $http, $interval, $log, $anchorScroll, $location, github){
		var onUserComplete = function(data){
			$scope.user = data;
			//$http.get($scope.user.repos_url)
			github.getRepos($scope.user).then(onRepos, onError)
		}

		var onRepos = function(response){
			$scope.repos = response.data
			$location.hash("userDetails");
			$anchorScroll();
		}

		var onError = function(reason){
			$scope.error = "could not fetch data"
		}

		var decrementCountDown =function(){
			$scope.countdown -= 1;
			if($scope.countdown<1){
				$scope.search($scope.username);
			}
		};
		
		var countdownInterval = null;
		var startCountDown = function(){
			var countdownInterval = $interval(decrementCountDown,1000,$scope.countdown)
		};

		$scope.search = function(username){
			$log.info("searching for "+ username);
			//$http.get("https://api.github.com/users/"+ username)
			github.getUser(username).then(onUserComplete, onError);
			if(countdownInterval){
				$interval.cancel(countdownInterval);
				$scope.countdown=null;
			}
		};

		$scope.username="aakashdeveloper";
		$scope.repoSortOrder="-stargazers_count";
		$scope.countdown=10;
		startCountDown();
	};
	app.controller("MainController", MainController)


}());




/*var app = angular.module("sandeep",[]);

app.controller("main",function($scope,$http){
	//$scope.name="sandeep"
	//$scope.class="ang"
	var onUserComplete = function(response){
		$scope.user = response.data

	}

	$http.get("https://api.github.com/users/aakashdeveloper")
		.then(onUserComplete)

	var person ={
		name:"sanpeed",
		class:"angualr",
		city:"usa"
	}

	$scope.person = person;
})*/



