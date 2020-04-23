import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types.js'

// Token Config
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Helpers
    const config = {
        helpers: {
            "Content-Type": "application/json"
        }
    }

    // If token, add to helpers config
    if (token) {
        config.helpers["Authorization"] = `Token ${token}`
    }

    return config
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading 
    dispatch({
        type: USER_LOADING
    })

    // Get Token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    // Making Request to get the user
    axios.get('/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
}


// LOGIN USER
export const login = (username, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username,
        password
    })

    // Making Request to get the user
    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


//Register User
export const register = ({ username, password, email }) => (dispatch) => {


    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({
        username,
        email,
        password
    })

    // Making Request to get the user
    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    // Get Token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    // Making Request to get the user
    axios.post('/api/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            console.log(err)
        })
}
