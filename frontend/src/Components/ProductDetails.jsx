import React, {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';

import productImg from '../Resources/product.png';
import { Product } from "../Models/Product";

import '../Styles/ProductDetails.scss'

/**
 * Takes 1 property which is Product and displays it in a Modal lightbox.
 * @param props Product
 * @returns {JSX.Element}
 * @constructor
 */
export const ProductDetails = props => {

    const [product] = useState(
        (props.product !== null)
        ? props.product
        : new Product(0, "Sample Product", "This is a test product.", productImg, 0, 0)
    );

    const [show, setShow] = useState(true);

    return (
        <>
            <Modal size="lg" show={show} onHide={() => setShow(false)} centered autoFocus>
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div className="d-flex flex-row p-3">
                        <img className="product-image border" src={product.image} alt="Product Image"/>
                        <div className="d-flex flex-grow-1 flex-column justify-content-between">
                            <div className="ms-4">
                                <h2 className="fw-bold">{product.name}</h2>
                                <p>{product.description}</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a className="btn custom-btn" href="/order">Create Order</a>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}