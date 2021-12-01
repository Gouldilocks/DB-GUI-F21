import axios from "axios";
import {url} from "../Util/url";
import {toQuery} from "../Util/utils";
import {Restaurant} from "../Models/Restaurant";

/**
 * Gets a restaurant by its ID.
 * @param id
 * @returns {Promise<Restaurant | T>}
 */
const getRestaurantById = (id) => {
    return axios.get(`http://${url}:8000/restaurant/` + id).then(res => {
        console.log(res);
        let resData = res.data[0];
        return new Restaurant(id, resData.name, resData.dateJoined, resData.active);
    }).catch(err => {
        console.log(err);
        return null;
    });
}

const getRestaurantByName = (name) => {
    let request = {
        restaurantName: name
    }

    return axios.get(`http://${url}:8000/restaurant?` + toQuery(request)).then(res => {
        let resData = res.data[0];
        return new Restaurant(resData.restaurantID, name, resData.dateJoined, resData.active);
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

export {
    getRestaurantById,
    getRestaurantByName
}