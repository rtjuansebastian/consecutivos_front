//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Button } from 'react-bootstrap';

//Components
import Header from './Global/Header';
import Content from './Global/Content';

class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };
    
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);        
        this.state = {
            auth:{}
        };
        
        this.props.auth.handleAuthentication();
    };
    
    
    
    componentWillMount() {
        //this.setState({auth:this.props.auth});
        //this.setState({auth:this.props.auth},()=>{this.props.auth.handleAuthentication()}); 
        //this.props.auth.handleAuthentication();

    }    
    
    componentDidMount() {                
        //this.state.auth.handleAuthentication();        
    }
    
    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    login() {
        this.props.auth.login();        
    }

    logout() {
        this.props.auth.logout();
    }    
        
    render() {        
        const {children} = this.props;        
        return (
                <div className="App">
                    <Header/>
                    {
                        this.props.auth.isAuthenticated() && (
                                    <div>                                                                 
                                        <Content body={children} />
                                    </div>
                                )
                    }
                    {
                        !this.props.auth.isAuthenticated() && (
                                    <div className="col-md-4">
                                        <form onSubmit={this.login.bind(this)}>
                                            <div className="form-group">
                                                <label>Contraseña</label>
                                                <input className="form-control" id="login-password" type="password" />
                                            </div>
                                            <Button
                                                bsStyle="primary"
                                                className="btn-margin"
                                                onClick={this.login.bind(this)}
                                                >
                                                Ingresar
                                            </Button>
                                        </form>
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
