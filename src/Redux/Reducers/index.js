import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import foodRequestReducer from './foodRequestReducer';
import drinkRequestReducer from './drinkRequestReducer';
import categoriesFoodsReducer from './categoriesFoodsReducer';
import categoriesDrinksReducer from './categoriesDrinksReducer';
import headerAndFooterReducer from './headerAndFooterReducer';

const rootReducer = combineReducers({
  loginReducer,
  foodRequestReducer,
  drinkRequestReducer,
  categoriesFoodsReducer,
  categoriesDrinksReducer,
  headerAndFooterReducer,
});

export default rootReducer;
