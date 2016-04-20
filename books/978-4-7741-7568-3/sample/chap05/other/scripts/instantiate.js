angular.module('myApp', [])
  .value('birth', new Date(2007, 5, 25));

var Animal = function (name, birth, $log) {
  this.name = name;
  this.birth = birth;
  this.output = function() {
    $log.debug(name + ':' + birth.toLocaleString());
  };
};

var $injector = angular.injector(['ng', 'myApp']);
var ani = $injector.instantiate(
  ['name', 'birth', '$log', Animal], { name : 'ウタ' });

ani.output();