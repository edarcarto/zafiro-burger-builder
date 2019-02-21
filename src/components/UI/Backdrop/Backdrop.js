import React from 'react';

import classes from './Backdrop.css';
// función que maneja eventos en css
// cuando le das click se oculta
const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;