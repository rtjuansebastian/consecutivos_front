//Dependencies
import React, { Component } from 'react';

class Equipos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipos: [{"id": 0, "nombre": "", "siglas": ""}]
        };
    }

    componentWillMount() {
        this.traerEquipos();
    }

    traerEquipos() {
        fetch('http://localhost:8080/consecutivos/equipos')
                .then((response) => {
                    return response.json();
                })
                .then((equipos) => {
                    this.setState({equipos: equipos});
                });
    }

    render() {

        return (
                <div className="row">          
                    <div className="col-md-12"><h1 className="App-intro">Equipos</h1></div>
                    <div className="col-md-12">
                        <TablaEquipos equipos={this.state.equipos} />
                    </div>
                </div>
                );
    }
}

const TablaEquipos = props => {
    const FilasEquipos = props.equipos.map((equipo, index) => <FilaEquipo equipo={equipo} key={index}/>);
    return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Siglas</th>
                    </tr>
                </thead>
                <tbody>
                    {FilasEquipos}
                </tbody>
            </table>
            );
};

const FilaEquipo = props => {

    return (
            <tr>
                <td>{props.equipo.nombre}</td>
                <td>{props.equipo.siglas}</td>
            </tr>
            );
};

export default Equipos;