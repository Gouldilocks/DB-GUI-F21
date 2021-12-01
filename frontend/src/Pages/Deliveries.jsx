import React, {useState, useEffect} from "react";
import '../Styles/ShipmentsDeliveries.scss';
import Order from "./Order"
import { Navbar } from "../Components/Navbar";
import {OrderService} from "../Services/OrderService";
import {getOrder} from "../Api/ShipmentRoutes";
import {UserService} from "../Services/UserService";
import {InventoryService} from "../Services/InventoryService";
import {UserTypes} from "../Models/User";
import {Shipment} from "../Models/Shipment";

export const ChangeStatus = (props) => { // Select from 3 statuses with select menu
    return (
        <div className="d-inline-block">
            <select className="form-select form-select-sm" onChange={props.changeStatus}>
                <option/>
                <option value="Scheduled">Scheduled</option>
                <option value="Delivered">Delivered</option>
            </select>
        </div>
    );
}
export class DeliveryComponent extends React.Component {

    constructor(props) {
        super(props);

        this.userService = new UserService();
        this.orderService = new OrderService();

        //TODO: find way to expand/contract based on index (probably won't do)
        //Once status changes notify the supplier
        //Integrate adding shipments
        let date;

        if(this.props.date) {
            try {
                date = new Date(this.props.date).toISOString().slice(0, 10);
            } catch (err) {
                date = null;
            }
        }

        this.state = {
            id: props.id,
            rowHeightState: "expanded",
            status: <>{this.props.status}</>,
            proxyStatus: '',
            statusStatus: "Edit Status",
            date: date,
            canEditDate: <>readonly</>
        };
    }

    editStatus = () => {
        if (this.state.statusStatus == "Edit Status") {
            this.setState({
                status: <ChangeStatus
                    id={this.props.id}
                    index={this.props.index}
                    status={this.props.status}
                    changeStatus={(event) => {
                        this.props.changeStatus(event.target.value, this.props.index);
                        this.setState({ proxyStatus: event.target.value });
                    }}
                />,
                statusStatus: "Done"
            });
        } else {
            if (this.state.proxyStatus == "") {
                alert("Enter a status!");
            } else {

                this.orderService.updateOrder(new Shipment(
                    this.state.id,
                    null,
                    null,
                    null,
                    null,
                    null,
                    (this.state.proxyStatus === "Scheduled") ? 0 : 1,
                    null,
                    null
                ), () => {});

                this.setState({
                    status: <>{this.state.proxyStatus}</>,
                    statusStatus: "Edit Status"
                });
            }
        }
    }
    render() {
        let dateThing;
        if(this.userService.hasUser() && this.userService.getUser().userType === UserTypes.SUPPLIER) {
            dateThing = <input type="date" id="start" className="form-control form-control-sm"
            min={this.state.date} value={this.state.date} onChange={(event) => {
                this.setState({
                    date: event.target.value
                });

                console.log(event.target.value);

                this.orderService.updateOrder(new Shipment(
                    this.state.id,
                    null,
                    null,
                    (event.target.value === "") ? "erase" : event.target.value,
                    null,
                    null,
                    null,
                    null,
                    null
                ), () => {});
            }}
            />;
        } else {
            if(!this.state.date || this.state.date === null)
                dateThing = <text>Not Posted</text>
            else {
                dateThing = <text>{this.state.date}</text>
            }
        }

        return (
            <tr>
                <td className="w-10">{this.props.id}</td>
                <td className="w-50">{(this.props.item && this.props.item === "") ? "No items" : this.props.item}</td>
                <td className="w-10">{dateThing}</td>
                <td className="w-25">
                    {this.state.status}
                    {(this.userService.hasUser() && this.userService.getUser().userType === UserTypes.SUPPLIER)
                        ? <button type="button" className="btn app-btn ms-3" onClick={this.editStatus}>{this.state.statusStatus}</button>
                        : null
                    }
                </td>
            </tr>
        );
    }
}
export class Deliveries extends React.Component {

    constructor(props) {
        super(props);

        this.inventoryService = new InventoryService();
        this.orderService = new OrderService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.userService.loadUser((user) => {
            this.user = user;
            this.orderService.loadOrders(user.restaurantId, (orders) => {
                console.log("Loaded Orders:");
                console.log(orders);

                let ids = [];
                let itemsNames = [];
                let statuses = [];
                let dates = [];

                let promiseArrMain = [];

                for(const o of orders) {
                    let promise = new Promise((resolve) => {

                        let nameArr = [];
                        let promiseArr = [];

                        for(const i of o.items) {

                            let promise = new Promise((resolve) => this.inventoryService.loadProduct(i.productId, (product) => {
                                nameArr.push(product.name + " (" + i.quantity + ")");
                                resolve();
                            }));

                            promiseArr.push(promise);
                        }

                        Promise.allSettled(promiseArr).then(() => {
                            ids.push(o.id);
                            dates.push(o.arrivalDate);
                            if(o.delivered)
                                statuses.push("Delivered");
                            else
                                statuses.push("Scheduled");
                            itemsNames.push(nameArr.join(", "));
                            resolve();
                        });
                    });
                    promiseArrMain.push(promise);
                }

                Promise.allSettled(promiseArrMain).then(() => {
                    this.setState({
                        ids: ids,
                        items: itemsNames,
                        statuses: statuses,
                        dates: dates,
                        rows: []
                    });
                    console.log("Finished");
                    console.log(this.state);
                });
            });
        });
    }

    render() {
        if(!this.state) {
            return (
                <>
                    <Navbar/>
                    <center><h1 className="fw-light mt-5">Loading...</h1></center>
                </>
            )
        }

        let displayShipments = <></>;
        if (this.state.ids.length == 0) {
            displayShipments = <h1>Add some shipments first!</h1>
        } else {
            for (let index in this.state.ids) {
                if (index == this.state.rows.length) {
                    this.state.rows.push(<DeliveryComponent id={this.state.ids[index]}
                        item={this.state.items[index]}
                        status={this.state.statuses[index]}
                        date={this.state.dates[index]}
                        index={index}
                        changeStatus={(status, index) => {
                            this.state.statuses[index] = status;
                            this.setState(this.state.statuses);
                        }}
                    />)
                }
            }
            displayShipments =
                <table className="table">
                    <thead>
                    <tr className="table-header table-header-deliveries">
                        <th>Shipment ID</th>
                        <th>Items</th>
                        <th>Arrival Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.rows}
                    </tbody>
                </table>;
        }

        return (
            <>
                <Navbar />
                <div className="deliveries-root">
                    <div className="container main-panel">
                        <h1 className="ms-5 pt-4 inter text-muted fw-light">Deliveries</h1>
                        <h5 className="ms-5 mb-5 inter">Track your deliveries.</h5>
                        <div className="p-5 panel-border panel-round mx-5">
                            {displayShipments}
                            {this.state.changeStatus}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
