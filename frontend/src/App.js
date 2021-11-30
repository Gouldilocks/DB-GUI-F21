import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DashboardPage from './Pages/Dashboard';
import LoginPage from './Pages/Login';
import SignUpPage from './Pages/SignUp';
import OrderPage from './Pages/Order';
import DeliveriesPage from './Pages/Deliveries';
import StockPage from './Pages/Stock';
import PrivateRoute from './Util/PrivateRoute';
import ProductAdder  from './Pages/ProductAdder';

// React functional component
function App () {
  // state for storage of the information on the webpage of forms and list, uses hooks
  const [number, setNumber] = useState("")
  const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  // handle input field state change
  const handleChange = (e) => {
    setNumber(e.target.value);
  }

  const fetchBase = () => {
    axios.get(`http://${url}:8000/`).then((res)=>{
      alert(res.data);
    })
  }

  // fetches vals of db via GET request
  const fetchVals = () => {
    axios.get(`http://${url}:8000/values`).then(
      res => {
        const values = res.data.data;
        console.log(values);
        setValues(values)
    }).catch(err => {
      console.log(err)
    });
  }

  // handle input form submission to backend via POST request
  const handleSubmit = (e) => {
    e.preventDefault();
    let prod = number * number;
    axios.post(`http://${url}:8000/multplynumber`, {product: prod}).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
    setNumber("");
  }

  // handle intialization and setup of database table, can reinitialize to wipe db
  const reset = () => {
    axios.post(`http://${url}:8000/reset`).then(res => {
      console.log(res);
      fetchVals();
    }).catch(err => {
      console.log(err)
    });;
  }

  // tell app to fetch values from db on first load (if initialized)
  useEffect(() => {
    fetchVals();
  }, [])

  // General routing for now until we figure out user types. (Supplier etc..)
  // I will try to update the routing later to accommodate that.
  return (
	<>
	<BrowserRouter>
	  <Routes>
	  	<Route path="/login" element={<LoginPage/>}/>
		<Route path="/signup" element={<SignUpPage/>}/>
		<Route path="/" element={
			<PrivateRoute>
			  <DashboardPage/>
			</PrivateRoute>
		}/>
    <Route path="/newProduct" element={
			<PrivateRoute>
				<ProductAdder/>
			</PrivateRoute>
		}/>
    <Route path="/editProduct/:productId" element={
			<PrivateRoute>
				<ProductAdder/>
			</PrivateRoute>
		}/>
		<Route path="/order" element={
			<PrivateRoute>
				<OrderPage/>
			</PrivateRoute>
		}/>
		<Route path="/deliveries" element={
			<PrivateRoute>
				<DeliveriesPage/>
			</PrivateRoute>
		}/>
		<Route path="/stock" element={
			<PrivateRoute>
				<StockPage/>
			</PrivateRoute>
		}/>
	  </Routes>
	</BrowserRouter>
	</>
  );
}

export default App;
