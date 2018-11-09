import React, { Component } from 'react';

import twiiterLogo from "../twitter.svg";

import "./Timeline.css";
import api from '../services/api';

export default class TimeLine extends Component {


  state = {
    newTweet: '',
  };

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  }

  handleNewTweet = async e => {

    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('username')

    console.log(content, author)

    await api.post('/tweets', { author, content });

    this.setState({ newTweet: ''})

  }

  render() {

    return (
      <div className="timeline-wrapper">
          <img height={24} src={twiiterLogo} alt="Twitter Clone" />
          <form>
            <textarea 
              value={this.state.newTweet}
              onChange={this.handleInputChange}
              onKeyDown={this.handleNewTweet}
              placeholder="O que está acontecendo?"
            ></textarea>
          </form>
      </div>
    );
  }
}
