import axios from "axios";
import {url} from "../Util/url";
import {toQuery} from "../Util/utils";
import {User, UserTypes} from "../Models/User";

/**
 * Registers a new user. UserTypes are associated by Id (Look in User.js)
 * Returns an appropriate message if success or failed.
 * @param username
 * @param password
 * @param email
 * @param restaurantName
 * @param supplierName
 * @param usertype
 * @returns {Promise<AxiosResponse<any> | T>}
 */
const register = (username, password, email, restaurantName, supplierName, usertype) => {
    const request = {
        username: username,
        password: password,
        usertype: usertype,
        email: email,
        restaurantName: restaurantName,
        supplierName: supplierName
    };

    return axios.post(`http://${url}:8000/register?` + toQuery(request)).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err.response);
        return err.response.data;
    });
}

/**
 * Login in as a user. Returns a User object.
 * Returns appropriate message if incorrect password.
 * @param username
 * @param password
 * @returns {Promise<AxiosResponse<any> | T>}
 */
const login = (username, password) => {
    const request = {
        username: username,
        password: password
    };

    return axios.get(`http://${url}:8000/login?` + toQuery(request)).then(res => {
        let userData = res.data;
        let user = new User(userData.userID, username, userData.email, password, userData.userType, null);
        if(userData.userType !== UserTypes.SUPPLIER) {
            return getUserRestaurantId({id: userData.userID}).then((id) => {
                user.restaurantId = id;
                return user;
            });
        } else {
            return user;
        }
    }).catch(err => {
        console.log(err.response);
        return err.response.data;
    });
}

const deleteUser = (user) => {
    return axios.delete(`http://${url}:8000/user/` + user.id).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

// TODO Need getEmployee and getSupplier

const deleteEmployee = (user) => {
    return axios.delete(`http://${url}:8000/employee/` + user.id).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const deleteSupplier = (user) => {
    return axios.delete(`http://${url}:8000/employee/` + user.id).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

/**
 * Gets the restaurantId a user is associated with.
 * @param user
 * @returns {Promise<AxiosResponse<any>>}
 */
const getUserRestaurantId = (user) => {
    return axios.get(`http://${url}:8000/employee/` + user.id).then(res => {
        return res.data[0].restaurantID;
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

/**
 * Returns the user that is currently logged in.
 * @returns {Promise<AxiosResponse<any>>}
 */
const getLoggedIn = () => {
    let userId = sessionStorage.getItem("userId");

    return axios.get(`http://${url}:8000/user/` + userId).then(res => {
        let data = res.data[0];
        return login(data.username, data.password).then((user) => {
            return user;
        });
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

export {
    login,
    register,
    deleteUser,
    deleteEmployee,
    getUserRestaurantId,
    getLoggedIn
}