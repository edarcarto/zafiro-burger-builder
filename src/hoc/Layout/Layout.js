import React, { Component } from 'react';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer : true
	}

	// esta función es para cerrar el backdrop
	sideDrawerCloseHandler = () => {
		this.setState({
			showSideDrawer: false
		})
	}

	// esta funcion permite mostrar el menu del Toolbar
	sideDrawerToggleHandler = () => {
		// el valor a retornar es boleano pero la intención de poner !prevState.showSideDrawer
		// es porque se quiere cambiar el valor cuando sea true a false y viceversa
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	// el componente funcional aux sirve para retornar el contenido ante un componente mayor
	render() {
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer 
					open={this.state.showSideDrawer} 
					closed={this.sideDrawerCloseHandler} 
				/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>
		)
	}
}

export default Layout;