var OAuth = require('oauth').OAuth;

var connection = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'wfYzSL9C1BOaf5VlNm1lw',
  '3oe4v2CyFO1Nd0GhdzX8Ww2nWpCxBVLh1CVn0JNkuEo',
  '1.0A',
  null,
  'HMAC-SHA1'
);
console.log(connection);
connection.get(
  'https://stream.twitter.com/1.1/statuses/filter.json?track=twitter',
  '271359180-fmh4JpOdTC0K2nF0QlB2GwyI6q5Cr3Q3WDA8jd41',
  'r0TCSqMyZDezNjv2JKvunDXPy7XwryjFeOv2gG3qsVuNM',
  function (e, data, res){
    if(e) {
      console.error(e);
    } else {
      var s_data = JSON.parse(data);
      console.log(s_data);
    }
    done();
  }
);