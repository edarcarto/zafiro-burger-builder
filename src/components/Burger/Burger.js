import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    // Object.keys => transforma un objeto en array
    // si pones console.log antes del reduce te daras cuenta que retor un array
    // de 4 valores vacio. despues del reduce te bota solo 1
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //tranformar el contenido (valor numerico) en array
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        });
        if(transformIngredients.length === 0){
            transformIngredients = <p>Please start adding ingredients</p>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;