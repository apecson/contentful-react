import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import Page from './components/Page';

class App extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:slug" component={Page} />
      </Switch>
    );
  }
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)



export default App;
