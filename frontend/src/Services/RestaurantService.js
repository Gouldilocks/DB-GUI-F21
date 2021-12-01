import {getRestaurantById, getRestaurantByName} from "../Api/RestaurantRoutes";

export class RestaurantService {

    loadRestaurant(id, callback) {
        getRestaurantById(id).then((restaurant) => {
            callback(restaurant);
        });
    }

    loadRestaurantByName(name, callback) {
        getRestaurantByName(name).then((restaurant) => {
            callback(restaurant);
        });
    }

}