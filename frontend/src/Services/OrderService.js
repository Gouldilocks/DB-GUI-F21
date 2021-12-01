import {addOrder, updateOrder, getOrder, getOrders} from "../Api/ShipmentRoutes";
import {Shipment} from "../Models/Shipment";

export class OrderService {

    loadOrder(orderId, callback) {
        getOrder(orderId).then((order) => {
            callback(order);
        });
    }

    loadOrders(restaurantId, callback) {
        getOrders(restaurantId).then((orders) => {
            callback(orders);
        });
    }

    postOrder(restaurantId, address, carrier, items, callback) {
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let order = new Shipment(null, date, null, null, address, carrier, 0, restaurantId, items);
        addOrder(order).then((valid) => {
            if(valid) {
                console.log("Posted order: ");
                console.log(order);
                callback();
            }
        });
    }

    updateOrder(order, callback) {
        updateOrder(order).then((valid) => {
            if(valid) {
                console.log("Update order: ");
                console.log(order);
                callback();
            }
        });
    }

}