import {Inventory} from "../Models/Inventory";
import {getProducts, getProduct} from "../Api/ProductRoutes";
import {getInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem} from "../Api/InventoryRoutes";
import {InventoryItem} from "../Models/InventoryItem";
import {Product} from "../Models/Product";

export class InventoryService {

    hasInventory() {
        return (this.getInventory() !== null);
    }

    getInventory() {
        if(window.inventory)
            return window.inventory;
        else
            return null;
    }

    getProducts() {
        if(window.products)
            return window.products;
        else
            return null;
    }

    loadProducts(callback) {
        if(window.products)
            callback(window.products);
        else
            getProducts().then((products) => {
                window.products = products;
                callback(products);
            });
    }

    loadProduct(id, callback) {
        getProduct(id).then((product) => {
            console.log(product);
            callback(product);
        });
    }

    loadInventory(restaurantId, callback) {
        const load = () => {
            getInventory(restaurantId).then((productInv) => {
                let inventory = new Inventory(restaurantId);

                // If the product exists add it to the inventory
                for (let pd of productInv) {
                    let existing = window.products.find(x => x.id === pd.productID);
                    if (existing)
                        inventory.items.push(new InventoryItem(existing, pd.stock, pd.minVal));
                }
                window.inventory = inventory;
                callback(inventory);
            });
        }

        if (window.products) {
            load();
        } else {
            getProducts().then((products) => {
                window.products = products;
                load();
            });
        }
    }

    addItem(item, callback) {
        let inventory = window.inventory;
        if(inventory) {
            addInventoryItem(item, inventory.restaurantId).then((valid) => {
                if(valid) {
                    inventory.items.push(item);
                    console.log("Added: ");
                    console.log(item);
                    callback();
                }
            });
        }
    }

    removeItem(item, callback) {
        let inventory = window.inventory;
        if(inventory) {
            deleteInventoryItem(item, inventory.restaurantId).then((valid) => {
                if(valid) {
                    inventory.items = inventory.items.filter(i => i.product.id !== item.product.id);
                    console.log("Removed: ");
                    console.log(item);
                    callback();
                }
            });
        }
    }

    updateItem(item, callback) {
        let inventory = window.inventory;
        if(inventory) {
            updateInventoryItem(item, inventory.restaurantId).then((valid) => {
                if(valid) {
                    let index = inventory.items.findIndex(i => i.product.id === item.product.id);
                    inventory.items[index] = item;
                    console.log("Updated: ");
                    console.log(item);
                    callback();
                }
            });
        }
    }

}