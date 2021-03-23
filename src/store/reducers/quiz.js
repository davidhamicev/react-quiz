import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY,
	QUIZ_SET_STATE
} from "../actions/actionTypes"

const initialState = {
	quizes: [],
	loading: false,
	error: null,
	results: {}, // {[id]: 'succes'|'error'}
	isQuizFinished: false,
	currentQuestion: 0,
	answerState: null,
	quiz: null,
}

export default function quizeReduser(state = initialState, action) {
	switch (action.type) {
		case FETCH_QUIZES_START:
			return {
				...state, loading: true
			}
		case FETCH_QUIZES_SUCCESS:
			return {
				...state, loading: false, quizes: action.quizes
			}
		case FETCH_QUIZ_SUCCESS:
			return {
				...state, loading: false, quiz: action.quiz
			}
		case FETCH_QUIZES_ERROR:
			return {
				...state, loading: false, error: action.error
			}
		case QUIZ_SET_STATE:
			return {
				...state, answerState: action.answerState, results: action.results
			}
		case FINISH_QUIZ:
			return {
				...state, isQuizFinished: true
			}
		case QUIZ_NEXT_QUESTION:
			return {
				...state,
				currentQuestion: action.number,
				answerState: null
			}
		case QUIZ_RETRY:
			return {
				...state,
				results: {},
				isQuizFinished: false,
				currentQuestion: 0,
				answerState: null
			}
		default:
			return state
	}
}
