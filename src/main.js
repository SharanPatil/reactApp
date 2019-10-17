import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, BrowserRouter, Route} from 'react-router-dom';
import SCSS from './assets/stylesheets/application.scss';


import Routes from './views/routes/Routes.jsx';
import { createHistory } from 'history';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import todoApp from './views/components/reducers/reducers';

let store = createStore(todoApp);

ReactDOM.render(<Provider store = {store}><Routes history={createHistory}/></Provider>, document.getElementById('app'));