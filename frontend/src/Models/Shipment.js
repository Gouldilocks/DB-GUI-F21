export class Shipment {
    constructor(id, orderDate, shippedDate, arrivalDate, address, carrier, delivered, restaurantId, products) {
        this.id = id;
        this.orderDate = orderDate;       // When the order was first sent in.
        this.shippedDate = shippedDate;   // When the shipment was sent.
        this.arrivalDate = arrivalDate;   // When it's estimated to arrive (or when it has arrived) "Delivery Date"
        this.address = address;
        this.carrier = carrier;           // Random?
        this.delivered = delivered;       // Whether the shipment was delivered or not.
        this.restaurantId = restaurantId; // The restaurant this shipment is going to.
        this.products = products;         // The products associated with this shipment.
    }
}