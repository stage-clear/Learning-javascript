'use strict';
// Facebook を使う
// permission で publish_action が必要
// http://stackoverflow.com/questions/24339061/posting-to-facebook-error-200-the-user-hasn-t-authorized-the-application-t

let FB = require('fb');
FB.setAccessToken('accecc_token');

FB.api('me/permissions', (res) => {
  console.log(res);
})

let msg = 'ままま';

FB.api('me/feed', 'post', {message: msg}, (res) => {
  if (!res) {
    console.log('error');
    return ;
  }

  console.log(res);
});
