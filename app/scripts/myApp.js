'use strict';
 var wapp = angular.module("miPrimeraWebApp", []);

 wapp.controller('controladorBasico', ['$scope', 
 	function controladorBasico($scope){
 		var misDogs = [
 			{nombre: 'Memo', edad: 6, foto:'combi.jpg'}, 
 			{nombre: 'Raul', edad: 2, foto:'conejo.jpg'},
 			{nombre: 'Saul', edad: 12, foto:'tequiero.jpg'}
 		];

 		$scope.superDogs = misDogs;
 	}

 	]);