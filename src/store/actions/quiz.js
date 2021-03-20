import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
    return async function (dispatch) {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json');
            console.log(response)
            let quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: response.data[key].name
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
};
export function fetchQuizSuccess(quiz) {
    return {
        quiz,
        type: FETCH_QUIZ_SUCCESS
    }
}
export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart)
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            console.log(response)
            const quiz = response.data.quiz;
            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}
export function quizSetState(answerState, results) {
    return {
        answerState,
        results,
        type: QUIZ_SET_STATE
    }
}
export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}
export function quizNextQuestion(num) {
    return {
        type: QUIZ_NEXT_QUESTION,
        num
    }
}
export function quizAnswerClick(ansId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuiz];

        const results = state.results;
        console.log(question, ansId)
        if (question.rightAnswerId === ansId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({
                [ansId]: 'success'
            }, results))
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    console.log('Finished');
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuiz + 1))
                }
                window.clearTimeout(timeout)
            }, 500)

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({
                [ansId]: 'error'
            }, results))
        }
        console.log(state.results)
    }
}

function isQuizFinished(state) {
    return state.activeQuiz + 1 === state.quiz.length
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}