export class Inventory {
    constructor(restaurantId, items) {
        this.restaurantId = restaurantId;
        this.items = (items) ? items : [];
    }
}