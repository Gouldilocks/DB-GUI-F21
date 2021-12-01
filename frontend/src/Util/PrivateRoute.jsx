import React from 'react';
import {Navigate} from 'react-router-dom';
import {isLogin} from './utils';

const LoggedOut = ({children}) => {
    return (
        isLogin() ? children : <Navigate to="/login"/>
    );
};

const LoggedIn = ({children}) => {
    return (
        isLogin() ? <Navigate to="/"/> : children
    );
};

export {
    LoggedOut,
    LoggedIn
}