import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";

/// TODO Deal with OrderDetails and Orders here. Merge these

/**
 * Adds an order to the order table.
 * @param order
 * @returns {Promise<boolean>}
 */
const addOrder = (order) => {
    let request = {
        orderDate: order.orderDate,
        shippedDate: order.shippedDate,
        arrivalDate: order.arrivalDate,
        address: order.address,
        carrier: order.carrier,
        delivered: order.delivered
    };

    return axios.post(`http://${url}:8000/order?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

/**
 * Update an order on the order table.
 * @param order
 * @returns {Promise<boolean>}
 */
const updateOrder = (order) => {
    let request = {
        orderDate: order.orderDate,
        shippedDate: order.shippedDate,
        arrivalDate: order.arrivalDate,
        address: order.address,
        carrier: order.carrier,
        delivered: order.delivered
    };

    return axios.put(`http://${url}:8000/order/${order.id}?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const deleteOrder = (orderId) => {
    return axios.delete(`http://${url}:8000/order/` + orderId).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

export {
    addOrder,
    updateOrder,
    deleteOrder
}