//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
//Components
import AppRoutes from './routes';

//Assets
import './index.css';

ReactDOM.render(
        <Router history={history}>
            <AppRoutes/>
        </Router>
        , document.getElementById('root'));
registerServiceWorker();
