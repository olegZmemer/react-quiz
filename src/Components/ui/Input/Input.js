import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched 
}
export default function Input(props) {
    
    const inputType = props.type || 'text';
    let cls = [classes.Input];
    const htmlFor = `${props.type}-${Math.random()}`
    if(isInvalid(props)){
        cls.push(classes.invalid)
    }
    return (
        <div className ={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
            type={inputType}
            
            id = {htmlFor}
            value = {props.value}
            onChange = {props.onChange}
            />
            {isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
        </div>
    )
};
