import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

// variable global de los controles
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' }
];

// Recorro el array mi por cada uno muestro un control
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {/* () => props.funcion  es para mandar parametros personalizados */}
        {controls.map(ctrl=>(
            <BuildControl
                key={ctrl.label} 
                label={ctrl.label}
                type={ctrl.type}
                added={() => props.ingredientsAdded(ctrl.type) }
                removed={() => props.ingredientsRemoved(ctrl.type) }
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;