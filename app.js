var NewsApi = require('news-api-njs'),
    config = require('./config/config.json');
    console.log(config);

var news = new NewsApi({
    apiKey: config.apiKey
});

var sourceArr = [];

var articlesArry = [];
// this code will cover search for top stories from 
// multiple sources when user selects the category from grid layout
news.getSources({
	category: 'business', //replace category with value user selects
	language: 'en',
	country: 'us'
}).then(function(res) {
	// console.log(res.sources.length);
	var category = res.sources[0].category;
	for (var i = 0; i < res.sources.length; i++) {
		var categorysource = {
			categoryName : category,
			sourceName: res.sources[i].id,
			sortBy: res.sources[i].sortBysAvailable[0]
		}
		sourceArr.push(categorysource);	
	}

	console.log(sourceArr);	

	fetchArticleData();

}).catch(function(err) {
	console.log(err);
});



var fetchArticleData = function(){
	for (var j = 0; j < sourceArr.length ; j++) {
		var sourceName = sourceArr[j].sourceName;
		var sortByOpt = sourceArr[j].sortBy;
		var category = sourceArr[j].categoryName;
		console.log("inside fetchArticleData For Loop " + sourceName);
		news.getArticles({
			source: sourceName,
			sortBy: sortByOpt
		}).then(function(result) {
			// console.log(result);
			// console.log("=============================================================================")
			for (var x = 0; x < result.articles.length; x++) {
				var articleObj = {
					sourceName: sourceName,
					sortByOpt: sortByOpt,
					category: category,
					article: result.articles[x]						
				}
				articlesArry.push(articleObj);
			}
			console.log(articlesArry);
			console.log(articlesArry.length);
		}).catch(function(err) {
			console.log(err);
		});

	}

}




