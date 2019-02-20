import React, { Component } from "react";

import Aux from '../../../hoc/Auxiliary';
import Button from './../../UI/Button/Button';

class OrderSummary extends Component {

    //  Esta podría ser un componente funcional
    // no tiene que ser una clase
    componentWillUpdate() {
        console.log("[OrderSummary.js] componentWillUpdate");
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span style={{
                    textTransform: 'capitalize'
                }}>{igKey}</span> : {props.ingredients[igKey]}</li>
            });
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price}</strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchasableCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchasableContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;