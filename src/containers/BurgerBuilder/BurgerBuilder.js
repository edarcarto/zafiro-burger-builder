import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// variable global de el contenidos de los ingredientes de la hamburguesa
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }
    state = {
        ingredients : {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    // función para actualizar el estado de los ingredientes
    updatePurchaseState(ingredients) {
        // ingredients => Ingresan los nuevos ingredientes
        // Object.keys => devuelve un array de las propiedades names de un objeto
        // ejemplo : var ingredients = { salad: 4, bacon: 0, cheese: 0, meat: 0 };
        // resultado : salad,bacon,cheese,meat
        const sum = Object.keys(ingredients)
            // map => Va a recorrer cada valor y esperar que retornes en este caso un objeto
            .map(igKey => {
                return ingredients[igKey]; // ingredients['salad'] = 4
            })
            // aqui estamos reducuciendo los datos inecesarios (en este caso los que no se mandan)
            // ejemplo : ingredients = { salad: 4, bacon: 0, cheese: 0, meat: 0 };
            // resultado : 4 + 0 + 0 + 0
            .reduce((sum, el) => {
                return sum + el
            },0);
        this.setState({
            purchasable: sum > 0 // esto me da un valor boleano
        });
    }

    // función que permite agregar ingredientes a la hamburguesa
    addIngredientHandler = (type) => {
        // guardo en una variable el valor anterior 
        // por ejemplo : ingredients['salad'] = 4
        const oldCount = this.state.ingredients[type];
        // aqui le sumo cantidad eg: 5 
        const updatedCount = oldCount + 1;
        // aqui creo una variable spred copiando el state
        const updateIngredients = {
            ...this.state.ingredients
        };
        // actualizo el valor anterior
        updateIngredients[type] = updatedCount;
        // saco el precio del ingrediente
        const priceAddition = INGREDIENT_PRICES[type];
        // el valor anterior
        const oldPrice = this.state.totalPrice;
        // lo guardo e nuevo precio
        const newPrice = oldPrice + priceAddition ;
        // actualizo los estados de ingredientes y precio total
        this.setState({
            totalPrice: newPrice, ingredients: updateIngredients
        });
        // llamo a la función que actualiza si se puede comprar
        this.updatePurchaseState(updateIngredients);
    }

    // función que elimina valor de los ingredientes
    // tiene la misma funcionalidad que agregar  pero inverso
    removeIngredientHandler = (type) => {
        // guardo en una variable el valor anterior 
        // por ejemplo : ingredients['salad'] = 4
        const oldCount = this.state.ingredients[type];
        // pregunt si es mayor o igual que 0
        if(oldCount <= 0) {
            // si es asi aqui termina la instrucción
            // y lo de abajo no ocurre
            return;
        }
        // resto 
        const updatedCount = oldCount - 1;
        // aqui creo una variable spred copiando el state
        const updateIngredients = {
            ...this.state.ingredients
        };
        // actualizo el valor segun el ingrediente
        updateIngredients[type] = updatedCount;
        // saco el precio del ingrediente
        const priceDeduction = INGREDIENT_PRICES[type];
        // busco el precio total anterior
        const oldPrice = this.state.totalPrice;
        // al restar obtengo el nuevo
        const newPrice = oldPrice - priceDeduction ;
        // actualizar el state
        this.setState({
            totalPrice: newPrice, ingredients: updateIngredients
        });
        // llamo a la función que actualiza si se puede comprar
        this.updatePurchaseState(updateIngredients);
    }

    // función para cambiar el estado boleano true de purchasing
    // es un falg que dice que se puede comprar
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    // función para cambiar el estado boleano false de purchasing
    // es un falg que dice que no se puede comprar
    purcharseCancelHanlder = () => {
        this.setState({ purchasing: false });
    }

    // función procederá a guardarse la compra
    purchaseContinueHandler = () => {
        // en este momento llama a una alerta
        alert('You continue!');
    }

    render () {
        // copio la constante tipo spred
        const disabledInfo = {
            ...this.state.ingredients
        };
        // recorro y pregunto si es mayor a 0 cambiando el valor a verdad o falso
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // Aux => función que actua como un contendor y devulve lo ingresado
        // se pone por buenas practicas
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purcharseCancelHanlder}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchasableCancelled={this.purcharseCancelHanlder}
                        purchasableContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;