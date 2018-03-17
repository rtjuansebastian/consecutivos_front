//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Auth from './Auth/Auth';

//Components
import App from './components/App';
import Documentos from './components/Documentos';
import Solicitudes from './components/Solicitudes';

const auth = new Auth();
const AppRoutes = () =>
    <App auth={auth}>
        <Switch>                    
            <Route exact path="/" />            
            <Route path="/documentos" component={Documentos} />            
            <Route path="/solicitudes" component={Solicitudes} />            
        </Switch>
    </App>;
    
export default AppRoutes;