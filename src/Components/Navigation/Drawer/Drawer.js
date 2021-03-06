import React, {Component} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../ui/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'
export default class Drawer extends Component{
    constructor(props){
        super(props);
    }
    clickHandler = ()=>{
        this.props.onClose()
    }
    renderLinks(links){
        return links.map((link,index)=>{
            return (
                <li
                key = {index}
                >
                    <NavLink
                    to = {link.to}
                    exact = {link.exact}
                    activeClassName = {classes.active}
                    onClick = {this.clickHandler}>
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render(){
        const cls = [classes.Drawer];

        if(!this.props.isactive){
            cls.push(classes.close)
        }
        const links = [
            {to: '/', label: 'Quiz list', exact: true}
        ]
        if(this.props.isAuthenticated){
            links.push({to: '/quiz-creator', label: 'Create test', exact: false})
            links.push({to: '/logout', label: 'Logout', exact: false})
        } else{
            links.push({to: '/auth', label: 'Authorization', exact: false})
        }
        return (
            <React.Fragment>
                <nav
            className = {cls.join(' ')}
            >
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
            {this.props.isactive ? <Backdrop onClick = {this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}