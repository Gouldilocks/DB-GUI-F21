import axios from "axios";
import {url} from "../Util/url";
import {Product} from "../Models/Product";
import {toQuery} from "../Util/utils";

function toBase64(arr) {
    return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
}

/**
 * Gets ALL available products.
 * @returns {Promise<*[]>}
 */
const getProducts = () => {
    return axios.get(`http://${url}:8000/product`).then(res => {
        let products = [];
        for(let p of res.data) {
            if(p.image !== null) {
                let base64 = toBase64(p.image.data);
                products.push(new Product(p.productID, p.name, p.description, p.priceperunit, "data:image/png;base64," + base64, null, null));
            } else {
                products.push(new Product(p.productID, p.name, p.description, p.priceperunit, null, null, null));
            }
        }
        return products;
    }).catch(err => {
        console.log(err);
        console.log(err.response);
        return null;
    });
}

const getProduct = (id) => {
    return axios.get(`http://${url}:8000/product/` + id).then(res => {
        console.log(res);
        let data = res.data[0];
        return new Product(
            data.productID,
            data.name,
            data.description,
            data.priceperunit,
            "data:image/png;base64," + toBase64(data.image.data)
        );
    }).catch(err => {
        console.log(err.response);
        return null;
    });
}

/**
 * Updates a product's information globally.
 * @param product
 * @returns {Promise<*[]>}
 */
const addProduct = (product) => {
    let request = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
    };

    return axios.post(`http://${url}:8000/product` + "?" + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}


/**
 * Updates a product's information globally.
 * @param product
 * @returns {Promise<*[]>}
 */
const updateProduct = (product) => {
    let request = {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image
    };

    return axios.put(`http://${url}:8000/product/` + product.id + "?" + toQuery(request)).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

const deleteProduct = (productId) => {
    return axios.delete(`http://${url}:8000/product/` + productId).then(res => {
        console.log(res);
        return true;
    }).catch(err => {
        console.log(err.response);
        return false;
    });
}

export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}