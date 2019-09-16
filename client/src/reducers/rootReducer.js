import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './authReducer';
import errReducer from './errReducer';


export default combineReducers({
    postRed: postReducer,
    authRed: authReducer,
    errRed: errReducer
});