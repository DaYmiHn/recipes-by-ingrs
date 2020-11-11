import React, { Component } from 'react';
import client from '../config/feathers';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };
  }
  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;

    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => this.setState({ error }));
  }

  signup() {
    const { email, password } = this.state;

    return client.service('users')
      .create({ email, password })
      .then(() => this.login());
  }
  render() {
    return <div className="row">
    <div className="col s12 m6 offset-m3 center">
      <h3 className="font-100">Вход</h3>
          <p style={{color:'red'}}>{this.state.error && this.state.error.message}</p>
      {/* <div className="row">
        <div className="input-field col s6">
          <input id="first_name" type="text" className="validate"/>
          <label htmlFor="first_name">Имя</label>
        </div>
        <div className="input-field col s6">
          <input id="last_name" type="text" className="validate"/>
          <label htmlFor="last_name">Фамилия</label>
        </div>
      </div> */}
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" onChange={ev => this.setState({ email: ev.target.value})}/>
          <label htmlFor="email">Почта</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" onChange={ev => this.setState({ password: ev.target.value})}/>
          <label htmlFor="password">Пароль</label>
        </div>
      </div>
      <div className="row">
          <button className="waves-effect waves-light btn col s12"  onClick={() => this.login()}>Войти</button>
      </div>
      <div className="row">
          <button className="waves-effect waves-light btn col s12"  onClick={() => this.signup()}>Зарегистрироваться</button>
      </div>
    </div>
  </div>;
  }
}
