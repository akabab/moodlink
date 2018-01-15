const request = require('request')
const fs = require("fs")

const file = 'pic.jpg'
const data = fs.readFileSync(file)
const encodedImage = new Buffer(data, 'binary').toString('base64')

const makeblob = function (dataURL) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

const faceUrl = 'http://drawingwoo.com/wp-content/uploads/2016/08/paintings-of-old-people-an-old-man-drawing-digital-paint-judyar-on-deviantart.jpg'

request({
  method: 'POST',
  // url: 'https://api.projectoxford.ai/emotion/v1.0/recognize',
  url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': 'fbaebc54c4784496b7f6f2ca426f82c8'
  },
  data: encodedImage,
  processData: false
  // body: JSON.stringify({
    // url: faceUrl
  // })
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var object = JSON.parse(body);
    console.dir(object, {depth: null, colors: true})
  }
})
