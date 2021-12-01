import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import {UserTypes} from '../Models/User';
import { url } from '../Util/url';
import { register } from "../Api/UserRoutes";
import "../Styles/Signup.scss"

export const SignUpPage = ({ handleClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [userType, setUserType] = useState(0);
    const [restaurantName, setRestaurantName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        if(password !== conPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
        register(username, password, email, restaurantName, userType).then((result) => {
            if(result === "Registered account successfully")
                setSuccessMsg(result);
            else
                setErrorMsg(result);
        });
    };

    return (
        <div className="signup-root">
            <form>
                <TextField
                    label="Username"
                    variant="filled"
                    required
                    value={username}
                    onChange={temp => setUsername(temp.target.value)}
                />
                <TextField
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={temp => setEmail(temp.target.value)}
                />
                <TextField
                    label="Password"
                    variant="filled"
                    type="password"
                    required
                    value={password}
                    onChange={temp => setPassword(temp.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    variant="filled"
                    type="conPassword"
                    required
                    value={conPassword}
                    onChange={temp => setConPassword(temp.target.value)}
                />
                <div className="d-flex flex-column">
                    <InputLabel id="userType-select-label" className="mb-2" variant="standard">User Type</InputLabel>
                    <Select
                        labelId="userType-select-label"
                        label="User Type"
                        required
                        value={userType}
                        onChange={temp => setUserType(temp.target.value)}
                    >
                        <MenuItem value={1}>Employee</MenuItem>
                        <MenuItem value={2}>Restaurant Manager</MenuItem>
                        <MenuItem value={3}>Supplier</MenuItem>
                    </Select>
                </div>
                {(userType === 1 || userType === 2) ?
                    <TextField
                        label="Restaurant Name"
                        variant="filled"
                        type="restaurant"
                        required
                        value={restaurantName}
                        onChange={temp => setRestaurantName(temp.target.value)}/>
                    : null
                }
                {(errorMsg.length > 0) ? <p className="text-danger">* {errorMsg}</p> : null}
                {(successMsg.length > 0) ? <p className="text-success">{successMsg}</p> : null}
                <div className="d-flex flex-row justify-content-center gap-5">
                    <button type="button" className="btn btn-primary w-50" onClick={(event) => handleSubmit(event)}>Register</button>
                    <Link type="button" className="btn btn-outline-primary w-50" to="/Login">Cancel</Link>
                </div>
            </form>
        </div>
    );
};