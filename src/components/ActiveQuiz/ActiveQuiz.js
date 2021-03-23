import React from 'react'
import classes from './ActiveQuiz.module.css'

import AnswersList from '../AnswersList'
const ActiveQuiz = props => (
	<div className={classes.AxctiveQuiz}>
		<p className={classes.Question}>
			<span>
				<strong>{props.currentQuestion}.</strong>&nbsp;
				{props.question}
			</span>
			<small>{props.currentQuestion} из {props.quizLength}</small>
		</p>
		
		<AnswersList
			answers={props.answers}
			onAnswerClick={props.onAnswerClick}
			state={props.state}
		/>
	</div>
)

export default ActiveQuiz;
