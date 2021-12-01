import React from "react";
import {Modal, Button} from "react-bootstrap";

export const ConfirmPopup = props => {

    const handleAnswer = (value) => {
        props.onAnswer(value);
    }

    const handleShow = () => {
        props.toggleShow();
    }

    return (
        <>
            <Modal centered onHide={() => props.toggleShow()} show={props.show}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { handleAnswer(false); handleShow(); }}>Close</Button>
                    <Button variant="primary" className="app-btn" onClick={() => { handleAnswer(true); handleShow(); }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmPopup;