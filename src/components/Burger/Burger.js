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
            // en concat juntas arr con el nuevo valor
            return arr.concat(el);
        });
        // en caso el valor sea 0 muestras el siguiente mensaje
        if(transformIngredients.length === 0){
            transformIngredients = <p>Please start adding ingredients</p>
        }
        // sino muestras los ingredientes
    return (
        <div className={classes.Burger}>
            {/* La capa de arriba del pan */}
            <BurgerIngredient type="bread-top" />
            {transformIngredients}
            {/* La capa de abajo del pan */}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;