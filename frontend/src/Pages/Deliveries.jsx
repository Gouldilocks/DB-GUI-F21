import React from "react";
import '../Styles/ShipmentsDeliveries.scss';
import Order from "./Order"
import { Navbar } from "../Components/Navbar";

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
        button: "▼",
        rowHeightState: "expanded",
        status: <>{this.props.status}</>,
        proxyStatus: '',
        statusStatus: "Edit Status"
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
    switchArrow = () => {
        if (this.state.button == "▼") {
            this.setState({ button: "▲" });
        } else {
            this.setState({ button: "▼" });
        }
    }
    render() {
        let status = <></>;

        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.item} {/*<button type="button" className={this.state.rowHeightState} onClick={this.switchArrow}>{this.state.button}</button>*/}</td>
                <td>{this.state.status} <button type="button" className="btn btn-success" onClick={this.editStatus}>{this.state.statusStatus}</button></td>
            </tr>
        );
    }
}
export class Deliveries extends React.Component {
    // TO DO:
    // Statuses set to 3 options
    state = {
        // map orders
        ids: [3809080, 1083159],
        items: ["beer", "wine"],
        statuses: ["Gucci", "Also Gucci"],
        // rows to be printed
        rows: []
    };
    render() {
        let displayShipments = <></>;
        if (this.state.ids.length == 0) {
            displayShipments = <h1>Add some shipments first!</h1>
        } else {
            for (let index in this.state.ids) {
                if (index == this.state.rows.length) {
                    this.state.rows.push(<DeliveryComponent id={this.state.ids[index]}
                        item={this.state.items[index]}
                        status={this.state.statuses[index]}
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
                        <h1>Deliveries</h1>
                        <p>Track your deliveries.</p>
                        {displayShipments}
                        {this.state.changeStatus}
                    </div>
                </div>
            </>
        );
    }
}
