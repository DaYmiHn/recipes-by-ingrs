import React, { Component } from 'react';
import Login from './screens/auth';
import Main from './screens/main';
import Loader from './components/loader';
import client from './config/feathers';

class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    const ingredient = client.service('ingredient');
    const users = client.service('users');
    
    client.authenticate().catch((error) => {console.log(error);this.setState({ login: null })});
    
    client.on('authenticated', login => {
      console.log(login.user.email)
      Promise.all([
        ingredient.find({
          query: {
            $sort: { createdAt: -1 },
            $limit: 25
          }
        }),
        users.find()
      ]).then( ([ messagePage, userPage ]) => {
        const ingredient = messagePage.data.reverse();
        const users = userPage.data;
        
        this.setState({ login, ingredient, users });
      });
      
    });
    
    client.on('logout', () => this.setState({
      login: null,
      ingredient: null,
      users: null
    }));
    
    ingredient.on('created', ingredient => this.setState({
      ingredient: this.state.ingredient.concat(ingredient)
    }));

    users.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));
  }

  render() {
    if(this.state.login === undefined) {
      return <Loader />;
    } else if(this.state.login) {
      return <Main profile={this.state.login}/>;
    }
    return <Login />;
  }
}

export default Application;
