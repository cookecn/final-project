import React, { Component } from "react";
import Pusher from 'pusher-js';
import pushid from 'pushid';

class NewsFeed extends Component {
    state = {
      newsItems: [],
    }
  
    componentDidMount() {
      fetch("http://localhost:5000/live")
      .then(response => response.json())
      .then(articles => {
        this.setState({
          newsItems: [...this.state.newsItems, ...articles],
        });
      }).catch(err => console.log(err));
  
      const pusher = new Pusher('edfeac1811c6394a729c', {
        cluster: 'us2',
        ecrypted: true,
      });
  
      const channel = pusher.subscribe('news-channel');
      channel.bind('update-news', data => {
        this.setState({
          newsItems: [...data.articles, ...this.state.newsItems],
        });
      });
    }
    render() {
      const NewsItem = (article, id) => (
        <li key={id}><a href={`${article.url}`}>{article.title}</a></li>
      );
  
      const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));
     return (
        <div className="container">
            <h1 className="App-title">Live News Feed</h1>

            <ul className="news-items">{newsItems}</ul>
        </div>
     );
    }
} 

export default NewsFeed;