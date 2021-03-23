import React from 'react'
import classes from './AnswersList.module.css'

import AnswerItem from './AnswerItem'

const AnswersList = ({ answers, state, onAnswerClick }) => {
	return (
		<ul className={classes.AnswersList}>
			{answers.map((answer, index) => {
				return (
					<AnswerItem
						answer={answer}
						key={index}
						onAnswerClick={onAnswerClick}
						state={state ? state[answer.id] : null}
					/>
				)
			})}
		</ul>
	)
};

export default AnswersList
