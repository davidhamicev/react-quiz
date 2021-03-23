import { combineReducers } from 'redux'
import quizeReduser from './quiz'
import createReducer from './create'
import authReducer from './auth'

export default combineReducers({
	quiz: quizeReduser,
	create: createReducer,
	auth: authReducer,
})
