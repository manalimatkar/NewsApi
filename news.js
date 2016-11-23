'use strict'

var NewsApi = require('news-api-njs'),
    config = require('./config/config.json');
var news = new NewsApi({
    apiKey: config.apiKey
});


module.exports = {
  getNews: function(category, cb) {
    var articlesArry = [];

    news.getSources({
        category: category,
        language: 'en',
        country: 'us'
    }).then(function(res) {

        for(let i = 0; i < res.sources.length; i++) {

        news.getArticles({
                source: res.sources[i].id,
                sortBy: res.sources[i].sortBysAvailable[0]
            }).then(function(result) {
                articlesArry.push({
            category: category,
            sourceDetails: res.sources[i],
            articles: result
          });
          if (articlesArry.length === res.sources.length) {
            cb(articlesArry);
          }
            }).catch(function(err) {
                console.log(err);
            });

        }
    }).catch(function(err) {
        console.log(err);
    });
  }
}
