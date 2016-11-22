// We are using new api for getting news content from different sources and different categories
// Include new api
var NewsApi = require('news-api-njs'),
    config = require('./config/config.json');
    console.log(config);
// authentication
var news = new NewsApi({
    apiKey: config.apiKey
});

// define global arrays
var sourceArr = [];

var articlesArry = [];

// this code will cover search for top stories from 
// multiple sources when user selects the category ui for now its hardcoded
news.getSources({
	category: 'business', //replace category with value user selects
	language: 'en',
	country: 'us'
}).then(function(res) {
	// console.log(res.sources.length);
	var category = res.sources[0].category;
	// for number of resources present create a array of source object.
	for (var i = 0; i < res.sources.length; i++) {
		var categorysource = {
			categoryName : category,
			sourceName: res.sources[i].id,
			sortBy: res.sources[i].sortBysAvailable[0],
			sourceDetails : res.sources[i]
		}
		//push categorysource to array
		sourceArr.push(categorysource);	
	}

	console.log(sourceArr);	
	// call function to fetch articles from each source 
	fetchArticleData();

	// PROBLEM IS HERE AFTER I PUSH THE ARTICLES RESULT TO ARRAY 
	//ITS NOT AVAILABLE EXCEPT INSIDE THE FOR LOOP INSIDETHE ABOVE FUNCITION
	console.log(articlesArry);

}).catch(function(err) {
	console.log(err);
});



var fetchArticleData = function(){
	for (var j = 0; j < sourceArr.length ; j++) {

		news.getArticles({
			source: sourceArr[j].sourceName,
			sortBy: sourceArr[j].sortBy
		}).then(function(result) {
			articlesArry.push(result);	
			console.log("=========================================================");
			console.log(articlesArry);	
			console.log("=========================================================");			
				
		}).catch(function(err) {
			console.log(err);
		});	
	}
    // ARTICLESARRY IS EMPTY HERE
	console.log("=========================================================");
	console.log(articlesArry);	
	console.log("=========================================================");		
}




