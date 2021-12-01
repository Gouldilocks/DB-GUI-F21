import React, {useState, useEffect} from 'react';
import {Navbar} from "../Components/Navbar";
import "../Styles/Order.scss"
import {InventoryService} from "../Services/InventoryService";
import {RestaurantService} from "../Services/RestaurantService";
import {UserService} from "../Services/UserService";
import RemoveIcon from "../Resources/remove.svg";
import {OrderService} from "../Services/OrderService";
import {deleteOrder} from "../Api/ShipmentRoutes";

export const OrderPage = () => {

    const [items, setItems] = useState([]);
    const [addProduct, setAddProduct] = useState(null);
    const [storeAddress, setStoreAddress] = useState("");
    const [forceRender, setForceRender] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Loaded
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    const inventoryService = new InventoryService();
    const restaurantService = new RestaurantService();
    const userService = new UserService();
    const orderService = new OrderService();

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
        setErrorMsg("");

        if(storeAddress.length === 0) {
            setErrorMsg("Store address is required.");
            return;
        }
        if(items.length === 0) {
            setErrorMsg("No items have been added.");
            return;
        }

        for(const i of items) {
            if(isNaN(parseInt(i.quantity)) || parseInt(i.quantity) < 0) {
                console.log("Invalid shipment");
                setErrorMsg("Invalid quantity on item(s)");
                return;
            }
        }

        const carrier = ["Fedex", "USPS", "UPS"];
        const random = Math.floor(Math.random() * carrier.length);

        orderService.postOrder(user.restaurantId, "", carrier[random], items, () => {
            setErrorMsg("");
            setSuccessMsg("Order has been successfully placed.");
            setItems([]);
        });
    }

    return (
        <>
            <Navbar/>
            {(userService.hasUser() && userService.getUser().userType === 3)
                ?
                <div>
                    <center>
                        <h2 className="mt-5 inter text-muted fw-bold">Not Available</h2>
                        <h5 className="inter text-muted fw-light">Order page is not available for suppliers.</h5>
                    </center>
                </div>
                :
                <>
                    {(userService.hasUser())
                        ?
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
                                            <label className="mb-2">Store Address</label>
                                            <input type="text" className={(storeAddress.length === 0) ? "form-control is-invalid" : "form-control"} placeholder="Address" onChange={(event) => setStoreAddress(event.target.value)}/>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">Add New Product</label>
                                            <div className="d-flex flex-row gap-3">
                                                <select className="form-select" onChange={(event) => {setErrorMsg(""); setAddProduct(event.target.value);}}>
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
                                                                   className={(!isNaN(parseInt(item.quantity)) && parseInt(item.quantity) >= 0) ? "form-control form-control-sm border-1 w-20" : "form-control form-control-sm border-1 w-20 is-invalid"}
                                                                   value={item.quantity}
                                                                   onChange={(event) => {
                                                                       item.quantity = event.target.value;
                                                                       setErrorMsg("");
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
                                    <div className="d-flex flex-row justify-content-end align-items-center">
                                        <p className="text-center mb-0 me-3 text-danger">{errorMsg}</p>
                                        <p className="text-center mb-0 me-3 text-success">{successMsg}</p>
                                        <button type="button" className="btn app-btn inter" onClick={() => handleSubmit()}>Finalize Shipment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <center>
                                <h2 className="mt-5 inter text-muted fw-bold">Loading...</h2>
                            </center>
                        </div>
                    }
                </>
            }
        </>
    );
}

export default OrderPage;