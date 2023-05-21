import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer';


const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//para conectar nuestra app con la extenson del navegador
const store = createStore(
    reducer, 
    composeEnhancer(applyMiddleware(thunkMiddleware))
    //sirve para que podamos hacer petcones a una api/servidor
    );






export default store;