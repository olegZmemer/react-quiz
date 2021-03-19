import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'
function AnswersList(props){
    return (
    <ul className = {classes.AnswersList}>
        {props.answers.map((ans, index)=>{
            return (
                <AnswerItem 
                key = {index}
                answer = {ans}
                onAnswerClick = {props.onAnswerClick}
                state = {props.state ? props.state[ans.id] : null}
                />
                
            )
        })}
    </ul>
    )
}

export default AnswersList;