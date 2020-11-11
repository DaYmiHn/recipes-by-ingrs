import React, { Component } from 'react';
import client from '../config/feathers';
import io from 'socket.io-client';
import Loader from '../components/loader';
const axios = require('axios');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      loading: true
    };
  }
  componentDidMount(){
    console.log('componentDidMount')
    // console.log(this.props.profile.user.email)
    // console.log(client.host)
    axios.get(client.host+'/getAllRecipes/'+this.props.profile.user.email).then((data)=>{
      console.log(data.data)
      this.setState({recipes: data.data});
      this.setState({ loading: false });
      window.M.Tooltip.init(document.querySelectorAll('.tooltipped'))
    });
  }
  getCountMissIngr(order,size){
    let perc = order/size*100
    console.log(perc)
    if (perc == 100 )
      return "#26a69a"
    else if (perc > 40 && perc <100)
      return "orange"
    else 
      return "red"   
  }

  formatIngrsList(recipe){
    let res = '<ul>';
    recipe.ingredients.forEach(el=>{
      res += `<li>${el}</li>`
    })
    res += '</ul>'
    return res
  }
  // window.M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  render() {
    return <div className='row z-depth-3' style={{padding:'10px'}} >
    { this.state.recipes !== undefined && 
      this.state.recipes.map((value, index) => {
      // return <li key={index} style={{cursor:'pointer', marginBottom: '1px'}} className="collection-item hoverable"><a href={value.url}>{value.title}</a></li>
        return <div key={index} className="card small col s6 m3 z-depth-1" style={{borderRadius:"10px"}}>
        <div className="card-image" style={{ maxHeight: "80%"}}>
          <img src="https://sun9-57.userapi.com/8YkHhEOfltB8MAW2S87W7vVfqoWG3XTMMrNYmQ/p5HbaZtXPF4.jpg"/>
          <span className="card-title">{value.title}</span>
        </div>
        <div className="card-action">
          <a href={value.url}>Открыть</a>
          <span  data-position="top" data-tooltip={this.formatIngrsList(value)} style={{backgroundColor: this.getCountMissIngr(value.order,value.size)}} className="new badge tooltipped" data-badge-caption="">{value.order} из {value.size} есть</span>
        </div>
      </div>
    })}
    { this.state.loading == true &&  <Loader/>
      
      
    }
  </div>;
  }
}
