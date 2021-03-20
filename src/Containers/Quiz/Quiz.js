import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'
import Loader from '../../Components/ui/Loader/Loader'

import { connect } from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
class Quiz extends Component{
   
    async componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount(){
        this.props.retryQuiz()
    }
    onAnswerClickHandler = (answerId)=>{
        this.props.quizAnswerClick(answerId)
    }
    isQuizFinished = ()=>{
        return this.state.activeQuiz + 1 === this.state.quiz.length 
    }
    onRetry = ()=>{
        this.props.retryQuiz()
    }
    render(){
        return (
        <div className = {classes.Quiz}>
            <h1>Answer all question</h1>
        {this.props.loading || !this.props.quiz? <Loader/> 
        : 
        this.props.isFinished ? 
            <FinishedQuiz
            results = {this.props.results}
            quiz = {this.props.quiz}
            onRetry = {this.onRetry}
            /> :
            <ActiveQuiz 
            answers={this.props.quiz[this.props.activeQuiz].answers}
            question= {this.props.quiz[this.props.activeQuiz].question}
            onAnswerClick = {this.onAnswerClickHandler}
            quizLength ={this.props.quiz.length}
            answerNumber = {this.props.activeQuiz+1}
            state = {this.props.answerState}
            />
        }
            
            
        </div>
        )
    }
    
}
const mapStateToProps = (state) => {
    return {
        results: state.quiz.results, // {[id]: 'success' : 'error'}
        activeQuiz: state.quiz.activeQuiz,
        answerState: state.quiz.answerState, // {[id]:'success' , 'error'}
        isFinished: state.quiz.isFinished,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        fetchQuizById: id=>dispatch(fetchQuizById(id)),
        quizAnswerClick: ansId=>dispatch(quizAnswerClick(ansId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)