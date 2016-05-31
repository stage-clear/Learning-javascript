# actions.js


```js
function actions(acts, done) {
  return function(seed) {
    let init = { values: [], state: seed };
    let intermediate = _.reduce(acts, (stateObj, action) => {
      let result = action(stateObj.state);
      let values = cat(stateObj.values, [result.answer]);
      return { values: values, state: result.state };
    }, init);
    let keep = _.filter(intermediate.values, existy);
    
    return done(keep, intermediate.state);
  };
}

```
