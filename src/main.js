import React from 'react';
import ReactDOM from 'react-dom';
//import {browserHistory, BrowserRouter, Route} from 'react-router-dom';
import SCSS from './assets/stylesheets/application.scss';


import AppRoutes from './views/routes/Routes.jsx';
//import { createHistory } from 'history';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import empApp from './views/components/reducers/reducers';

let store = createStore(empApp);

ReactDOM.render(<Provider store = {store}><AppRoutes/></Provider>, document.getElementById('app'));
