import { GET_POSTS, NEW_POST, DELETE_POST } from './types';
import axios from 'axios';
import { tokenConfig } from './authAction';

export const getPosts = () => (dispatch, getState) => {
    axios.get('/posts', tokenConfig(getState))
    .then(res => dispatch({
        type: GET_POSTS,
        payload: res.data
    }));
}

export const addPost = (post) => (dispatch, getState) => {
    axios.post('/posts', post, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_POST,
        payload: res.data
    }));
}

export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`/posts/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_POST,
        payload: id
    }));
}