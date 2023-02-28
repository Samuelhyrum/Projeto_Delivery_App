import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Products from './pages/Products';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ Products } />
    </Switch>

  );
}
export default App;
