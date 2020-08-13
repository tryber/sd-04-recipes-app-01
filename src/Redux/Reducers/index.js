import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import foodRequestReducer from './foodRequestReducer';
import drinkRequestReducer from './drinkRequestReducer';
import categoriesFoodsReducer from './categoriesFoodsReducer';
import categoriesDrinksReducer from './categoriesDrinksReducer';
import detailsFoodsReducer from './detailsFoodsReducer';
import detailsDrinksReducer from './detailsDrinksReducer';
import headerAndFooterReducer from './headerAndFooterReducer';
import randomReducer from './randomReducer';

const rootReducer = combineReducers({
  loginReducer,
  foodRequestReducer,
  drinkRequestReducer,
  categoriesFoodsReducer,
  categoriesDrinksReducer,
  detailsFoodsReducer,
  detailsDrinksReducer,
  headerAndFooterReducer,
  randomReducer,
});

export default rootReducer;
