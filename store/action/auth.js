import AsyncStorage from '@react-native-async-storage/async-storage';
// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const AUTHENTICATE = 'AUTHENTICATE';
let timer;

export const setDidTryAL = () => {
    return { type: SET_DID_TRY_AL };
  };

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token})
    };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB907390BLI_mPxruGHafJHOeb-XjycbFo',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wront!';
            if(errorId === 'EMAIL_EXISTS'){
                message = 'This email exists already!'
            }
            
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB907390BLI_mPxruGHafJHOeb-XjycbFo',
        {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok){
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wront!';
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'This email could not be found!'
            }
            else if(errorId === 'INVALID_PASSWORD'){
                message = 'This password is not valid!'
            }
            throw new Error(message);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken , parseInt(resData.expiresIn) * 1000));
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }));
}

export const logout = () => {
    clearLogoutTime();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

const clearLogoutTime = () => {
    if(timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() =>{
            dispatch(logout());
        }, expirationTime);
    };
};