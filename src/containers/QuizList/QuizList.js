import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader'
import { connect } from 'react-redux'
import { fetchQuizes } from '../../store/actions/quiz'

class QuizList extends Component {
	state = {
		quizes: [],
		loading: true
	}

	quizesRender = () => {
		return this.props.quizes.map(({id, name}) => {
			return (
				<li key={id}>
					<NavLink to={'/quiz/' + id}>
						{name}
					</NavLink>
				</li>
			)
		})
	}

	componentDidMount() {
		this.props.fetchQuizes()
	}

	render() {
		return (
			<div className={classes.QuizList}>
				<h1>Quiz List</h1>
				{this.props.loading && this.props.quizes.length !== 0
					? <Loader />
					: <ul>
						{this.quizesRender()}
					</ul>
				}
				
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quizes: state.quiz.quizes,
		isLoaded: state.quiz.isLoaded
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
