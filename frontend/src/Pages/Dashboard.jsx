import React, { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';
import { InventoryService } from "../Services/InventoryService";
import { UserService } from "../Services/UserService";
import {UserTypes} from "../Models/User";
import "../Styles/Dashboard.scss";

export const DashboardPage = props => {

    const inventoryService = new InventoryService();
    const userService = new UserService();

    const [ items, setItems ] = useState([]); // Used for search
    const [ user, setUser ] = useState(null);
    const [ forceRender, setForceRender ] = useState({}); // only used for rerender

    useEffect(() => {
        userService.loadUser((user) => {
            console.log("Dashboard Loading User: ");
            console.log(userService.hasUser());
            console.log(userService.getUser());
            setUser(user);
            if(user.userType !== UserTypes.SUPPLIER) {
                if(!inventoryService.hasInventory()) {
                    inventoryService.loadInventory(user.restaurantId, (inventory) => {
                        console.log("Loaded Inventory");
                        setItems(inventory.items);
                    });
                } else {
                    setForceRender({});
                    setItems(inventoryService.getInventory().items);
                }
            }
        });
    }, [items]);

    const refresh = () => {
        if(inventoryService.hasInventory()) {
            setItems(JSON.parse(JSON.stringify(inventoryService.getInventory().items))); // Deep clone
        }
    }

    let onSearch = params => {
        if(!params)
            return inventoryService.getInventory().items;

        return inventoryService.getInventory().items.filter((item) => {
            const productName = item.product.name.toLowerCase();
            return productName.includes(params.name.toLowerCase());
        });
    }

    return <>
        <Navbar />
        {(userService.hasUser())
            ? <div className="dashboard-root">
                <div className="container margin-top">
                    <div className="panel">
                        <br/>
                        <div>
                            <h1 className="ps-5 inter text-muted fw-light">Dashboard</h1>
                            <ProductSearch doRefresh={() => refresh()} onSearch={params => setItems(onSearch(params))}/>
                        </div>
                    </div>
                </div>
                {(inventoryService.hasInventory()) ? <ProductList doRefresh={() => refresh()} items={items}/> :
                    <div>
                        <center>
                            <h2 className="mt-5 inter text-muted fw-bold">No Inventory Loaded</h2>
                            <h5 className="inter text-muted fw-light">Type a restaurant name and click the load
                                button.</h5>
                        </center>
                    </div>
                }
                {(inventoryService.hasInventory() && items.length === 0)
                    ? <div>
                        <center>
                            <h2 className="mt-5 inter text-muted fw-bold">No Products were Found</h2>
                            {(inventoryService.getInventory().items.length === 0)
                                ? <h5 className="inter text-muted fw-light">This inventory is empty.</h5>
                                : <h5 className="inter text-muted fw-light">Try a different search term.</h5>
                            }
                        </center>
                    </div>
                    : null
                }
            </div>
            : <center><h1 className="fw-light mt-5">Loading...</h1></center>
        }
    </>

}

export default DashboardPage;
