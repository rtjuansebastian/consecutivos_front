//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Components
import App from './components/App';
import Documentos from './components/Documentos';
import Solicitudes from './components/Solicitudes';

const AppRoutes = () =>
    <App>
        <Switch>                    
            <Route exact path="/" />            
            <Route path="/documentos" component={Documentos} />            
            <Route path="/solicitudes" component={Solicitudes} />            
        </Switch>
    </App>;
    
export default AppRoutes;