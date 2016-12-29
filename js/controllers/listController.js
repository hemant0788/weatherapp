myApp.controller('listController',
  ['$scope', '$http', '$templateCache', '$filter' ,
  function($scope, $http, $templateCache, $filter) {

  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  $scope.message = "Locating…";

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;


    $http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670,151.1957&radius=500&types=food&name=cruise&key=AIzaSyAPM780gl3gveeQes1RxT75UGqojIoDe1c").then(function(res){

    	var mapData = res.data;
    	console.log(res.data);
    	

    });



    $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+ longitude+"&key=AIzaSyDxEkwzmSLzJ3TFLKrL6X0FCOAflaI96kE").then(function(res){

    	var mapData = res.data;
    	$scope.search = mapData.results[1].formatted_address;
    	$scope.getCities($scope.search);
    	$scope.message = "";

    });

  }

  function error() {
    $scope.message = "Unable to retrieve your location";
  }

 
	$scope.getCities = function(search){

			$scope.search = search;
			$http.get('http://api.openweathermap.org/data/2.5/forecast/city?q='+$scope.search+'&APPID=18e7ca0f6027e21eab4f1a830b92d370').then(function(res){
			var jsonData = res.data;	
			$scope.name = jsonData;

		}).catch(function(err){

	  		$scope.name = err.message;

		});
	}


   navigator.geolocation.getCurrentPosition(success, error);

  
  	$templateCache.removeAll();
}]); // Controller