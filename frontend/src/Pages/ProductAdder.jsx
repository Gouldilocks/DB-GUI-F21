import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Product } from '../Models/Product';
import Navbar from '../Components/Navbar';

export class ProductAdder extends React.Component {
    // accountRepository = new AccountsRepository();

    state = {
        name: '',
        description: '',
        image: undefined,
        stock: 0,
        minStock: null 
    };

    // onSave() {
    //     if(this.state.id) {
    //         this.accountRepository.updateAccount(this.state.id, this.state)
    //             .then(account => this.setState({ redirect: '/' }));
    //     } else {
    //         this.accountRepository.addAccount(this.state)
    //             .then(account => this.setState({ redirect: '/' }));
    //     }
    // }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect} />
        // }

        return <>
        <Navbar />
        <br/>
        <form className="container">
                <h1>New Product</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={ event => this.setState({ name: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="textarea"
                        id="description"
                        name="description"
                        value={this.state.description}
                        onChange={ event => this.setState({ description: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <input type="image"
                        id="image"
                        name="image"
                        value={this.state.image}
                        onChange={ event => this.setState({ image: event.target.value }) }
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="minStock">Minimum Stock Amount</label>
                    <input type="text"
                        id="minStock"
                        name="stock"
                        value={this.state.minStock}
                        onChange={ event => this.setState({ minStock: event.target.value }) }
                        className="form-control" />
                </div>


                <div>
                    <button type="button"
                            // onClick={ () => this.onSave() }
                            className="btn btn-block btn-primary ">
                        Save
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <Link className="btn btn-block btn-secondary " to="/">Return to List</Link>
                </div>
            </form>
        </>;
    }

    // componentDidMount() {
    //     let id = this.props.match.params.accountId;
    //     if (id) {
    //         this.accountRepository.getAccount(id)
    //             .then(account => this.setState(account));
    //     }
    // }
}

export default ProductAdder;