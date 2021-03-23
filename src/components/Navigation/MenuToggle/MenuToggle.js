import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = ({ isMenuOpen, onToggle }) => {
	const cls = [
		classes.MenuToggle,
		'fa',
	]

	if (isMenuOpen) {
		cls.push('fa-times');
		cls.push(classes.open);
	} else {
		cls.push('fa-bars');
	}

	return (
		<i className={cls.join(' ')} onClick={onToggle}></i>
	)
}

export default MenuToggle
