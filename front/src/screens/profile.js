import React, { Component, useState } from 'react';
import client from '../config/feathers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function Profile(props) {
  let match = useRouteMatch();
  // client.service('ingredient').find({
  //   query: {title: "яблоко"}
  // }).then(({data})=>{
  //   data = data[0];
  //   // console.log(data.ingrs);
  //   if(data.ingrs)
  //     data.ingrs.push('3')
  //   else
  //     data.ingrs = ['4']
  //   console.log(data.ingrs)
  //   client.service('ingredient').update(data._id, data)
  // });
  // console.log(ingredient);
  // console.log(props.profile)
  return (
    <div>
      <h2>{props.profile.user.email}</h2>
      <img src={props.profile.user.avatar} />
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
