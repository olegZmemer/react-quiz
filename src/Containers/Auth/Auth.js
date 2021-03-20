import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../Components/ui/Button/Button'
import Input from '../../Components/ui/Input/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import {auth} from '../../store/actions/auth'
class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Email is incorrect',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: `Password can't be so short`,
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    loginHandler = ()=>{
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
    }
    signupHandler =()=>{
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
    }
    submitHandler = (e)=>{
        e.preventDefault()
    }
    validateControl(value, validation){
        if(!validation){
            return true
        }
        let isValid = true;
        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.email){
            isValid = is.email(value) && isValid;
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid
    }
    onChangeHandler = (e, controlName)=>{
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value  = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true;

        Object.keys(formControls).forEach((ctrl)=>{
            isFormValid = formControls[ctrl].valid && isFormValid;
        })
        this.setState({
            formControls, isFormValid 
        })
    }
    renderInputs = ()=>{
        return Object.keys(this.state.formControls).map((cname, index)=>{
            const control = this.state.formControls[cname]
            return (
                <Input
                key = {cname + index}
                type = {control.type}
                value = {control.value}
                valid = {control.valid}
                label = {control.label}
                touched = {control.touched}
                shouldValidate = {!!control.validation}
                errorMessage = {control.errorMessage}
                onChange = {event => this.onChangeHandler(event, cname)}
                />
            )
        })
    }
    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                          type="success"
                          onClick={this.loginHandler}
                          disabled = {!this.state.isFormValid}
                        >
                          Sign In
                        </Button>

                        <Button
                          type="primary"
                          onClick={this.signupHandler}
                        >
                          Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch)=>{
    return {
        auth: (email, password, isLogin)=> dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)