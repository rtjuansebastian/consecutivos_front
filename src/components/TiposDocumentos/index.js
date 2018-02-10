//Dependencies
import React, { Component } from 'react';

class TiposDocumentos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tiposDocumentos: [{"id": 0, "nombre": "", "siglas": "", "individual":false, "titulo":false}]
        };
    }

    componentWillMount() {
        this.traerTiposDocumentos();
    }

    traerTiposDocumentos() {
        fetch('http://localhost:8080/consecutivos/tiposDocumentos')
                .then((response) => {
                    return response.json();
                })
                .then((tiposDocumentos) => {
                    this.setState({tiposDocumentos: tiposDocumentos});
                });
    }
    render() {

        return (
                <div className="row">                    
                    <div className="col-md-6">
                        <TablaTiposDocumentos tiposDocumentos={this.state.tiposDocumentos} />
                    </div>
                </div>
                );
    }
}    

const TablaTiposDocumentos = props => {
    const FilasTiposDocumentos = props.tiposDocumentos.map((tipoDocumento, index) => <FilaTipoDocumento tipoDocumento={tipoDocumento} key={index}/>);
    return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Siglas</th>
                        <th>Es individual</th>
                        <th>Lleva titulo</th>
                    </tr>
                </thead>
                <tbody>
                    {FilasTiposDocumentos}
                </tbody>
            </table>
            );
};

const FilaTipoDocumento = props => {

    return (
            <tr>
                <td>{props.tipoDocumento.nombre}</td>
                <td>{props.tipoDocumento.siglas}</td>
                <td>{props.tipoDocumento.individual.toString()}</td>
                <td>{props.tipoDocumento.titulo.toString()}</td>
            </tr>
            );
};    

export default TiposDocumentos;
