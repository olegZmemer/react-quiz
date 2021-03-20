import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION, SET_QUIZ_NAME } from "../actions/actionTypes"

const initialState = {
    quiz: [],
    name: ''
}

export default function createReducer(state = initialState, action){
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return{ 
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ_CREATION: 
            return {
                ...state,
                quiz: [],
                name: ''
            }
        case SET_QUIZ_NAME:
            return {
                ...state,
                name: action.payload
            }
        default:
            return state
    }
}