import React from "react";
import '../Styles/ShipmentsDeliveries.css';


export class NewData extends React.Component {

  state = {
    availableItems: [], // put available items here
    item: "",
    quantity: 0
  };
  saveItem = (event) => {
    this.setState({ item: event.target.value });
  };
  saveQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  };
  toProp = (event) => {
    //if()
    //alert("Selected: " + this.state.item + " " + typeof this.state.quantity);
    this.props.addNew(this.state.item, parseInt(this.state.quantity));
  };

  render() {
    return (
      <>
        <h1>New Cart Item</h1>
        <form onSubmit={this.test}>
          <label htmlFor="item-select">Select Item to add. </label>
          <br />
          <select id="item-select" name="item-select" onChange={this.saveItem}>
            <option></option>
            <option value="TR-808">TR-808</option>
            <option value="TB-303">TB-303</option>
            <option value="SH-101">SH-101</option>
          </select>
          <br />
          <label htmlFor="item-select">Select quantity. </label>
          <br />
          <input
            type="number"
            id="item-select"
            onChange={this.saveQuantity}
            name="item-select"
          />
          <br />
          {/*<input type="submit" value="Submit" class="submit-button" />*/}
          <button type="button" className="btn btn-success" onClick={this.toProp}>
            Submit
          </button>
        </form>
      </>
    );
  }
}

export class FormComponentComponent extends React.Component {
  state = {
    quantity: this.props.quantity
  };
  // this includes index number so integrate that
  ifNegative = () => {
    //call function to subtract the root prop
    if (this.state.quantity == 1) {
      alert("Must have at least one!");
    } else {
      this.props.update(0, this.props.index);
      this.setState({ quantity: this.state.quantity - 1 });
    }
  }
  ifPositive = () => {
    //call function to add the root prop
    this.props.update(1, this.props.index);
    this.setState({ quantity: this.state.quantity + 1 });
  }
  render() {
    //alert("Things have changed.");
    return (
      <tr>
        <td>{this.props.productName}</td>
        <td>
          <button type="button" onClick={this.ifNegative}>-</button>
          <input type="text" value={this.state.quantity} />
          <button type="button" onClick={this.ifPositive}>+</button>
        </td>
      </tr>
    );
  }
}
export class FormComponent extends React.Component {
  state = {
    result: []
  };
  render() {
    if (this.props.clear == true) {
      //I NEED HELP ON THIS: MAXIMUM STATE ERROR

      //this.state.result.length = 0;
      //this.setState(this.state.result);
    }
    for (let index in this.props.productName) {
      if (index < this.state.result.length) {
        continue;
      } else {
        /*this.state.result.push(
          <tr>
            <td>{this.props.productName[index]}</td>
            <td>
              <button>-</button>
              <input type="text" value={this.props.quantity[index]} />
              <button>+</button>
            </td>
          </tr>
        );*/
        this.state.result.push(<FormComponentComponent
          productName={this.props.productName[index]}
          quantity={this.props.quantity[index]}
          index={index}
          update={(whichOne, index) => this.props.updateQuantity(whichOne, index)}
        />);
        this.setState(this.state.result);
        /*alert(
          "Product name: " +
          this.props.productName[index] +
          " Quantity: " +
          this.props.quantity[index]
        );*/
      }
    }
    /*if(this.props.productName.length == 0){
      return <p className="empty">Shopping cart is empty!</p>;
    }else{
      return (<table>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
        </tr>
        {this.state.result}
      </table>);
    }*/
    return (<>{this.state.result}</>);
  }
}

export class Form extends React.Component {
  state = {
    deliveryTo: "",
    submitted: false,
    items: [],
    quantities: [],
    clear: false
  };

  newItem = () => {
    this.state.submitted = 1;
    this.setState({ submitted: 1 });
  };
  newItemAdded = (itemName, quantity) => {
    //alert("State set?");
    this.setState({ test: true });
    this.state.items.push(itemName);
    this.state.quantities.push(quantity);
    this.setState(this.state.items);
    //alert("State set.");
    this.setState(this.state.quantities);
    //alert("State has been set!");
  };
  clearEverything = () => {
    this.state.items.length = 0;
    this.state.quantities.length = 0;
    this.setState(this.state.items);
    this.setState(this.state.quantities);
    this.setState({ clear: true });
    //this.setState({ clear: false });
  };
  render() {
    let tag = "";
    /*alert(
      "Item length: " +
        this.state.items.length +
        " Quantity length: " +
        this.state.quantities.length +
        " Test: " +
        this.state.test
    );*/
    if (this.state.submitted == true) {
      tag = (
        <NewData
          ok={this.state.submitted}
          addNew={(itemName, quantity) => this.newItemAdded(itemName, quantity)}
        />
      );
    }
    return (
      <div>
        <h1>Shipment Details</h1>
        <h2>Delivery To (Insert Javascript Here)</h2>

        <form>
          <button className="btn btn-success">
            Clear Form
          </button>
          <br />
          <table>
            <tr className="table-header">
              <th>Product</th>
              <th>Quantity</th>
            </tr>
            <FormComponent
              productName={this.state.items}
              quantity={this.state.quantities}
              clear={this.state.clear}
              updateQuantity={(whichOne, index) => {
                //alert("Type: " + typeof this.state.quantities[index]);
                if (whichOne == 1) {
                  this.state.quantities[index]++;
                  this.setState(this.state.quantities);
                } else {
                  this.state.quantities[index]--;
                  this.setState(this.state.quantities);
                }
              }}
            />
          </table>
          <br />
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.setState({ submitted: !this.state.submitted })}
            style={{ marginRight: "1em" }}
          >
            Update Cart
          </button>
          <input type="submit" className="btn btn-success" value="Finalize Shipment" />
          {tag}
        </form>
      </div>
    );
  }
}
