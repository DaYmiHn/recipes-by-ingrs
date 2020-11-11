import React, { Component } from 'react';
import client from '../config/feathers';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myIngredients: [],
      searchedIngredients: []
    };
  }
  componentDidMount(){
    this.getData();
    client.service('ingredient').find({
      query: {
        $select: [ 'title' ],
        $limit: 100
      }
    }).then(({data})=>{
      if(data !== [])
      this.setState({searchedIngredients:data})
    });
  }

  getData(){
    console.log('getData')
    console.log(this.props.profile.user.email)
    client.service('users').find({
      query: {email: this.props.profile.user.email}
    }).then(({data})=>{
      console.log(data)
      this.setState({myIngredients:data[0].ingredients}) 
    });
  }
  
  addIngredient(ingr){
    if(!this.state.myIngredients.includes(ingr))
      client.service('users').find({
        query: {email: this.props.profile.user.email}
      }).then(({data})=>{
        data = data[0];
        // console.log(data.ingrs);
        if(data.ingredients)
          data.ingredients.push(ingr)
        else
          data.ingredients = [ingr]
        client.service('users').patch(data._id, data).then(()=>{
          this.getData()
        })
      });
    else
      window.alert('Уже в холодильнике')
    
  }

  removeIngredient(ingr){
    // if(!this.state.myIngredients.includes(ingr))
      client.service('users').find({
        query: {email: this.props.profile.user.email}
      }).then(({data})=>{
        data = data[0];
        // console.log(data.ingrs);
        if (data.ingredients.indexOf(ingr) > -1) {
          data.ingredients.splice(data.ingredients.indexOf(ingr), 1);
        }

        // if(data.ingredients)
        //   data.ingredients.push(ingr)
        // else
        //   data.ingredients = [ingr]
        client.service('users').patch(data._id, data).then(()=>{
          this.getData()
        })
      });
    // else
      // window.alert('Уже в холодильнике')
    
  }

  getQueringResult(str){
    console.log(str)
    client.service('ingredient').find({
      query: {
        title: { $search: str},
        $select: [ 'title' ],
        $limit: 100
      }
    }).then(({data})=>{
      if(data !== [])
      this.setState({searchedIngredients:data})
    });
  }

  render() {
    return <div className='row z-depth-2' style={{padding:'10px'}} >
    <div className='col m4 s12'>
      <div className="row" style={{marginBottom: '0px', marginTop: '30px' }}>
        <div className="input-field">
          <input id="ingredient_typing" type="text" className="validate"  onChange={(e)=>this.getQueringResult(e.target.value)}/>
          <label htmlFor="ingredient_typing">Введите ингредиент</label>
        </div>
      </div>
      <div className="row" style={{maxHeight:'400px', overflow: 'auto'}}>
        <ul className="collection">
        { this.state.searchedIngredients && 
        this.state.searchedIngredients.map((value, index) => {
          return <li key={index} style={{cursor:'pointer', marginBottom: '1px'}} className="collection-item hoverable" onClick={()=>this.addIngredient(value.title)}>{value.title}</li>
        })}
        </ul>
      </div>
    </div>


    <div className='col m8 s12'>
      <h4>Ваши ингредиенты</h4>
      <p>Для удаления можно просто нажать</p>
      { this.state.myIngredients && 
        this.state.myIngredients.map((value, index) => {
        return <button key={index} className="waves-effect waves-light btn" style={{margin: '0 5px 5px 0'}} onClick={()=>this.removeIngredient(value)}>{value}</button>
      })}
    </div>
  </div>;
  }
}
