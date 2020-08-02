import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import foodRequestReducer from './foodRequestReducer';
import drinkRequestReducer from './drinkRequestReducer';
import categoriesFoodsReducer from './categoriesFoodsReducer';
import categoriesDrinksReducer from './categoriesDrinksReducer';

const rootReducer = combineReducers({
  loginReducer,
  foodRequestReducer,
  drinkRequestReducer,
  categoriesFoodsReducer,
  categoriesDrinksReducer,
});

export default rootReducer;
