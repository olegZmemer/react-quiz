import React, { Component } from 'react'
import classes from './Layout.module.css'
import Drawer from '../../Components/Navigation/Drawer/Drawer'
import MenuToggle from '../../Components/Navigation/MenuToggle/MenuToggle'
import { connect } from 'react-redux';

class Layout extends Component{
    constructor(props){
        super(props);
        this.state ={
            menu: false
        }
    }
    toggleMenuHandler = ()=>{
        this.setState({
            menu: !this.state.menu
        })
    }
    menuCloseHandler = ()=>{
        this.setState({
            menu: false
        })
    }
    render(){
        return (
        <div className = {classes.Layout}>
            <Drawer
            isactive ={this.state.menu}
            onClose = {this.menuCloseHandler}
            isAuthenticated = {this.props.isAuthenticated}
            />
            <MenuToggle
            onToggle = {this.toggleMenuHandler}
            isactive = {this.state.menu}
            />

            
            <main>{this.props.children}</main>
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.token
})


export default connect(mapStateToProps)(Layout);