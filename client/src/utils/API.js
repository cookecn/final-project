import axios from "axios";
const query = ['gaming', 'environment', 'non-profit', 'food'];
const newsKey = process.env.REACT_APP_NEWSAPI_KEY;
const BASEURL = "https://newsapi.org/v2/everything?q=" + query + "&from=2019-06-02&sortBy=publishedAt&apiKey=" + newsKey;

export default {
    searchNews: function(query) {
      return axios.get(BASEURL + query);
    },
    getNews: function() {
      return axios("/api/news");
    },
    saveNews: function(newsData) {
      return axios.post("/api/news", newsData);
    },
    deleteNews: function(id) {
      return axios.delete("api/news/" + id)
    }
  };