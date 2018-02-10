//Dependencies
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//Components
import App from './components/App';
import Documentos from './components/Documentos';
import Equipos from './components/Equipos';
import TiposDocumentos from './components/TiposDocumentos';
import Usuarios from './components/Usuarios';

const AppRoutes = () =>
    <App>
        <Switch>
            <Route path="/documentos" component={Documentos} />
            <Route path="/equipos" component={Equipos} />
            <Route path="/tiposdocumentos" component={TiposDocumentos} />
            <Route path="/usuarios" component={Usuarios} />
        </Switch>
    </App>;
    
export default AppRoutes;