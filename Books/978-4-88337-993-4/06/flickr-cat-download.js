'use strict';
// Flickr の画像をダウンロード

// module
let Flickr = require('node-flickr');
let fs = require('fs');
let request = require('request');

// api
let keys = {
  api_key: 'bcfa4dbebed7187722136e935f4b5efc'
};

// search option
let KEYWORD = '猫';
// download folder
let PHOTO_DIR = `${__dirname}/photo`;

// Flickr object
let flickr = new Flickr(keys);

// create download folder
if (!fs.existsSync(PHOTO_DIR)) fs.mkdirSync(PHOTO_DIR);

flickr.get('photos.search', {
  'text': encodeURIComponent(KEYWORD),
  'sort': 'interestingness-desc',
  'per_page': 20,
  'license': 4
}, (err, result) => {
  if (!result) {
    console.log('error');
    return ;
  }

  // details
  let photo_list = result.photos.photo;
  for (let i in photo_list) {
    let p = photo_list[i];
    // create URL
    let url = 'https://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '.jpg';
    let fname = PHOTO_DIR + '/' + p.id + '.jpg';

    console.log('+ ' + p.title);
    console.log('| URL:' + url);

    // save image file
    request(url).pipe(fs.createWriteStream(fname))
  }
});




