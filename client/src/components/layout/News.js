//Updated article API page, will implement later.

/*import React, { Component } from "react";
import API from "../../utils/API";

class News extends Component {
  state = {
    articles: [],
    search: ""
  };

  searchNews = query => {
    API.searchNews(query)
      .then(res =>
        this.setState(
          {
            articles: res.data.items,
            search: ""
          },
          console.log(res.data.items)
        )
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  };

  deleteNews = id => {
    API.deleteNews(id)
      .then(res => console.log(res.status))
      .catch(err => console.log(err));
  };

  handleSaveNews = newsData => {
    API.saveNews(newsData)
      .then(res => alert("Article Saved"))
      .catch(err => console.log(err));
  };

  render() {
    const NewsItem = (article, id) => (
      <li className="collection-item avatar" key={id}>
        <i className="material-icons circle red">play_arrow</i>
        <span className="title">
          <a href={`${article.url}`}>{article.title}</a>
        </span>
        <p>
          {article.author}
          <br />
          {article.description}
        </p>
      </li>
    );

    const newsItems = this.state.newsItems.map(e => NewsItem(e, pushid()));
    return (
        <div className="container">
            
            <ul className="collection with-header">
            {newsItems}
            </ul>
        </div>
    );
  }
}

export default News;

*/
