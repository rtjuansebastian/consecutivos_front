//Dependencies
import React, { Component } from 'react';
import  { Redirect, Route } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';

class ModalEditar extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      show: false,
      id: this.props.documento.id,
      usuario: this.props.documento.usuario.cedula,
      nombre: this.props.documento.nombre,
      fecha: this.props.documento.fecha,
      tipoDocumento:this.props.documento.tipoDocumento.id,
      consecutivo: this.props.documento.consecutivo,
      editado: false
    };
  }

    handleHide() {
      this.setState({ show: false });
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
        const documento = {"id": this.state.id, "nombre": this.state.nombre, "fecha": this.state.fecha, usuario:{cedula:this.state.usuario}, tipoDocumento:{id:this.state.tipoDocumento}, consecutivo: this.state.consecutivo};
        this.editarDocumento(documento);
        this.setState({ show: false });
    }
    
    editarDocumento(documento) {
        fetch('http://localhost:8080/consecutivos/documento', {method: 'PUT', body: JSON.stringify(documento), headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}})
                .then(() => {
                    //this.setState({editado:true});
                    window.location.reload()
                });

    }    
  
  render() {
      
    if(this.state.editado){
        
      return (
        <Route>            
            <Redirect to='/' />
        </Route>
        );       
       /*
       return(
               <Refresh path="/refresh"/>
            );
            */
    }
    return (
      <div className="modal-container">          
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.setState({ show: true })}
        >
          Editar
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleHide}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Editar Documento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
                <div>
                    <input type="hidden" name="id" value={this.state.documento} />
                </div>
                <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-control" type="text" name="nombre" value={this.state.nombre} onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Fecha</label>
                    <input className="form-control" type="text" name="fecha" value={this.state.fecha} onChange={this.handleInputChange} />
                </div>                
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Editar</Button>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

/*
const Refresh = ({ path = '/' }) => (
    <Route
        path={path}
        component={({ history, location, match }) => {
            history.replace({
                ...location,
                pathname:location.pathname.substring(match.path.length)
            });
            return null;
        }}
    />
);
*/

export default ModalEditar;
