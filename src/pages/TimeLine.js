import React, { Component } from 'react';
import socket from "socket.io-client";

import twiiterLogo from "../twitter.svg";

import "./Timeline.css";
import api from '../services/api';
import Tweet from '../components/Tweet';

export default class TimeLine extends Component {
  state = {
    tweets: [],
      newTweet: "" 
  };

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  }

  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem('username')

    await api.post('/tweets', { author, content });

    this.setState({ 
      newTweet: "" 
    })
  }

  async componentDidMount() {

    this.subscribeToEvents();

    const response = await api.get('/tweets');

    this.setState({ tweets: response.data })
  }

  subscribeToEvents = () => {

    const io = socket('http://localhost:3000');
    
    io.on("tweet", data => {
      this.setState({ tweets: [data, ...this.state.tweets] })
    });

    io.on("like", data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      })
    });

  }

  render() {

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
            <Tweet key={tweet._id} tweet={tweet} />
          )}
        </ul>
      </div>
    );
  }
}

