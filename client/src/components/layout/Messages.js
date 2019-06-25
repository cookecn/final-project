import React, { Component } from "react";
import API from "../../utils/API";
//import { Link } from "react-router-dom";

class Messages extends Component {
  state = {
    name: "",
    messages: "",
    date: ""
  };

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages = () => {
    API.getMessages()
      .then(res => this.setState({ messages: res.data, name: "", message: "" }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.message) {
      API.saveMessage({
        name: this.state.name,
        message: this.state.message,
        date: this.state.date
      })
        .then(res => this.loadMessages())
        .catch(err => console.log(err));
    }
  };
  //handleClick () {
  //API.get("/api/messages/messages")
  //.then(response => this.setState({name: response.data.name, message: response.data.message}))
  //}

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        >
        <div className="container">
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <textarea
                    id="textarea1"
                    className="materialize-textarea name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    name="name"
                  />
                  <label htmlFor="textarea1">Name</label>
                </div>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                type="text"
                className="materialize-textarea message"
                value={this.state.message}
                onChange={this.handleInputChange}
                name="message"
              />
              <label htmlFor="textarea1">Message</label>
            </div>
          </div>
          <button
            className="waves-effect waves-light btn"
            disabled={!(this.state.name && this.state.message)}
            onClick={this.handleFormSubmit}
            id="send"
            href="#!"
          >
            <i className="material-icons right">cloud</i>Send
          </button>
          <div className="row">
            <div className="col s12" id="messages">
              <h4>{this.state.name}</h4>
              <p>{this.state.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Messages;
