var app = angular.module("app", ['ui.bootstrap']);

app.factory('jsonData', ['$http',function($http){
	return {
		get: function(fileName,callback){
			$http.get(fileName).
			success(function(data, status) {
				callback(data);
			});
		}
	};
}]);

app.controller("mainCtrl", function($scope, $http, $filter, $modal, $log, jsonData) {

	jsonData.get("static/data/magazines.json",function(data) {
		$scope.magazines = data[0];
		console.log('================$scope.magazines');
		console.log($scope.magazines);
	});

	$scope.open = function (id) {
		$scope.magazine = $scope.magazines[id]
		console.log('===============$scope.magazine')
		console.log($scope.magazine)
	    var modalInstance = $modal.open({
	      templateUrl: id,
	      controller: modalCtrl,
	      size: 'lg',
	      resolve: {
	        magazine: function () {
	          return $scope.magazine;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    };

    var modalCtrl = function ($scope, $modalInstance, magazine) {

			$scope.magazine = magazine;
			console.log($scope.magazine)

			$scope.download = function () {
				$modalInstance.close($scope.selected.item);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
	};

})
