import {
	CREATE_QUIZ_QUESTION,
	RESET_QUIZ_CREATION
} from '../actions/actionTypes'
export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function resetQuizCreation() {
	return {
		type: RESET_QUIZ_CREATION,
	}
}

export function finishCreateQuiz() {
	return async (dispatch, getState) => {
		await fetch('https://react-quiz-53720-default-rtdb.firebaseio.com/quizes.json', { method: 'POST', body: JSON.stringify(getState().create.quiz) })
		
		dispatch(resetQuizCreation())
	}
}
