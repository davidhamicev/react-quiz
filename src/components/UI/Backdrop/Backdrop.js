import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = ({ backDropHadler }) => <div className={classes.Backdrop} onClick={backDropHadler}></div>

export default Backdrop;
