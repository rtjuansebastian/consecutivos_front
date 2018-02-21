//Dependencies
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import moment from 'moment';
import { Tooltip, OverlayTrigger} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
//Components
import '../input-moment/css/input-moment.css';
import InputMoment from '../input-moment/input-moment';

class Documentos extends Component {

    constructor(props) {
        super(props);
        this.crearDocumento = this.crearDocumento.bind(this);
        this.traerDocumentos = this.traerDocumentos.bind(this);
        this.eliminarDocumento = this.eliminarDocumento.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);     
        this.handleDelete = this.handleDelete.bind(this);     
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            documentos: [{"id": 0, "usuario": {"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}, "tipoDocumento": {"id": 0, "nombre": "", "siglas": ""}, "nombre": "Cargando...", "fecha": "", "consecutivo": "0"}],
            tiposDocumentos: [{"id": 0, "nombre": "", "siglas": "", "individual": false, "titulo": false}],
            usuarios: [{"cedula": "", "nombre": "", "correo": "", "equipo": {"id": 0, "nombre": "", "siglas": ""}, "iniciales": ""}],
            equipos:[{"id": 0, "nombre": "", "siglas": ""}],
            usuario: '36303681',
            tipoDocumento: '1',
            nombre: '',
            fecha: '',
            m: moment(),
            ultimoConsecutivo:'',
            text: '',
            prevDoc:{"id": 0, "usuario": {"cedula": "36303681", "nombre": "Adriana Constanza Alvarez Embus", "correo": "asesorhuila@mintic.gov.co", "equipo": {"id": 6, "nombre": "Asesores Regionales", "siglas": "REG AS"}, "iniciales": "HUI"}, "tipoDocumento": {"id": 1, "nombre": "Acta", "siglas": "AC", "individual": false, "titulo": false}, "nombre": "", "fecha": moment().format("YYYYMMDD"), "consecutivo": "0"}            
        };        
    }

    componentWillMount() {
        this.traerUsuarios();
        this.traerTiposDocumentos();
        this.traerDocumentos();
        this.traerEquipos();
        this.setState({fecha:this.state.m.format('YYYY-MM-DD')});        
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
        fetch('http://159.89.94.78:8080/consecutivos/documento/' + id, {method: 'GET'})
                .then((response) => {
                    return response.json();
                })
                .then((documentos) => {
                    this.setState({documentos: documentos});
                });
    }

    crearDocumento(documento) {       
        fetch('http://159.89.94.78:8080/consecutivos/documento', {method: 'POST', body: JSON.stringify(documento), headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then((response) => {
                    return response.json();
                })                
                .then((nuevoDocumento) => {
                    var fechaDoc=documento.fecha;
                    nuevoDocumento.fecha=fechaDoc;
                    var nombreDocumento=traerNombreDocumento(nuevoDocumento);
                    alert("Se ha creado el documento: " + nombreDocumento);
                    var inputNombreDocumento=document.getElementById("nombreDocumento");
                    inputNombreDocumento.readOnly = true;  
                    this.traerDocumentos();                                        
                });
                
    }

    traerDocumentos() {
        fetch('http://159.89.94.78:8080/consecutivos/documentos')
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
        fetch('http://159.89.94.78:8080/consecutivos/documento', {method: 'PUT', body: data})
                .then((response) => {
                    return response.json();
                });
    }

    eliminarDocumento(id) {
        fetch('http://159.89.94.78:8080/consecutivos/documento/'+id, {method: 'DELETE'})
                .then(() => {
                    this.traerDocumentos();
                });
    }

    traerTiposDocumentos() {
        fetch('http://159.89.94.78:8080/consecutivos/tiposDocumentos')
                .then((response) => {
                    return response.json();
                })
                .then((tiposDocumentos) => {
                    this.setState({tiposDocumentos: tiposDocumentos});
                });
    }

    traerUsuarios() {
        fetch('http://159.89.94.78:8080/consecutivos/usuarios')
                .then((response) => {
                    return response.json();
                })
                .then((usuarios) => {
                    this.setState({usuarios: usuarios});
                });
    }
    
    traerEquipos() {
        fetch('http://159.89.94.78:8080/consecutivos/equipos')
                .then((response) => {
                    return response.json();
                })
                .then((equipos) => {
                    this.setState({equipos: equipos});
                });
    }    

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;        
        //console.log("campo: "+name+ " - Valor: " + value);
        this.setState({
            [name]: value            
        },()=>{
            this.previsualizarDocumento();
        });                    
    }

    handleSubmit(event) {
        event.preventDefault();    
        var usuarios=this.state.usuarios;
        var cedulaUsuario=this.state.usuario;
        var usuario = usuarios.find(item => item.cedula === parseInt(cedulaUsuario));
        var tiposDocumentos=this.state.tiposDocumentos;
        var idTipoDocumento=this.state.tipoDocumento;
        var tipoDocumento=tiposDocumentos.find(item => item.id === parseInt(idTipoDocumento));
        const documento = {"id": 0, "usuario": usuario, "tipoDocumento": tipoDocumento, "nombre": this.state.nombre, "fecha": this.state.fecha, "consecutivo": "0"};
        this.setState({usuario: '36303681', tipoDocumento: '1', nombre: '', fecha: this.state.m.format('YYYY-MM-DD')},()=>{this.previsualizarDocumento();});
        this.crearDocumento(documento);        
    }
    
    handleDelete(event){
        event.preventDefault();
        const id=event.target.dataset.id;        
        this.eliminarDocumento(id);
    }
    
    handleChange = m => {
        this.setState({ m }); 
        this.setState({fecha:this.state.m.format('YYYY-MM-DD')},()=>{
            this.previsualizarDocumento();
        });
    };    
    
    handleSave = () => {
       console.log('saved', this.state.m.format('llll'));
     };   
     
    previsualizarDocumento = () =>{
        var usuarios=this.state.usuarios;
        var cedulaUsuario=this.state.usuario;        
        var usuario = usuarios.find(item => item.cedula === parseInt(cedulaUsuario));
        var tiposDocumentos=this.state.tiposDocumentos;
        var idTipoDocumento=this.state.tipoDocumento;
        var tipoDocumento=tiposDocumentos.find(item => item.id === parseInt(idTipoDocumento));           
        var documento={"id": 0, "usuario": usuario, "tipoDocumento": tipoDocumento, "nombre": this.state.nombre, "fecha": this.state.fecha, "consecutivo": "0"};                        
        this.setState({prevDoc:documento});
    }   
    
    render() {
        let listado = null;
        if (this.state && this.state.documentos) {
            listado = <ListaDocumentos documentos={this.state.documentos} handleDelete={this.handleDelete} />
        }        
        let formulario = <FormularioDocumento campos={this.state}  handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} handleChange={this.handleChange} /> ;                               
        return (
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="align-center">Si necesita editar algún documento dirijase a la ventana de solicitudes.</h1>
                    </div>
                    <div className="col-md-6">
                        <h2>Listado de documentos</h2>
                        {listado}
                    </div>
                    <div className="col-md-6">
                        <h2>Crear documento</h2>
                        <p>Previsualización: {traerNombreDocumento(this.state.prevDoc)}</p>
                        {formulario}                             
                    </div>
                </div>
                );
    }
}

const Documento = props => {

    var nombreDocumento = traerNombreDocumento(props.documento);

    return (
            <tr className="documento" key={props.documento.id}>
                <td>{nombreDocumento}</td> 
            </tr>
            );
};

const ListaDocumentos = props => {
    //const listadoDocumentos = props.documentos.map((documento, i) => <Documento documento={documento}  key={i} handleDelete={props.handleDelete} />);   
    var item={};     
    const listadoDocumentos = props.documentos.map((documento, i) => item={id:documento.id, nombre:traerNombreDocumento(documento), fecha:documento.fecha});     
    const options = {
      exportCSVText: 'Exportar Excel',
      exportCSVSeparator: ';'
    };       
    return (
            <div>          
                <BootstrapTable data={listadoDocumentos} options={ options } search exportCSV csvFileName='Consecutivos.xls' searchPlaceholder='Buscar...' pagination striped hover>
                    <TableHeaderColumn isKey dataField='id' dataSort>ID (Creación)</TableHeaderColumn>
                    <TableHeaderColumn dataField='nombre'>Nombre</TableHeaderColumn>
                    <TableHeaderColumn dataField='fecha' dataSort>Fecha</TableHeaderColumn>
                </BootstrapTable> 
            </div>
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
    
    const tooltip = (
        <Tooltip id="tooltip">
          <strong>El nombre del documento debe ser maximo de 50 caracteres</strong>
        </Tooltip>
    );
    
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
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <input id="nombreDocumento" readOnly={true} className="form-control" name="nombre" type="text" value={props.campos.nombre} onChange={props.handleInputChange} maxLength="50"/>                    
                    </OverlayTrigger>
                </div>
                <div className="form-group">                    
                    <label>
                        Fecha:
                    </label> 
                    <div>
                    <input id="fechaDocumento" className="form-control" readOnly={true} type="text" value={props.campos.m.format("YYYY-MM-DD")} />
                    <InputMoment                      
                      moment={props.campos.m}
                      onChange={props.handleChange}
                      minStep={5}
                      onSave={props.handleSave}
                    />                     
                    </div>
                </div>
                <button className="form-control btn-crear">Crear</button>                    
            </form>
            );
};

function pad(num, length) {
    var n = num.toString();
    while (n.length < length)
        n = "0" + n;
    return n;
}

function traerNombreDocumento(documento){
    var nombreDocumento = "";

    if (documento.tipoDocumento.individual === true) {

        nombreDocumento = documento.usuario.equipo.siglas + " " + documento.tipoDocumento.siglas + " " + documento.usuario.iniciales + " ";
        if (documento.tipoDocumento.titulo === true) {
            nombreDocumento += documento.nombre + " ";
        }

        nombreDocumento += pad(documento.consecutivo, 3) + " " + documento.fecha.replace("-", "").replace("-", "");

    } else {

        nombreDocumento = documento.usuario.equipo.siglas + " ";

        if (documento.tipoDocumento.siglas !== "OTR") {

            nombreDocumento += documento.tipoDocumento.siglas + " ";
        }

        nombreDocumento += pad(documento.consecutivo, 3) + " ";

        if (documento.tipoDocumento.titulo === true) {
            nombreDocumento += documento.nombre + " ";
        }

        nombreDocumento += documento.fecha.replace("-", "").replace("-", "");
    }
    
    return nombreDocumento;
}

export default Documentos;