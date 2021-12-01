import React, {useState, useEffect} from 'react';
import {Navbar} from "../Components/Navbar";
import "../Styles/Order.scss"
import {InventoryService} from "../Services/InventoryService";
import {RestaurantService} from "../Services/RestaurantService";
import {UserService} from "../Services/UserService";
import RemoveIcon from "../Resources/remove.svg";

export const OrderPage = () => {

    const [items, setItems] = useState([]);
    const [addProduct, setAddProduct] = useState(null);
    const [forceRender, setForceRender] = useState({});

    // Loaded
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    const inventoryService = new InventoryService();
    const restaurantService = new RestaurantService();
    const userService = new UserService();

    // TODO Handle supplier somehow

    useEffect(() => {
        inventoryService.loadProducts(() => {
            userService.loadUser((user) => {
                setUser(user);
                restaurantService.loadRestaurant(user.restaurantId, (restaurant) => {
                    setRestaurant(restaurant);
                    console.log(restaurant);
                });
            });
        });
    }, []);

    const handleAdd = () => {
        if(addProduct)
            inventoryService.loadProduct(addProduct, (product) => {
                items.push({product: product, quantity: 0});
                console.log(items);
                setForceRender({});
            });
    }

    const handleSubmit = () => {

    }

    return (
        <>
            <Navbar/>
            <div className="order-root">
                <div className="container main-panel panel">
                    <br/>
                    <h1 className="ms-5 inter text-muted fw-light">Order</h1>
                    <br/>
                    <div className="panel panel-border panel-round mx-5 p-3">
                        <h3 className="ms-5 mt-3 fw-light">Creating New Shipment</h3>
                        <h4 className="ms-5">Delivering to <b className="text-app">{(restaurant) ? restaurant.name : null}</b></h4>
                        <div className="d-flex flex-row justify-content-center align-items-end panel gap-3 p-3">
                            <div className="form-group">
                                <label className="mb-2">Add New Product</label>
                                <div className="d-flex flex-row gap-3">
                                    <select className="form-select" onChange={(event) => setAddProduct(event.target.value)}>
                                        <option selected value="">...</option>
                                        {(window.products !== undefined) ? window.products.map((p) => <option value={p.id}>{p.name}</option>) : null}
                                    </select>
                                    <button type="button" className="btn app-btn inter" onClick={ () => handleAdd() }>Add</button>
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger inter" onClick={ () => setItems([]) }>Clear Order</button>
                        </div>
                        <hr/>
                        <br/>
                        <div className="d-flex flex-row justify-content-center">
                            <table className="table w-75">
                                <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="w-20">#</th>
                                    <th scope="col" className="w-25">Product</th>
                                    <th scope="col" className="w-50">Quantity</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    items.map((item, i) =>
                                        <tr key={"item-" + i}>
                                            <td>{item.product.id}</td>
                                            <td>{item.product.name}</td>
                                            <td>
                                                <input type="value"
                                                       className="form-control-sm border-1 w-20"
                                                       value={item.quantity}
                                                       onChange={(event) => {
                                                           item.quantity = event.target.value;
                                                           setForceRender({});
                                                       }}/>
                                            </td>
                                            <td>
                                                <button className="remove-btn" onClick={() => {
                                                    items.splice(i, 1);
                                                    setItems(items);
                                                    setForceRender({});
                                                }}>
                                                    <img className="mb-1" src={RemoveIcon} alt="Remove"/>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <hr/>
                        <br/>
                        <div className="d-flex flex-row justify-content-end">
                            <button type="button" className="btn app-btn inter" onClick={() => handleSubmit()}>Finalize Shipment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderPage;