import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { login } from "../Api/UserRoutes";
import "../Styles/Login.scss";
import logo from "../Resources/logo.svg";
import {UserService} from "../Services/UserService";

export const LoginPage = ({ handleClose }) => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const userService = new UserService();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg("");
        login(username, password).then((result) => {
            if(result.constructor.name === "User") {
                sessionStorage.setItem("userId", result.id);

                console.log("Logged in:");
                console.log(result);

                userService.loadUser((user) => {
                    console.log("Loaded User:");
                    console.log(userService.getUser());
                    navigate("/");
                });
            } else {
                setErrorMsg(result);
            }
        });
    };

    return (
        <div className="login-root">
            <form>
                <img src={logo} alt="Logo"/>
                <TextField
                    label="Username"
                    variant="filled"
                    required
                    value={username}
                    onChange={temp => setUsername(temp.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={temp => setPassword(temp.target.value)}
                />
                {(errorMsg.length > 0) ? <p className="text-danger">* {errorMsg}</p> : null}
                <div className="d-flex flex-row justify-content-center gap-5">
                    <button type="button" className="btn btn-primary w-50" onClick={(event) => handleSubmit(event)}>Login</button>
                    <button type="button" className="btn btn-outline-primary w-50" onClick={() => navigate("/signup")}>Register</button>
                </div>
            </form>
        </div>
    );
};