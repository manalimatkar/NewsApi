
var news = require('./news.js');

news.getNews('business', function(data){
  console.log(data);
})
