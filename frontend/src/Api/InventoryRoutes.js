import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";
import {InventoryItem} from "../Models/InventoryItem";

const getInventory = (restaurantId) => {
    return axios.get(`http://${url}:8000/inventory/` + restaurantId).then(res => {
        let inventory = [];
        for(let ii of res.data) {
            inventory.push(ii);
        }
        return inventory;
    }).catch(err => {
        console.log(err.response);
        return err.response;
    });
}

const addInventoryItem = (item, restaurantId) => {
    let request = {
        restaurantId: restaurantId,
        productId: item.product.id,
        stock: item.stock,
        minVal: item.minStock
    };

    return axios.post(`http://${url}:8000/inventory?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const updateInventoryItem = (item, restaurantId) => {
    let request = {
        restaurantId: restaurantId,
        productId: item.product.id,
        stock: item.stock,
        minVal: item.minStock
    };

    return axios.put(`http://${url}:8000/inventory?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const deleteInventoryItem = (item, restaurantId) => {
    let request = {
        productId: item.product.id
    };

    return axios.delete(`http://${url}:8000/inventory/` + restaurantId + "?" + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}


export {
    getInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
}