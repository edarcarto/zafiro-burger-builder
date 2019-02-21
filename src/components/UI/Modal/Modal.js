import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

// esta clase funcional cambio a clase base
// para poder trabajar con su estado shouldComponentUpdate
class Modal extends Component {

    // en este estado si el prop anterior es diferente al nuevo
    // se actualiza el componente y recarga memoria , si no no.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log("[Modal.js] componentWillUpdate");
    }

    // en el modal llamo al backdrop es un div que se pone por encima de lo demas
    // este modal es un container con funcionalidades css que retorna lo que ingresa
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;