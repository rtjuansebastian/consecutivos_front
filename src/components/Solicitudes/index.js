//Dependencies
import React, { Component } from 'react';

class Solicitudes extends Component {
    
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            contactName:'',
            contactEmail:'',
            contactMessage:'',
            type:'',
            message:''
        };
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
        this.setState({ type: 'info', message: 'Enviando…' });
        const data = new FormData(event.target);
        fetch('http://consecutivos.brechadigitalregional.com/mailer.php',{method: 'POST', body:data}).then((response)=>{ 
                if(response.status===200){
                this.setState({ 
                    type: 'success', 
                    message: 'Hemos recibido su mensaje y lo contactaremos en breve. ¡Gracias!', 
                    contactName:'', 
                    contactEmail:'', 
                    contactMessage:''});    
                }else{
                    this.setState({ 
                    type: 'error', 
                    message: 'Por favor complete el formulario y envie de nuevo'});
                }
            });               
    }    
        
    render() {

        return (
                <div className="row">          
                    <h1 className="text-center">Solicitudes</h1>
                    <div className="col-md-12">
                    <p>Si necesita ayuda sobre el generador de consecutivos puede comunicarse al celular <a href="tel:+573197888886">3197888886</a> o al correo <a href="mailto:js.rodriguezt@uniandes.edu.co">js.rodriguezt@uniandes.edu.co</a> o completar el siguiente formulario</p>
                    </div>
                    <div className="col-md-12">
                        <form id="contactForm" method="POST" action="mailer.php" onSubmit={this.handleSubmit}>
                            <fieldset className="form-group">
                                <label>Nombre</label>
                                <input type="text" value={this.state.contactName} className="form-control" name="contactName" onChange={this.handleInputChange} required/>
                            </fieldset>

                            <fieldset className="form-group">
                                <label>E-mail:</label>
                                <input value={this.state.contactEmail} className="form-control" name="contactEmail" type="email" onChange={this.handleInputChange} required />
                            </fieldset>

                            <fieldset className="form-group">
                                <label>Mensaje:</label>
                                <textarea value={this.state.contactMessage} className="form-control" name="contactMessage" onChange={this.handleInputChange} required></textarea>
                            </fieldset>
                            <fieldset>
                                <button className="btn-crear">Enviar</button>
                            </fieldset>
                        </form>
                        <label>{this.state.message}</label>
                    </div>
                </div>
                );
    }
};

export default Solicitudes;