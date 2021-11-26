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
    return axios.get(`http://${url}:8000/Restaurant/` + id).then(res => {
        let resData = res.data[0];
        return new Restaurant(id, resData.name, resData.dateJoined, resData.active);
    }).catch(err => {
        console.log(err.response);
        return err.response.data;
    });
}

export {
    getRestaurantById
}