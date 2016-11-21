var NewsApi = require('news-api-njs'),
    config = require('./config/config.json');
    console.log(config);

var news = new NewsApi({
    apiKey: config.apiKey
});

//You can also use promises!
news.getSources({
	category: 'business',
	language: 'en',
	country: 'us'
}).then(function(res) {
	console.log(res);
}).catch(function(err) {
	console.log(err);
});

// news.getArticles({
// 	source: 'ars-technica',
// 	sortBy: 'latest'
// }).then(function(res) {
// 	console.log(res);
// }).catch(function(err) {
// 	console.log(err);
// });