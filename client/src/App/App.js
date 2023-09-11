import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {LandingPage,Home,Details,Form,OnSearch} from './index.js';

function App() {
  return (
    <div className="App">
     <Switch>
     <Route path="/" exact component={LandingPage} />
      <Route path="/home" exact component={Home} />
      <Route path="/videogame/:id" exact component={Details} />
      <Route path="/videogames/form" exact component={Form} />
      <Route path="/videogames/search" exact component={OnSearch} />

     </Switch>
    </div>
  );
}

export default App;

