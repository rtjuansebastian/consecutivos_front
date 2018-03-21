//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Button } from 'react-bootstrap';
import history from '../history';
//Components
import Header from './Global/Header';
import Content from './Global/Content';
import Logo from '../logoGC.png'

class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            ingreso: false
        };
    }
    ;
            login() {
        const pass = document.getElementById('login-password').value;

        const body = {
            "grant_type": "password",
            "username": "brechadigital@mintic.gov.co",
            "password": pass,
            "audience": "https://consecutivos/login",
            "scope": "read:sample",
            "client_id": "hR8PaNexLs4vRmsOz2n79u476YjJWHqQ",
            "client_secret": "GkQFiE9fyoQ811e3H7gZj3Prz5ptLUYXFhWeNaWh2lBdICavBEWhgQZFcXoDosg0"
        }

        fetch('https://mintic.auth0.com/oauth/token', {method: 'POST', body: JSON.stringify(body), headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then((response) => {
                    return response.json();
                })
                .then((authResult) => {
                    if (authResult.error) {
                        alert(authResult.error_description);
                    } else {
                        this.setState({ingreso: true});
                        history.push('/documentos');
                    }
                });
    }

    submit(e) {
        e.preventDefault();
        this.login();
    }

    render() {
        const {children} = this.props;
        const ingreso = this.state.ingreso;

        return (
                <div className="App">
                    <Header/>
                    {
                    ingreso && (
                                        <div>                                                                 
                                            <Content body={children} />
                                        </div>
                            )
                    }
                    {
                    !ingreso && (
                                        <div className="row">
                                            <div className="col-md-6 col-md-offset-3">
                                                <div className="clearfix"></div>
                                                <br />
                                                <img src={Logo} className="logoForm" />
                                                <h1 className="titleForm">Bienvenido al generador de consecutivos, para ingresar por favor digite la contraseña.</h1>
                                                <form onSubmit={this.submit}>
                                                    <div className="form-group">                                                
                                                        <h2>Contraseña</h2>
                                                        <input className="form-control" id="login-password" type="password" />                                    
                                                    </div>
                                                </form>
                                                <input type="button" className="btn btn-crear form-control" value="INGRESAR" onClick={this.login.bind(this)} />                                        
                                                <p>Si necesita ayuda puede comununicarse con <a href="mailto:js.rodriguezt@uniandes.edu.co">js.rodriguezt@uniandes.edu.co</a></p>
                                            </div>
                                        </div>
                            )
                    }                        
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <footer className="App-footer">
                        Brecha Digital 2018
                    </footer>
                </div>
                );
    }
}
;

export default App;
