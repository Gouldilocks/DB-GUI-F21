import React, { useState, useEffect } from 'react';
import { Product } from '../Models/Product';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { ProductList } from '../Components/ProductList';
import { ProductSearch } from '../Components/ProductSearch';

let str = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export const DashboardPage = props => {
    const productList = [
        new Product(1, "Beer", str, "https://via.placeholder.com/350", 1, 5),
        new Product(2, "Wine", str, "https://via.placeholder.com/350", 8, 5),
        new Product(3, "Salt", str, "https://via.placeholder.com/350", 0.3, 2),
        new Product(4, "Chips", str, "https://via.placeholder.com/350", 1.7, 8),
        new Product(5, "Salmon", str, "https://via.placeholder.com/350", 4.5, 1),
        new Product(6, "Sugar", str, "https://via.placeholder.com/350", 0.3, 6),
        new Product(7, "Vinegar", str, "https://via.placeholder.com/350", 23, 2),
        new Product(8, "Tilapia", str, "https://via.placeholder.com/350", 4.5, 10)
    ]

    const [ products, setProducts ] = useState(productList);

    useEffect(() => {
        onSearch();
    }, []);

    let onFiltOrder = params => {
        if(!params){
            setProducts(products);
        }
        else if(params.isAsc == 'asc'){
            setProducts(products.sort((a,b) => a.name.localeCompare(b.name)))
        }
        else if(params.isAsc == 'desc'){
            setProducts(products.sort((a,b) => b.name.localeCompare(a.name)))
        }
        else{
            setProducts(products.sort((a,b) => a.id - b.id));
        }
    }

    let onFiltStock = params => {
        
    }

    let onSearch = params => {
        console.log(params)
        if(params)
            console.log(params['name'])
        //     { name, isStock, isAsc } = params
       
        // if(!params){
        //     setProducts(productList);
        //     return;
        // }
        // else{
        //     setProducts( productList.filter((product) => {
        //         const productName = product.name.toLowerCase();
        //         return productName.includes(name.toLowerCase());
        //         })
        //         )
        //     }


        // if(!isStock){
        //     setProducts(products);
        // }
        // else if(isStock == 'in'){
        //     setProducts( products.filter((product) => {
        //         return product.minStock < product.stock
        //     }))
        // }
        // else if(isStock == 'low'){
        //     setProducts( products.filter((product) => {
        //         return product.minStock >= product.stock
        //     }))
        // }
        // else{
        //     setProducts(products.sort((a,b) => a.id - b.id));
        // }

        // if(!isAsc){
        //     setProducts(products);
        // }
        // else if(isAsc == 'asc'){
        //     setProducts(products.sort((a,b) => a.name.localeCompare(b.name)))
        // }
        // else if(isAsc == 'desc'){
        //     setProducts(products.sort((a,b) => b.name.localeCompare(a.name)))
        // }
        // else{
        //     setProducts(products.sort((a,b) => a.id - b.id));
        // }

        
    }

    return <>
        <Navbar />
        <br />
        <div className="container margin-top">
            <h1 className="d-flex justify-content-center display-1">Restaurant #ID Info</h1>
            <br />
            <ProductSearch  onSearch={ params => onSearch(params)} 
                            />
            <br />
        </div>
        <ProductList products={products}/>


        {/* TODO add user if manager*/}
        <form className="d-flex justify-content-center">
            <div >
                <Link className="btn btn-block btn-secondary" to="/newProduct">Add New Product</Link>
            </div>
        </form>

    </>

}

export default DashboardPage;
