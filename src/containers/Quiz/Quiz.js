import React, { Component } from 'react'
import ActiveQuiz from '../../components/ActiveQuiz'
import classes from './Quiz.module.css';
import FinishedQuiz from '../../components/FinishedQuiz'
import Loader from '../../components/UI/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	render() {
		const { currentQuestion } = this.props;
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Answer the questions</h1>
					{
						this.props.loading || !this.props.quiz
							? <Loader />
							: this.props.isQuizFinished ?
								<FinishedQuiz
									results={this.props.results}
									quiz={this.props.quiz}
									retryHandler={this.props.retryQuiz}
								/>
								: <ActiveQuiz
									answers={this.props.quiz[currentQuestion].answers}
									question={this.props.quiz[currentQuestion].question}
									onAnswerClick={this.props.quizAnswerClick}
									quizLength={this.props.quiz.length}
									currentQuestion={currentQuestion + 1}
									state={this.props.answerState}
								/>
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps({quiz}) {
	return {
		results: quiz.results,
		isQuizFinished: quiz.isQuizFinished,
		currentQuestion: quiz.currentQuestion,
		answerState: quiz.answerState,
		quiz: quiz.quiz,
		loading: quiz.loading,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
