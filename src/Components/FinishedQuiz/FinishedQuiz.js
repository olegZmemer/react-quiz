import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../ui/Button/Button'
import {Link} from 'react-router-dom'
const FinishedQuiz = (props)=>{
    const rightQuestions = Object.values(props.results).filter((res)=> res === 'success').length
    return (
        <div className = {classes.FinishedQuiz}>
            <ul>
                {
                props.quiz.map((quizItem, index)=>{
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li 
                        key={index}
                        >
                            <strong>{index+1}. </strong>&nbsp;
                            {quizItem.question}
                            <i className = {cls.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильных ответов {rightQuestions} из {props.quiz.length}</p>
            <div>
                <Button onClick = {props.onRetry} type="primary">Повторить</Button>
                <Link to='/'>
                    <Button type="success">Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}
export default FinishedQuiz;