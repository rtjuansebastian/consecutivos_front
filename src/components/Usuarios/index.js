//Dependencies
import React, { Component } from 'react';

class Usuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usuarios: [{"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}]
        };
    }

    componentWillMount() {
        this.traerUsuarios();
    }

    traerUsuarios() {
        fetch('http://localhost:8080/consecutivos/usuarios')
                .then((response) => {
                    return response.json();
                })
                .then((usuarios) => {
                    this.setState({usuarios: usuarios});
                });
    }
    
    render() {

        return (
                <div className="row">                    
                    <div className="col-md-6">
                        <TablaUsuarios usuarios={this.state.usuarios} />
                    </div>
                </div>
                );
    }
}

const TablaUsuarios = props => {
    const FilasUsuarios = props.usuarios.map((usuario, index) => <FilaUsuario usuario={usuario} key={index}/>);
    return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Equipo</th>
                        <th>Iniciales</th>
                    </tr>
                </thead>
                <tbody>
                    {FilasUsuarios}
                </tbody>
            </table>
            );
};

const FilaUsuario = props => {

    return (
            <tr>
                <td>{props.usuario.cedula}</td>
                <td>{props.usuario.nombre}</td>
                <td>{props.usuario.correo}</td>
                <td>{props.usuario.equipo.nombre}</td>
                <td>{props.usuario.iniciales}</td>
            </tr>
            );
}; 

export default Usuarios;
