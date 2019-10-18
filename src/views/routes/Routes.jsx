import React from 'react';
import {browserHistory, HashRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navbar from '../common/Navbar.jsx';
import Home from '../components/Home.jsx';
import EmployeeList from '../components/EmployeeList.jsx';
import Posts from '../components/Posts.jsx';
import Users from '../components/Users.jsx';
import Product from '../components/Product.jsx';
//import { createHistory } from 'history';

export default class Routes extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
	
    return (<HashRouter>
				<Route exact path = "/" component = {Home} />
				<Route exact path = "/Posts" component = {Posts} />
				<Route exact path = "/Users" component = {Users} />
				<Route exact path = "/Product" component = {Product} />
				<Route exact path = "/EmployeeList" component = {EmployeeList} />				
			</HashRouter>)
  }
}
