var app = angular.module("app", ['ui.bootstrap']);

app.controller("mainCtrl", function($scope, $http, $filter, $modal, $log) {


	$scope.open = function (url) {
		$scope.url = url;
	    var modalInstance = $modal.open({
	      templateUrl: url,
	      controller: modalCtrl,
	      size: 'lg',
	      resolve: {
	        items: function () {
	          return $scope.url;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    };

    var modalCtrl = function ($scope, $modalInstance, items) {

			$scope.items = items;
			$scope.selected = {
				item: $scope.items[0]
			};

			$scope.download = function () {
				$modalInstance.close($scope.selected.item);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
	};

})
