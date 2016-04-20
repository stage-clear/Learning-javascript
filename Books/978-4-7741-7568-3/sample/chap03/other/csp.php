<?php
header("Content-Security-Policy: default-src 'self' ajax.googleapis.com");
?>
<!DOCTYPE html>
<html ng-app="myApp" ng-csp>
<head>
<meta charset="UTF-8" />
<title>AngularJS</title>
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-csp.css" />
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min.js"></script>
<script src="scripts/csp.js"></script>
</head>
<body ng-controller="MyController">
<label for="name">名前：</label>
<input id="name" name="name" type="text" ng-model="myName" />
<div ng-cloak>{{"こんにちは、" + myName + "さん！"}}</div>
</body>
</html>
