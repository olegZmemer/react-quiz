import React from 'react'
import classes from './Backdrop.module.css'

export default function Backdrop(props){
    return (
        <div
        className = {classes.Backdrop}
        onClick = {props.onClick}
        isactive = {props.isactive}
        >

        </div>
    )
}