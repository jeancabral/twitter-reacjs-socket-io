import React, { Component } from "react";

import twiiterLogo from "../twitter.svg";

import "./Login.css";

export default class Login extends Component {

  state = {
      username: '',
      password: '',

  };

  handleSubmit = e => {
      e.preventDefault();

      const { username } = this.state;

      if (!username.length) return;

      localStorage.setItem('username', username)

      this.props.history.push('/timeline')
  }

  handleInputUserNameChange = e => {
      this.setState({ username: e.target.value })
  }

  handleInputPasswordChange = e => {
    this.setState({ password: e.target.value })
}

  render() {

    return (
      <div className="login-wrapper">
        <img src={twiiterLogo} alt="Twitter Clone" />
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.username}
            onChange={this.handleInputUserNameChange}
            placeholder="Nome de usuário"
          />
          <input
            value={this.state.password}
            onChange={this.handleInputPasswordChange}
            placeholder="Senha de Acesso"
            type="password"
          />
          <button type="submit" value="Entrar">
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
