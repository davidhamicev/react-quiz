import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop'

class Drawer extends Component {

	renderLinks(links) {
		return links.map((link, index) => {
			const {to, label, exact} = link
			return (
				<li key={index}>
					<NavLink
						to={to}
						exact={exact}
						activeClassName={classes.active}
						onClick={() => this.props.backDropHadler()}
					>
						{label}
					</NavLink>
				</li>
			)
		})
	}

	render() {
		const cls = [
			classes.Drawer
		]
		if (!this.props.isMenuOpen)
			cls.push(classes.close)
		
		const links = [
			{ to: '/', label: 'Список тестов', exact: true }
		]
		
		if (this.props.isAuthinticated) {
			links.push({ to: '/quiz-creator', label: 'Создать тест', exact: true })
			links.push({ to: '/logout', label: 'Выйти', exact: true })
		}
		else {
			links.push({ to: '/auth', label: 'Авторизация', exact: true })
		}

		return (
			<>
				<nav className={cls.join(' ')}>
					<ul>
						{this.renderLinks(links)}
					</ul>
				</nav>
				{this.props.isMenuOpen ? <Backdrop backDropHadler={ this.props.backDropHadler }/> : null}
			</>
		)
	}
}

export default Drawer
