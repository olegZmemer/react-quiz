import React, { Component } from 'react'
import classes from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../Components/ui/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
    async componentDidMount(){
        this.props.fetchQuizes();
    }
    renderQuizes = ()=>{
        
        return this.props.quizes.map((quiz, index)=>{
            return (
                <li
                key = {quiz.id}
                >
                    <NavLink to = {'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    
    render() {
        return (
            <div className = {classes.QuizList}>
                <h1>Список тестов</h1>
                <ul>
                    {(this.props.loading && this.props.quizes.length !== 0) ? <Loader/> : this.renderQuizes()}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
})

const mapDispatchToProps = (dispatch)=>{
    return{
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList)