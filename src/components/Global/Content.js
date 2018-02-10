//Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
    
    static propTypes={
        body: PropTypes.object.isRequired
    };    
    
    render() {
        
        const {body} = this.props;

        return (
                <div className="Content container-fluid">                    
                    <p className="App-intro">
                        Bienvenido a la aplicación para gestión de consecutivos
                    </p>        
                    {body}
                </div>
                );
    }
}

export default Content;