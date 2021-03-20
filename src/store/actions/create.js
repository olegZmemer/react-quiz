import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, SET_QUIZ_NAME } from "./actionTypes";
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item){
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation(){
    return {
        type: RESET_QUIZ_CREATION
    }
}
export function setQuizName(name){
    return {
        type: SET_QUIZ_NAME,
        payload: name
    }
}
export function finishCreateQuiz(name){
    return async (dispatch, getState)=>{
        dispatch(setQuizName(name))
        await axios.post('/quizes.json', {
            quiz: getState().create.quiz,
            name: name
        });
        
        dispatch(resetQuizCreation())
    }
}