import React from 'react'
import classes from './AnswerItem.module.css'

const AnswerItem = props => {
	const { text, id } = props.answer;
	const classList = [classes.AnswerItem];

	if (props.state) {
		classList.push(classes[props.state]);
	}
		
	return (
		<li className={classList.join(' ')} onClick={() => props.onAnswerClick(id)}>
			{ text }
		</li>
	)
}

export default AnswerItem
