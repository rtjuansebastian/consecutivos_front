import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';

class App extends Component {
    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Generador de consecutivos</h1>
                    </header>
                    <div className="main container">
                        <p className="App-intro">
                            En esta pagina podra solicitar un consecutivo para su documento
                        </p>                    
                        <Consecutivo />                
                    </div>
                    <footer className="App-footer">
                        Brecha Digital 2018
                    </footer>
                </div>
                );
    }
}
;

class Consecutivo extends Component {

    constructor(props) {
        super(props);
        this.crearDocumento = this.crearDocumento.bind(this);
        this.traerDocumentos = this.traerDocumentos.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            documentos: [{"id": 0, "usuario": {"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}, "tipoDocumento": {"id": 0, "nombre": "", "siglas": ""}, "nombre": "Cargando...", "fecha": ""}],
            usuario: '',
            tipoDocumento: '',
            nombre: '',
            fecha: ''
        };
    }

    componentWillMount() {
        this.traerDocumentos();
    }

    componentDidMount() {
        //this.traerDocumentos();
    }

    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        // Some code here
    }

    componentDidUpdate(prevProps, prevState) {
        // Some code here
    }

    buscarDocumento(id) {
        fetch('http://localhost:8080/consecutivos/documento/' + id, {method: 'GET'})
                .then((response) => {
                    return response.json();
                })
                .then((documentos) => {
                    this.setState({documentos: documentos});
                });
    }

    crearDocumento(documento) {
        fetch('http://localhost:8080/consecutivos/documento', {method: 'POST', body: JSON.stringify(documento), headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then(() => {
                    this.traerDocumentos();
                });

    }

    traerDocumentos() {
        fetch('http://localhost:8080/consecutivos/documentos')
                .then((response) => {
                    return response.json();
                })
                .then((documentos) => {
                    this.setState({documentos: documentos});
                });
    }

    editarDocumento(documento) {
        var data = new FormData();
        data.append("json", JSON.stringify(documento));
        fetch('http://localhost:8080/consecutivos/documento', {method: 'PUT', body: data})
                .then((response) => {
                    return response.json();
                });
    }

    eliminarDocumento() {
        fetch('http://localhost:8080/consecutivos/documento', {method: 'DELETE'})
                .then((response) => {
                    return response.json();
                });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const documento = {"id": 0, "usuario": {"cedula": this.state.usuario}, "tipoDocumento": {"id": this.state.tipoDocumento}, "nombre": this.state.nombre, "fecha": this.state.fecha};
        this.setState({usuario: '', tipoDocumento: '', nombre: '', fecha: ''});
        this.crearDocumento(documento);
    }

    render() {
        let listado = null;
        if (this.state && this.state.documentos) {
            listado = <ListaDocumentos list={this.state.documentos}/>
        }
        let formulario = <FormularioDocumento campos={this.state}  handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
        return (
                <div className="row">                    
                    <div className="col-md-6">
                        <h1>Listado de documentos</h1>
                        {listado}
                    </div>
                    <div className="col-md-6">
                        <h1>Crear documento</h1>
                        {formulario}
                    </div>
                </div>
                );
    }
}

const Documento = props => {

    if(props.documento.tipoDocumento.siglas==="OTR"){
        props.documento.tipoDocumento.siglas="";
    }else{
        props.documento.nombre="";
    }
    
    if(props.documento.tipoDocumento.siglas!=="IM"){
        props.documento.usuario.iniciales="";
    }
    
    props.documento.fecha=props.documento.fecha.replace("-","");
    props.documento.fecha=props.documento.fecha.replace("-","");
    
    return (
            <li className="documento" key={props.documento.id}>{props.documento.usuario.equipo.siglas} {props.documento.tipoDocumento.siglas} {props.documento.usuario.iniciales} {props.documento.nombre} {props.documento.fecha} </li>
            );
};

const ListaDocumentos = props => {
    const listadoDocumentos = props.list.map((documento, i) => <Documento documento={documento} key={i}/>);
    return (
            <ul className="listadoDocumentos">
                {listadoDocumentos}
            </ul>
            );
};

const FormularioDocumento = props => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label>
                        Usuario:
                    </label>                        
                    <input className="form-control" name="usuario" type="text" value={props.campos.usuario} onChange={props.handleInputChange}/>
                </div>
                <div className="form-group">                    
                    <label>
                        Tipo Documento:
                    </label>                        
                    <input className="form-control" name="tipoDocumento" type="number" value={props.campos.tipoDocumento} onChange={props.handleInputChange}/>                    
                </div> 
                <div className="form-group">                    
                    <label>
                        Nombre:
                    </label>                        
                    <input className="form-control" name="nombre" type="text" value={props.campos.nombre} onChange={props.handleInputChange}/>                    
                </div>
                <div className="form-group">                    
                    <label>
                        Fecha:
                    </label>                        
                    <input className="form-control" name="fecha" type="text" value={props.campos.fecha} onChange={props.handleInputChange}/>                    
                </div>
                <input className="form-control btn btn-success" type="submit" value="Crear" />                    
            </form>
            );
};

export default App;
