import * as actionTypes from './actionTypes';

export const login = (email, password) => {
    if (email === 'signzy@gmail.com' && password === 'Signzy@123') {
        return loginSuccess();
    } else {
        return loginFail();
    }
};

export const loginSuccess = () => ({
    type: actionTypes.LOGIN_SUCCESS
});

export const loginFail = () => ({
    type: actionTypes.LOGIN_FAIL
});

export const logout = () => ({
    type: actionTypes.LOGOUT
});

export const resetLoginFailFlag = () => ({
    type: actionTypes.RESET_LOGIN_FAIL_FLAG
})
