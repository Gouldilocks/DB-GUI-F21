import React, { useState, useEffect } from 'react';
import {UserTypes} from "../Models/User";
import {InventoryService} from "../Services/InventoryService";
import {RestaurantService} from "../Services/RestaurantService";
import {InventoryItem} from "../Models/InventoryItem";
import {UserService} from "../Services/UserService";

export const ProductSearch = props => {

    const [ name, setName ] = useState("");
    const [ sort, setSort ] = useState("default");
    const [ stock, setStock ] = useState("default");

    const [ restaurantName, setRestaurantName ] = useState("");
    const [ invalidName, setInvalidName ] = useState(false);

    const [ addProduct, setAddProduct ] = useState(null);

    const userService = new UserService();
    const inventoryService = new InventoryService();
    const restaurantService = new RestaurantService();

    useEffect(() => {
        inventoryService.loadProducts((products) => {});
    }, []);

    let handleChangeInventory = () => {
        restaurantService.loadRestaurantByName(restaurantName, (restaurant) => {
            if(restaurant !== null)
                inventoryService.loadInventory(restaurant.id, (inventory) => {
                    props.doRefresh();
                });
            else
                setInvalidName(true);
        });
    }

    let handleAdd = () => {
        if(addProduct)
            inventoryService.loadProduct(addProduct, (product) => {
                inventoryService.addItem(new InventoryItem(product, 0, 0), () => {
                    props.doRefresh();
                });
            });
    }

    let filter =
        <div className="d-flex flex-row">
            <div className="px-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="default" value="default" 
                    onChange={event => setSort(event.target.value)}
                    defaultChecked/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        ID
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="desc" value="desc" onChange={event => setSort(event.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Descending 
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="sort" id="asc" value="asc" onChange={event => setSort(event.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Ascending
                    </label>
                </div>
                
            </div>
            <div className="px-3">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="filter" id="default" value="default" onChange={event => setStock(event.target.value)} defaultChecked/>
                    <label class="form-check-label" for="flexRadioDefault1">
                        All
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="filter" id="in" value="in" onChange={event => setStock(event.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        In Stock
                    </label>
                </div>
                <div class="form-check">

                    <input class="form-check-input" type="radio" name="filter" id="low" value="low" onChange={event => setStock(event.target.value)}/>
                    <label class="form-check-label" for="flexRadioDefault2">
                        Low Stock
                    </label>
                </div>
            </div>
        </div>

    let supplierControl =
        <div className="d-flex flex-row justify-content-center align-items-center panel p-3 pt-0">
            <div className="d-flex flex-row w-25 align-items-center panel p-3">
                <div className="form-group flex-grow-1 mb-2">
                    <label className="mb-2">Load Restaurant Inventory</label>
                    <div className="d-flex flex-row">
                        <input type="text"
                               id="search_restaurant"
                               name="search_restaurant"
                               value={ restaurantName }
                               className={(invalidName) ? "form-control flex-grow-1 me-3 is-invalid" : "form-control flex-grow-1 me-3"}
                               onChange={ event => { setInvalidName(false); setRestaurantName(event.target.value); }}
                        />
                        <button type="button" className="btn btn-danger inter" onClick={ () => handleChangeInventory() } >Load</button>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row w-25 align-items-center panel p-3 gap-3">
                <div className="form-group flex-grow-1 mb-2">
                    <label className="mb-2">Add New Product</label>
                    <div className="d-flex flex-row gap-3">
                        <select className="form-select" onChange={(event) => setAddProduct(event.target.value)}>
                            <option selected value="">...</option>
                            {(window.products !== undefined) ? window.products.map((p) => <option value={p.id}>{p.name}</option>) : null}
                        </select>
                        <button type="button" className="btn btn-secondary inter" onClick={ () => handleAdd() }>Add</button>
                    </div>
                </div>
            </div>
        </div>

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-center gap-2">
                    <div className="d-flex flex-row w-50 align-items-center panel p-3">
                        <div className="form-group flex-grow-1 mb-2">
                            <label className="mb-2" htmlFor="search_name">Search Product</label>
                            <div className="d-flex flex-row">
                                <input type="text"
                                       id="search_name"
                                       name="search_name"
                                       value={ name }
                                       className="form-control flex-grow-1 me-3"
                                       onChange={ event => setName(event.target.value) } />
                                <button type="button" className="btn app-btn float-right" onClick={ () => props.onSearch({ name, sort, stock }) } >Search</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="panel p-3">
                            <label className="ms-3 mb-2">Search Options</label>
                            {filter}
                        </div>
                    </div>
                </div>
                {(userService.hasUser() && userService.getUser().userType === UserTypes.SUPPLIER) ? supplierControl : null}
            </div>
            <br/>
        </>
    );
};