import React, { useState } from 'react';
import ProductPopup from './ProductPopup';
import ConfirmPopup from './ConfirmPopup';
import { Card, CardActions, CardContent,CardMedia, Button,
   Typography, Container, Grid, Modal} from '@material-ui/core';
import trashIcon from '../Resources/trash.svg';
import {InventoryItem} from "../Models/InventoryItem";
import {Product} from "../Models/Product";
import {InventoryService} from "../Services/InventoryService";

export const ProductList = props => {

    const inventoryService = new InventoryService();

    const [item, setItem] = useState(new InventoryItem(new Product(0, ""), 0, 0));
    const [isOpen, setIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const toggleConfirmPopup = () => {
        setConfirmOpen(!confirmOpen);
    }

    const handleDelete = (item) => {
        inventoryService.removeItem(item, () => {
            props.doRefresh();
        });
    }

    const productArray = props.items.map(item => (
        <Grid item xs={2} sm={4} md={4}>
            <Card style={{flex: 1, width:'24rem', margin:'1rem', float:true}}>
                <CardMedia
                component="img"
                height="200rem"
                image={item.product.image}
                alt="ProductImage"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {item.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {item.product.description}
                </Typography>
            </CardContent>
            <CardActions className="justify-content-between">
                <Button size="small" onClick={() => {togglePopup(); setItem(item);}} >More Details</Button>
                <div className="d-flex flex-row">
                    <button className="trash-btn" onClick={() => {toggleConfirmPopup(); setItem(item);}}>
                        <img className="pb-1" src={trashIcon} alt="Delete Item"/>
                    </button>
                </div>
            </CardActions>
            </Card>
        </Grid>
    ));

    return (
        <div className="">
            {isOpen && <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                open={isOpen}
                onClose={togglePopup}
              >
                <ProductPopup item={item}/>
              </Modal>
            }
            <ConfirmPopup message={"Do you want to delete " + item.product.name + " from this inventory?"}
                          show={confirmOpen}
                          toggleShow={() => toggleConfirmPopup()}
                          onAnswer={(answer) => (answer) ? handleDelete(item) : null}/>
            <Container>
                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {productArray}
                </Grid>
            </Container>
        </div>
    );

};
