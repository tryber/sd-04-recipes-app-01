import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducers';



const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//const store = applyMiddleware(thunk)(createStore)(rootReducer, devTools);

export default store;
