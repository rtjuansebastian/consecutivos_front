//Dependencies
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Assets
import logo from '../../logo.jpg';
import '../App.css';

class Header extends Component {     
    
    render() {

        const itemsMenu = [{titulo:'Documentos', url: '/'}, {titulo:'Solicitudes', url: '/solicitudes'}];
        return (
                <header className="App-header">
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a>Generador de Consecutivos</a>
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