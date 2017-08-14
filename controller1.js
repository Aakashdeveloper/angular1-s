(function (){
	var  app = angular.module("githubViewer", []);

	var MainController = function($scope, $http){
		var onUserComplete = function(response){
			$scope.user = response.data;
			$http.get($scope.user.repos_url)
				.then(onRepos, onError)
		}

		var onRepos = function(response){
			$scope.repos = response.data
		}

		var onError = function(reason){
			$scope.error = "could not fetch data"
		}

		

		$scope.search = function(username){
			$http.get("https://api.github.com/users/"+ username)
				.then(onUserComplete, onError)
		}

		$scope.username="aakashdeveloper";
		$scope.repoSortOrder="-stargazers_count";
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



