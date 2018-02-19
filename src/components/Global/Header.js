//Dependencies
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// Assets
import logo from '../../logo.jpg';
import '../App.css';

class Header extends Component {     
    
    render() {

        const itemsMenu = [{titulo:'Documentos', url: '/'}, {titulo:'Solicitudes', url: '/solicitudes'}];
        return (
                <header className="App-header">                                 
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>   
                                <a className="navbar-brand" >                                    
                                    <p className="App-title"><img src={logo} className="App-logo" alt="logo" /> Generador de consecutivos</p>                                  
                                </a>                                                                                                
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    {itemsMenu.map((item, key) => <li key={key}><Link to={item.url}>{item.titulo}</Link></li>)};
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                );
    }
}

export default Header;