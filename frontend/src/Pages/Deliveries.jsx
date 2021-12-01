import React, {useState, useEffect} from "react";
import '../Styles/ShipmentsDeliveries.scss';
import Order from "./Order"
import { Navbar } from "../Components/Navbar";
import {OrderService} from "../Services/OrderService";
import {getOrder} from "../Api/ShipmentRoutes";
import {UserService} from "../Services/UserService";

export const ChangeStatus = (props) => { // Select from 3 statuses with select menu
    return (
        <select onChange={props.changeStatus}>
            <option></option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Delivered">Delivered</option>
        </select>

    );
}
export class DeliveryComponent extends React.Component {
    //TO-DO: find way to expand/contract based on index (probably won't do)
    //Once status changes notify the supplier
    //Integrate adding shipments
    state = {
        rowHeightState: "expanded",
        status: <>{this.props.status}</>,
        proxyStatus: '',
        statusStatus: "Edit Status",
        date: this.props.date[2] + "-" + this.props.date[1] + "-" + this.props.date[0],
        canEditDate: <>readonly</>
    };

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
                this.setState({
                    status: <>{this.state.proxyStatus}</>,
                    statusStatus: "Edit Status"
                });
            }
        }
    }
    render() {
        var dateThing;
        if(this.props.accessor == "supplier"){
            dateThing = <input type="date" id="start"
            min={this.state.date}
            />;
        }else{
            dateThing = <input type="date" id="start"
            min={this.state.date}
            />;
        }

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.item} {/*<button type="button" className={this.state.rowHeightState} onClick={this.switchArrow}>{this.state.button}</button>*/}</td>
                <td>{dateThing}</td>
                <td>{this.state.status} <button type="button" className="btn btn-success" onClick={this.editStatus}>{this.state.statusStatus}</button></td>
            </tr>
        );
    }
}
export class Deliveries extends React.Component {

    constructor(props) {
        super(props);

        this.orderService = new OrderService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.userService.loadUser((user) => {
            this.user = user;
            this.orderService.loadOrders(user.restaurantId, (orders) => {
                console.log("Loaded Orders!!:");
                console.log(orders);
            });
        });
    }

    // TO DO:
    // Statuses set to 3 options
    state = {
        // map orders
        ids: [3809080, 1083159],
        items: ["beer", "wine"],
        statuses: ["Gucci", "Also Gucci"],
        dates: [[(new Date()).getDate(), ((new Date()).getMonth()+1), ((new Date()).getFullYear())], 
        [(new Date()).getDate(), ((new Date()).getMonth()+1), ((new Date()).getFullYear())]],
        // rows to be printed
        rows: []
    };

    getDates = () => {
        // maybe update with exact date of order later?
        var today = new Date();
        var todayValue = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        var newDates = [];
        for(let index in this.state.ids){
            newDates.push(todayValue);
        }
        this.setState({dates : newDates});
    }
    render() {
        //this.getDates();
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
                <table>
                    <tr className="table-header table-header-deliveries">
                        <th>Shipment ID</th>
                        <th>Items</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    {this.state.rows}
                </table>;
        }
        //this.getShipments();
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
