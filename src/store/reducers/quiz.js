import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ } from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    results: {}, // {[id]: 'success' : 'error'}
    activeQuiz: 0,
    answerState: null, // {[id]:'success' , 'error'}
    isFinished: null,
    quiz: null
}

export default function quizReducer(state = initialState, action){
    switch (action.type) {
        case FETCH_QUIZES_START: 
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:  
            return {
                ...state,
                loading: false,
                error: action.error
            }
            
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState, results: action.results
            }
        case FINISH_QUIZ:
            return {
                ...state,
                isFinished: true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuiz: action.num
            }
        case RETRY_QUIZ:
            return {
            ...state,
            results: {},
            activeQuiz: 0,
            answerState: null, 
            isFinished: null
                
        }   
        default:
            return state
            
    }
}