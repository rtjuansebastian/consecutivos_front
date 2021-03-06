//Dependencies
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Assets
import logo from '../../logoGC.png';
import '../App.css';

class Header extends Component {     
    
    render() {

        const itemsMenu = [{titulo:'Documentos', url: '/documentos'}, {titulo:'Solicitudes', url: '/solicitudes'}];
        return (
                <header className="App-header">
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>                                
                            <a><img className="App-logo" src={logo} /><p className="App-title">Generador de Consecutivos</p></a>
                            </Navbar.Brand>
                          <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                {itemsMenu.map((item, key) => <LinkContainer key={key} to={item.url}><NavItem>{item.titulo}</NavItem></LinkContainer>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>      
                </header>
                );
    }
}

export default Header;