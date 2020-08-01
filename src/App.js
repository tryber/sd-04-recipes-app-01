import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Comidas from './Pages/Comidas';
import Login from './Pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={Comidas} />
      <Route exact path="/bebidas" component={Login} />
      <Route exact path="/explorar" component={Login} />
      <Route exact path="/explorar/comidas" component={Login} />
      <Route exact path="/explorar/bebidas" component={Login} />
      <Route exact path="/explorar/comidas/ingredientes" component={Login} />
      <Route exact path="/explorar/bebidas/ingredientes" component={Login} />
      <Route exact path="/explorar/comidas/area" component={Login} />
      <Route exact path="/perfil" component={Login} />
      <Route exact path="/receitas-feitas" component={Login} />
      <Route exact path="/receitas-favoritas" component={Login} />
      <Route exact path="/comidas/:id" component={Login} />
      <Route exact path="/bebidas/:id" component={Login} />
      <Route exact path="/comidas/:id/in-progress" component={Login} />
      <Route exact path="/bebidas/:id/in-progress" component={Login} />
    </Switch>
  );
}

export default App;
