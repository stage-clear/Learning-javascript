# Mediator

メディエータとは振る舞いのデザインパターンであり、システムのさまざまな部品が相互にコミュニケーションできるように統一インターフェイスを公開するものです。

<img src="https://user-images.githubusercontent.com/4797793/191047407-6aa6f77e-9df6-4a33-b5cd-2eef688c6fb0.jpeg" width="600px" height="auto" />

実装の用語で言うと、**メディエータパターンは本質的にはオブザーバパターンにおける共有されたサブジェクト**になります。

## 基本的な実装
```js
var mediator = (function () {
  // ブロードキャストやリスンされるトピックのための記憶領域
  var topics = {}
  
  // トピックの購読。トピックがブロードキャストされるときに実行されるコールバックを与える
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = []
    }
    
    topics[topic].push({ context: this, callback: fn })
    
    return this
  }
  
  // イベントをアプリケーションに発行/ブロードキャストする
  var publish = function (topic) {
    var args
    
    if (!topics[topic]) {
      return false
    }
    
    args = Array.prototype.slice.call(arguments, 1)
    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i]
      subscription.callback.apply(subscription.context, args)
    }
    return this
  }
  
  return {
    Publish: publish,
    Subscribe: subscribe,
    installTo: function (obj) {
      obj.subscribe = subscribe
      obj.publish = publish
    }
  }
}())
```

### より高度な実装
より高度な実装に興味のある方は、ジャック・ローソンの卓越した[Mediator.js](http://thejacklawson.com/Mediator.js/)を著者が簡略したバージョンを読まれるとよいでしょう。
このバージョンには、トピックの名前空間、サブスクライバの削除、メディエータのための発行/購読システムをより堅牢にするための改善が盛り込まれています。

## 実装例
- [dofactory](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/dofactory.com/mediator.md)
- [Design Patterns Game](https://github.com/stage-clear/Learning-javascript/blob/master/DesignPatterns/designpatternsgame.com/mediator.md)



