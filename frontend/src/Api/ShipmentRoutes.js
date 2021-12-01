import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";
import {Shipment} from "../Models/Shipment";

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
        delivered: order.delivered,
        restaurantId: order.restaurantId
    };

    return axios.post(`http://${url}:8000/order?` + toQuery(request)).then(res => {
        console.log(res);

        let promiseArr = [];
        for(const i of order.items)
            promiseArr.push(addOrderDetail(res.data.insertId, i.product.id, i.quantity));

        return Promise.all(promiseArr).then(() => {
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
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

    deleteOrderDetail(order.id).then(() => {
        return axios.put(`http://${url}:8000/order/${order.id}?` + toQuery(request)).then(res => {
            console.log(res);

            let promiseArr = [];
            for(const i of order.items)
                promiseArr.push(addOrderDetail(order.id, i.product, i.quantity));

            Promise.all(promiseArr).then(() => {
                return true;
            }).catch((err) => {
                console.log(err);
                return false;
            });
        }).catch(err => {
            console.log(err.response);
            return false;
        });
    });
}

const deleteOrder = (orderId) => {
    deleteOrderDetail(orderId).then(() => {
        return axios.delete(`http://${url}:8000/order/` + orderId).then(res => {
            console.log(res);
            return true;
        }).catch(err => {
            console.log(err.response);
            return false;
        });
    });
}

const getOrder = (orderId) => {
    return axios.get(`http://${url}:8000/order/` + orderId).then(res => {
        console.log(res);
        let data = res.data[0];
        let order = new Shipment(data.orderID,
                                 data.orderDate,
                                 data.sentDate,
                                 data.estArrival,
                                 data.address,
                                 data.carrier,
                                 data.delivered,
                                 data.RestaurantID,
                                 []
        );

        return getOrderDetail(order.id).then((itemsData) => {
            for(const i of itemsData) {
                order.items.push({productId: i.productID, quantity: i.quantity});
            }
            console.log(order.items);

            return order;
        }).catch(err => {
            console.log(err.response);
            return null;
        });
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

const getOrders = (restaurantId) => {
    let request = {
        restaurantId: restaurantId
    };

    return axios.get(`http://${url}:8000/order?` + toQuery(request)).then(res => {
        console.log(res);

        let orders = [];
        let promiseArr = [];

        for(const td of res.data) {
            let promise = getOrder(td.orderID).then((order) => {
                orders.put(order);
                return orders;
            }).catch(err => {
                console.log(err.response);
                return null;
            });
            promiseArr.push(promise);
        }

        Promise.all(promiseArr).then(() => {
            return orders;
        }).catch((err) => {
            console.log(err);
            return null;
        });
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

const addOrderDetail = (orderId, productId, quantity) => {
    let request = {
        orderId: orderId,
        productId: productId,
        quantity: quantity
    };

    return axios.post(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const updateOrderDetail = (orderId, productId, quantity) => {
    let request = {
        orderId: orderId,
        productId: productId,
        quantity: quantity
    };

    return axios.put(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

/**
 * Leave off product to delete all products associated with an orderId
 * @param orderId
 * @param productId
 * @returns {Promise<boolean>}
 */
const deleteOrderDetail = (orderId, productId) => {
    let request = {
        orderId: orderId,
        productId: productId
    };

    return axios.delete(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const getOrderDetail = (orderId, productId) => {
    let request = {
        orderId: orderId,
        productId: productId
    };

    return axios.get(`http://${url}:8000/orderDetails?` + toQuery(request)).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

export {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    getOrders,
    addOrderDetail,
    updateOrderDetail,
    deleteOrderDetail,
    getOrderDetail
}