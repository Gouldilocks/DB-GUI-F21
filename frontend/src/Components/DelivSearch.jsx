import React, { useState, useEffect } from 'react';
import {UserTypes} from "../Models/User";

export const DelivSearch = props => {

    const [ name, setName ] = useState("");

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-center gap-2">
                    <div className="d-flex flex-row w-50 align-items-center panel p-3">
                        <div className="form-group flex-grow-1 mb-2">
                            <label className="mb-2" htmlFor="search_name">Search Delivery</label>
                            <div className="d-flex flex-row">
                                <input type="text"
                                       id="search_name"
                                       name="search_name"
                                       value={ name }
                                       className="form-control flex-grow-1 me-3"
                                       onChange={ event => setName(event.target.value) } />
                                <button type="button" className="btn app-btn float-right" onClick={ () => props.onSearch({ name }) } >Search</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div className="panel p-3">
                            <label className="ms-3 mb-2">Search Options</label>
                            {filter}
                        </div> */}
                    </div>
                </div>
            </div>
            <br/>
        </>
    );
}