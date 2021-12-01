import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import '../Styles/Popups.scss';
import {min} from "@popperjs/core/lib/utils/math";
import {UserService} from "../Services/UserService";
import {UserTypes} from "../Models/User";
import {InventoryService} from "../Services/InventoryService";

const ProductPopup = props => {

    const userService = new UserService();
    const inventoryService = new InventoryService();

    const [stock, setStock] = useState(props.item.stock);
    const [minStock, setMinStock] = useState(props.item.minStock);

    const pattern = new RegExp("^([0-9]+)$");

    const onHide = () => {
        props.toggleShow();

        setStock(props.item.stock);
        setMinStock(props.item.minStock);
    }

    const save = () => {
        props.toggleShow();

        if(pattern.test(stock))
            props.item.stock = parseInt(stock);
        if(pattern.test(minStock))
            props.item.minStock = parseInt(minStock);

        inventoryService.updateItem(props.item, () => {});
    }

    const isBelowMin = () => {
        try {
            return parseInt(stock) < parseInt(minStock)
        } catch (err) {
            return false;
        }
    }

    return (
        <Modal centered size="lg" onHide={() => onHide()} show={props.show}>
          <Modal.Header closeButton>
              <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="d-flex flex-row justify-content-center p-3">
                  <div className="modal-img-container d-flex flex-column align-items-center justify-content-center me-3">
                      <img className="modal-img" src={props.item.product.image} alt={props.item.product.name}/>
                  </div>
                  <div className="d-flex flex-column w-65 p-3 modal-border">
                      <div className="d-flex flex-row">
                          <h4>{props.item.product.name}</h4>
                          <p className="ms-2 pt-1 mb-0 text-muted">Id: {props.item.product.id}</p>
                      </div>
                      <p>{props.item.product.description}</p>
                      <div>
                          <div className="d-flex flex-row gap-4">
                              <div className="w-35">
                                  <label htmlFor="stock" className={(isBelowMin()) ? "text-danger mb-2" : "text-muted mb-2"}>Current Stock</label>
                                  <input type="text"
                                         className={(pattern.test(stock)) ? "form-control" : "form-control is-invalid"}
                                         id="stock"
                                         value={stock}
                                         onChange={(event) => setStock(event.target.value)}
                                         disabled={(userService.getUser().userType !== UserTypes.SUPPLIER) ? true : false}
                                  />
                                  {(isBelowMin()) ? <p className="fs-tiny text-nowrap pt-1">Stock is below minimum</p> : null }
                              </div>
                              <div className="w-35">
                                  <label htmlFor="minStock" className="text-muted mb-2">Minimum Stock</label>
                                  <input type="text"
                                         className={(pattern.test(minStock)) ? "form-control" : "form-control is-invalid"}
                                         id="minStock"
                                         value={minStock}
                                         onChange={(event) => setMinStock(event.target.value)}
                                         disabled={(userService.getUser().userType !== UserTypes.SUPPLIER) ? true : false}
                                  />
                              </div>
                          </div>
                      </div>
                      <div className="d-flex flex-row flex-grow-1 align-self-end">
                          <div className="align-self-end">
                              <button className="btn app-btn" onClick={() => save()}>Save</button>
                          </div>
                      </div>
                  </div>
              </div>
          </Modal.Body>
        </Modal>
    );
};

export default ProductPopup;
