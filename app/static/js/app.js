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
		/*console.log('================$scope.magazines');
		console.log($scope.magazines);*/
	});

	function range(num) {
		var array = [];
		var i = 0;
		var page = '';
		while (i < num) {
			i++;
			page = '/static/pages/'+i+'.jpg';
		    array.push(page);
		}
		console.log(array)
        return array;   
    }

	$scope.open = function (id, num) {
		$scope.magazine = $scope.magazines[id];
		/*console.log('===============$scope.magazine')
		console.log($scope.magazine)*/
		template = "preview_"+id+".html"
		/*$scope.pages = range(num);
		console.log('################$scope.pages')
		console.log($scope.pages)*/
	    var modalInstance = $modal.open({
	      templateUrl: template,
	      controller: modalCtrl,
	      size: 'lg',
	      resolve: {
	        magazine: function () {
	          return $scope.magazine;
	        },
	        pages: function () {
	          return $scope.pages;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      $log.info('Modal dismissed at: ' + new Date());
	    });
    };

    var modalCtrl = function ($scope, $modalInstance, magazine, pages) {

			$scope.magazine = magazine;
			$scope.pages = pages;
			/*console.log($scope.magazine)*/

			$scope.download = function () {
				$modalInstance.close($scope.selected.item);
			};

			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
	};

})

app.directive('magazine', [function () {
	return {
		scope: { id: '@magId'},
		restrict: 'E',
		replace: true,
		templateUrl: 'magazine.html',
		link: function (scope, elem, attrs) {
			// $(window).ready(function() {
			// 	elem.turn({
			// 		display: 'double',
			// 		acceleration: true,
			// 		gradients: !$.isTouch,
			// 		elevation:50,
			// 		when: {
			// 			turned: function(e, page) {
			// 				// console.log('Current view: ', $(this).turn('view'));
			// 			}
			// 		}
			// 	});
			// });
			// $(window).bind('keydown', function(e){
			// 	if (e.keyCode==37)
			// 		elem.turn('previous');
			// 	else if (e.keyCode==39)
			// 		elem.turn('next');
			// });
		}
	};
}])