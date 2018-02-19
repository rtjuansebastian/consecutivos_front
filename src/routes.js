//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Components
import App from './components/App';
import Documentos from './components/Documentos';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path="/" component={Documentos} />
        </Switch>
    </App>;
    
export default AppRoutes;