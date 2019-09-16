import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import axios from 'axios';
import { returnErrors } from './errAction';


export const loadUser = () => (dispatch, getState) => {

    
    axios.get('/auth/user', tokenConfig(getState))
    .then(res => dispatch({
        type: USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
}

export const register = ({ username, email, password}) => dispatch => {
    
    const config = {
        headers: {
            "content-type": "application/json"
        }
    };
    
    const body = JSON.stringify({ username, email, password });

    axios.post('/users', body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })

}

export const login = ({ email, password}) => dispatch => {
    
    const config = {
        headers: {
            "content-type": "application/json"
        }
    };
    
    const body = JSON.stringify({ email, password });

    axios.post('/auth', body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })

}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}


export const tokenConfig = getState => {
    
    const token = getState().authRed.token;
    
    const config = {
        headers: {
            "content-type": "application/json"
        }
    };
    
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}