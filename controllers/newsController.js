const db = require('../models');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const fetchNews = (searchTerm, pageNum) => 
  newsapi.v2.everything({
    q: searchTerm,
    language: 'en',
    page: pageNum,
    pageSize: 10,
  });

  
module.exports = {
    findAll: function(req,res) {
        db.News
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.News
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.News
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.News
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(404).json(err));
    }
};