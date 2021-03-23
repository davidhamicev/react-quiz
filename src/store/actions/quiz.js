import {
	FETCH_QUIZES_ERROR,
	FETCH_QUIZES_START,
	FETCH_QUIZES_SUCCESS,
	FETCH_QUIZ_SUCCESS,
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY
} from "./actionTypes"

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await fetch('https://react-quiz-53720-default-rtdb.firebaseio.com/quizes.json').then(response => response.json())
			const quizes = []
			
			Object.keys(response).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				})
			})
			dispatch(fetchQuizesSuccess(quizes))
		} catch (error) {
			dispatch(fetchQuizesError(error))
		}
	}
}

export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const quiz = await fetch(`https://react-quiz-53720-default-rtdb.firebaseio.com/quizes/${quizId}.json`).then(response => response.json())
			dispatch(fetchQuizSuccess(quiz))
		} catch (error) {
			dispatch(fetchQuizesError(error))
		}
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY
	}
}

export function quizNextQuestion(number) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number
	}
}

export function quizAnswerClick(answerId) {
	return (dispatch, getState) => {
		// проверка на последний вопрос ???
		const state = getState().quiz

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0];
			if (state.answerState[key] === 'success')
				return
		}

		const question = state.quiz[state.currentQuestion];
		const results = state.results;

		if (question.rightAnswerId === answerId) {
			if (!results[question.questionId])
				results[question.questionId] = 'success'
			
			dispatch(quizSetState({ [answerId]: 'success' }, results))

			const timer = window.setTimeout(() => {
				if (isQuizFinished(state)) {
					dispatch(finishQuiz())
				} else {
					dispatch(quizNextQuestion(state.currentQuestion + 1))
				}
				window.clearTimeout(timer);
			}, 500)
		} else {
			results[question.questionId] = 'error'
			dispatch(quizSetState({ [answerId]: 'error' }, results))
		}
	}
}

function isQuizFinished(state) {
	return state.currentQuestion + 1 === state.quiz.length;
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
	
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
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

export function fetchQuizesError(e) {
	return {
		type: FETCH_QUIZES_ERROR,
		error: e
	}
}
