import React, { Component } from 'react';

import twiiterLogo from "../twitter.svg";

import "./Timeline.css";
import api from '../services/api';

export default class TimeLine extends Component {
  state = {
    newTweet: '',
    tweets: [],
  };

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('username')

    await api.post('/tweets', { author, content });

    this.setState({ newTweet: '' })
  }

  async componentDidMount() {
    const response = await api.get('/tweets');
    this.setState({ tweets: response.data })
  }

  render() {
    console.log(this.state.tweets)

    const { tweets } = this.state;

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
        <ul className="tweet-list">
          {tweets.map((tweet) =>
            <li key={tweet._id}>{tweet.author}</li>
          )}
        </ul>
      </div>
    );
  }
}

