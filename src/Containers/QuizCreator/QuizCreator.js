import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../Components/ui/Button/Button'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Input from '../../Components/ui/Input/Input'
import Select from '../../Components/ui/Select/Select'

import { connect } from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'
function createOptionControl(number){
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value shouldnt be empty',
        id: number}, 
        {required: true})
}
function createFormControls(){
    return {
        question: createControl({
            label: 'Write your question',
            errorMessage: 'Value shouldnt be empty!'
        }, {
            required: true
        }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}
class QuizCreator extends Component {
    state ={
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1,
        name: ''
    }
    
    submitHandler = (e)=>{
        e.preventDefault()
    }
    addQuestionHandler = (e)=>{
        e.preventDefault();
        const quiz = [...this.props.quiz];
        const index = quiz.length + 1;
        const {option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: this.state.formControls.question.value,
            id: this.props.quiz.length+1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value , id: option1.id},
                {text: option2.value , id: option2.id},
                {text: option3.value , id: option3.id},
                {text: option4.value , id: option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)
        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }
    changeHandler = (value, name)=>{
        const formControls = {...this.state.formControls};
        const control = {...formControls[name]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)
        formControls[name] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    renderControls = ()=>{
        return Object.keys(this.state.formControls).map((cname, index)=>{
            const control = this.state.formControls[cname];
            return (
                <React.Fragment key={index}>
                    <Input
                    key = {cname + index}
                    value = {control.value}
                    label = {control.label}
                    valid = {control.valid}
                    shouldValidate = {!!control.validation}
                    touched = {control.touched}
                    errorMessage = {control.errorMessage}
                    onChange = {e => this.changeHandler(e.target.value, cname)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }
    selectChangeHandler = (e)=>{
        this.setState({
            rightAnswerId: +e.target.value
        })
    }
    createQuizHandler = (e)=>{
            e.preventDefault();
            this.setState({
                isFormValid: false,
                formControls: createFormControls(),
                rightAnswerId: 1,
                name: ''
            })
            this.props.finishCreateQuiz(this.state.name)
    }
    changeNameHandler = (value)=>{
        this.setState({
            name: value
        })
    }
    render() {
        return (
            <div className ={classes.QuizCreator}>
                <div>
                    <h1>Quiz creation</h1>
                    <form onSubmit = {this.submitHandler}>
                        <Input
                        value = {this.state.name}
                        label = 'Choose the name of your quiz'
                        minlength = '6'
                        onChange = {e => this.changeNameHandler(e.target.value)}
                        />
                        {this.renderControls()}
                        <Select
                        label = 'Choose the right answer'
                        value = {this.state.rightAnswerId}
                        onChange = {this.selectChangeHandler}
                        options = {
                            [
                                {text: 1, value: 1},
                                {text: 2, value: 2},
                                {text: 3, value: 3},
                                {text: 4, value: 4}
                            ]
                        }/>
                        <Button
                        type = 'primary'
                        onClick = {this.addQuestionHandler}
                        disabled = {!this.state.isFormValid}
                        >Add question</Button>
                        <Button
                        type = 'success'
                        onClick = {this.createQuizHandler}
                        disabled = {this.props.quiz.length === 0}
                        >Create test</Button>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
   quiz: state.create.quiz
})

const mapDispatchToProps = (dispatch)=>{
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: name => dispatch(finishCreateQuiz(name))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)