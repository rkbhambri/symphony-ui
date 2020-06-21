/*
 * This file contains store (accessible to all components) which get manipulated based on dispatched actions for Authentication
 */

import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isLoginFailed: null,
    isAuthenticated: localStorage.getItem('auth')
};

const loginSuccess = (state, action) => {
    localStorage.setItem('auth', true);
    return updateObject(state, {
        isAuthenticated: true
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        isLoginFailed: true
    });
};

const logout = (state, action) => {
    localStorage.removeItem('auth');
    return updateObject(state, {
        isAuthenticated: false
    });
};

const resetLoginFailFlag = (state, action) => {
    localStorage.removeItem('auth');
    return updateObject(state, {
        isLoginFailed: null
    });
};


const login = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:
            return loginFail(state, action);
        case actionTypes.LOGOUT:
            return logout(state);
        case actionTypes.RESET_LOGIN_FAIL_FLAG:
            return resetLoginFailFlag(state);
        default:
            return state;
    }
};

export default login;
