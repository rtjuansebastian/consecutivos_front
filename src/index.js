//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//Components
import AppRoutes from './routes';

//Assets
import './index.css';

ReactDOM.render(
        <Router>
            <AppRoutes/>
        </Router>
        , document.getElementById('root'));
registerServiceWorker();
