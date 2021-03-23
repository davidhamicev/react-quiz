import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
	return !valid && shouldValidate && touched
}

const Input = props => {
	const { type, value, label, errorMessage, onChange } = props
	const inputType = type || 'text';
	const cls = [classes.Input]

	if (isInvalid(props)) {
		cls.push(classes.invalid)
	}
	return (
		<div className={cls.join(' ')}>
			<label>
				{label}
				<input
					type={inputType}
					value={value}
					onChange={onChange}
				/>
			</label>
			<span>{errorMessage || 'Введите верное значение'}</span>
		</div>
	)
}

export default Input
