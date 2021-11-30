import React from "react";
import { makeStyles, CardMedia} from '@material-ui/core';

const Popup = props => {
  function getModalStyle() {
      const top = 45 ;
      const left = 50 ;
      return {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-${top}%, -${left}%)`,
      };
  }


  let background = (props.product.stock < props.product.minStock) ? '#FAA0A0': '#F0EAD6'
  
  const useStyles = makeStyles(theme => ({
      modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
      },
      paper: {
          position: 'absolute',
          width: 450,
          backgroundColor: background,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
      },
  }));

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);



  return (
      <div style={modalStyle} className={classes.paper}>
          <div>
            <CardMedia
              component="img"
              image={props.product.image}
              alt="ProductImage"
              />
          </div>
          
          <br />
          <h2 className="display-2">Name: {props.product.name}</h2>
          <p className="mb-0">Id: {props.product.id}</p>
          <p className="mb-0">Description: {props.product.description}</p>
          <p className="mb-0">Current Stock: {props.product.stock}</p>
          <p className="mb-0">Minimum Stock: {props.product.minStock}</p>
      </div>
  );
};

export default Popup;
