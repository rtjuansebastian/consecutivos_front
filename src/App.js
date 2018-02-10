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
            documentos: [{"id": 0, "usuario": {"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}, "tipoDocumento": {"id": 0, "nombre": "", "siglas": ""}, "nombre": "Cargando...", "fecha": "", "consecutivo": "0"}],
            tiposDocumentos: [{"id": 0, "nombre": "", "siglas": "", "individual": false, "titulo": false}],
            usuarios: [{"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}],
            usuario: '26258041',
            tipoDocumento: '1',
            nombre: '',
            fecha: ''
        };
    }

    componentWillMount() {
        this.traerUsuarios();
        this.traerTiposDocumentos();
        this.traerDocumentos();
    }

    componentDidMount() {

        var selectorTipoDocumento = document.getElementById("selectorTipoDocumento");

        selectorTipoDocumento.addEventListener("change", () => {
            var opcionSeleccionada=selectorTipoDocumento.options[selectorTipoDocumento.selectedIndex];
            var inputNombreDocumento=document.getElementById("nombreDocumento");
            
            if(opcionSeleccionada.dataset.titulo==='true'){            
                inputNombreDocumento.readOnly = false;
            }else{                
                inputNombreDocumento.readOnly = true;                
                //this.setState({nombre: ''}); NO FUNCIONO!!
            }
        });

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

    traerTiposDocumentos() {
        fetch('http://localhost:8080/consecutivos/tiposDocumentos')
                .then((response) => {
                    return response.json();
                })
                .then((tiposDocumentos) => {
                    this.setState({tiposDocumentos: tiposDocumentos});
                });
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        //console.log("campo: "+name+ " - Valor: " + value);
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const documento = {"id": 0, "usuario": {"cedula": this.state.usuario}, "tipoDocumento": {"id": this.state.tipoDocumento}, "nombre": this.state.nombre, "fecha": this.state.fecha, "consecutivo": "0"};
        this.setState({usuario: '26258041', tipoDocumento: '1', nombre: '', fecha: ''});
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

    var nombreDocumento = "";

    if (props.documento.tipoDocumento.individual === true) {

        nombreDocumento = props.documento.usuario.equipo.siglas + " " + props.documento.tipoDocumento.siglas + " " + props.documento.usuario.iniciales + " ";
        if (props.documento.tipoDocumento.titulo === true) {
            nombreDocumento += props.documento.nombre + " ";
        }

        nombreDocumento += pad(props.documento.consecutivo, 3) + " " + props.documento.fecha.replace("-", "").replace("-", "");

    } else {

        nombreDocumento = props.documento.usuario.equipo.siglas + " ";

        if (props.documento.tipoDocumento.siglas !== "OTR") {

            nombreDocumento += props.documento.tipoDocumento.siglas + " ";
        }

        nombreDocumento += pad(props.documento.consecutivo, 3) + " ";

        if (props.documento.tipoDocumento.titulo === true) {
            nombreDocumento += props.documento.nombre + " ";
        }

        nombreDocumento += props.documento.fecha.replace("-", "").replace("-", "");
    }

    return (
            <li className="documento" key={props.documento.id}>{nombreDocumento} </li>
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

const SelectorTiposDocumentos = props => {
    const opciones = props.tiposDocumentos.map((tipoDocumento, i) => <option value={tipoDocumento.id} key={i} data-titulo={tipoDocumento.titulo}>{tipoDocumento.nombre}</option>);
    return (
            <select id="selectorTipoDocumento" name="tipoDocumento" className="form-control" value={props.value} onChange={props.change}>
                {opciones}
            </select>
            );
};

const SelectorUsuarios = props => {
    const opciones = props.usuarios.map((usuario, i) => <option value={usuario.cedula} key={i}>{usuario.nombre}</option>);
    return (
            <select name="usuario" className="form-control" value={props.value} onChange={props.change}>
                {opciones}
            </select>
            );
};

const FormularioDocumento = props => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div className="form-group">
                    <label>
                        Usuario:
                    </label>                        
                    <SelectorUsuarios value={props.campos.usuario} usuarios={props.campos.usuarios} change={props.handleInputChange} />
                </div>
                <div className="form-group">                    
                    <label>
                        Tipo Documento:
                    </label>      
                    <SelectorTiposDocumentos value={props.campos.tipoDocumento} tiposDocumentos={props.campos.tiposDocumentos} change={props.handleInputChange} />
                </div> 
                <div className="form-group">                    
                    <label>
                        Nombre:
                    </label>                        
                    <input id="nombreDocumento" readOnly={true} className="form-control" name="nombre" type="text" value={props.campos.nombre} onChange={props.handleInputChange}/>                    
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

function pad(num, length) {
    var n = num.toString();
    while (n.length < length)
        n = "0" + n;
    return n;
}

export default App;
