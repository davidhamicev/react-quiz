import React from 'react'
import { Link } from 'react-router-dom'

import classes from './FinishedQuiz.module.css'

import Button from '../UI/Button'

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total, key) => {
		if (props.results[key] === 'success')
			total++
		return total
	}, 0)
	console.log(successCount)
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						props.results[quizItem.questionId] === 'error' ? 'fa-times' : 'fa-check',
						classes[props.results[quizItem.questionId]]
					];
					return (
						<li key={index}>
							<strong>{index + 1}.</strong>&nbsp;
							{quizItem.question}
							<i className={cls.join(' ')} />
						</li>
					)
				})}
			</ul>

			<p>Правильно {successCount} из {props.quiz.length}</p>

			<div>
				<Button onClick={props.retryHandler} type='primary'>Повторить</Button>
				<Link to='/'>
					<Button type='success'>Перейти в список тестов</Button>
				</Link>
				{/* <Button type='error'>Повторить</Button> */}
			</div>
		</div>
	)
}

export default FinishedQuiz
