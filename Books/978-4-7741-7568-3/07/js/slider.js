
angular.module('myApp', [])
  .directive('mySlider', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      require: '?ngModel',
      scope: {
        min: '@',
        max: '@',
        step: '@',
        value: '@',
        create: '=',
        change: '='
      },
      replace: true,
      // テキストボックスとスライダー埋め込みの領域に展開
      template: '<div>' + 
            '<input type="text" size="3" readonly />' +
            '<div class="mySlider"></div>' + 
          '</div>',
      link: function(scope, element, attrs, ngModelController) {
        // ng-model 属性が存在しなかった場合、my-slider 属性の処理もスキップ
        if (!ngModelController) return ;
        
        // それぞれの属性が指定されてなかった場合、デフォルト値を設定
        if (scope.min === undefined) { scope.min = 0; } 
        if (scope.max === undefined) { scope.max = 100; }
        if (scope.step === undefined) { scope.step = 1; }
        if (scope.value === undefined) { scope.value = 0; } 
        
        // <input>要素と<div>要素（スライダー領域）を取得
        var input = element.find('input');
        var s = input.next();
        
        // スライダー生成/変更時にモデル値も更新するための関数
        var updateModel = function(num) {
          ngModelController.$setViewValue(num);
        };
        
        // モデル値に変更があった場合に、スライダーの値を再設定
        ngModelController.$render = function() {
          s.slider('value', Number(ngModelController.$viewValue));
        };
        
        // ng-model 属性の値が変更になった場合、テキストボックスにも反映
        scope.$watch(
          function() {
            return ngModelController.$viewValue;
          },
          function(newValue, oldValue, scope) {
            input.val(newValue);
          }
        );
        
        // スライダーを有効化
        s.slider({
          min: Number(scope.min),
          max: Number(scope.max),
          step: Number(scope.step),
          value: Number(scope.value),
          // 生成時にcreate属性の処理を実行 &  ng-model を更新
          create: function(e, ui) {
            ui.value = s.slider('option', 'value');
            if (scope.create) {
              scope.create(e, ui);
            }
            updateModel(ui.value);
          },
          // 値変更時に change 属性の処理を事項 & ng-model を更新
          change: function(e, ui) {
            if (scope.change) {
              scope.change(e, ui);
            }
            $timeout(function() {
              updateModel(ui.value);
            });
          }
        });
        
      }
        
    }
  }])