import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Meals from './Pages/Meals';
import Login from './Pages/Login';
import Drinks from './Pages/Drinks';
import Explore from './Pages/Explore';
import ExploreByFood from './Pages/ExploreByFood';
import ExploreByDrink from './Pages/ExploreByDrink';
import ExploreByFoodIngredients from './Pages/ExploreByFoodIngredients';
import ExploreByDrinkIngredients from './Pages/ExploreByDrinkIngredients';
import ExploreByArea from './Pages/ExploreByArea';
import Profile from './Pages/Profile';
import RecepiesDone from './Pages/RecepiesDone';
import RecepiesFavorited from './Pages/RecepiesFavorited';
import DetailsFood from './Pages/DetailsFood';
import DetailsDrink from './Pages/DetailsDrink';
import MeaslInProgress from './Pages/MealsInPropgress';
import DrinkslInProgress from './Pages/DrinksInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={Meals} />
      <Route exact path="/bebidas" component={Drinks} />
      <Route exact path="/explorar" component={Explore} />
      <Route exact path="/explorar/comidas" component={ExploreByFood} />
      <Route exact path="/explorar/bebidas" component={ExploreByDrink} />
      <Route exact path="/explorar/comidas/ingredientes" component={ExploreByFoodIngredients} />
      <Route exact path="/explorar/bebidas/ingredientes" component={ExploreByDrinkIngredients} />
      <Route exact path="/explorar/comidas/area" component={ExploreByArea} />
      <Route exact path="/perfil" component={Profile} />
      <Route exact path="/receitas-feitas" component={RecepiesDone} />
      <Route exact path="/receitas-favoritas" component={RecepiesFavorited} />
      <Route exact path="/comidas/:id" component={DetailsFood} />
      <Route exact path="/bebidas/:id" component={DetailsDrink} />
      <Route exact path="/comidas/:id/in-progress" component={MeaslInProgress} />
      <Route exact path="/bebidas/:id/in-progress" component={DrinkslInProgress} />
    </Switch>
  );
}

export default App;
