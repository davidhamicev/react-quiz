import React, { Component } from 'react'
import classes from './QuizCreator.module.css'
import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import Button from '../../components/UI/Button'
import {createControl, validateControl} from '../../form/formFramework'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'


function createOptionControl(label) {
	return createControl({
		label,
		errorMessage: 'Поле не может быть пустым'
	}, {required: true})
}

function createFormControls() {
	return {
		question: createOptionControl('Введите вопрос'),
		option1: createOptionControl('Вариант 1'),
		option2: createOptionControl('Вариант 2'),
		option3: createOptionControl('Вариант 3'),
		option4: createOptionControl('Вариант 4'),
	}
}

class QuizCreator extends Component {
	state = {
		// quiz: [],
		formControls: createFormControls(),
		rightAnswerId: 1,
		isFormValid: false
	}

	submitHandler = event => {
		event.preventDefault()
	}
	
	addQuestionHadler = event => {
		event.preventDefault()
		
		const {question, option1, option2, option3, option4} = this.state.formControls
		
		const newQuestion = {
			question: question.value,
			questionId: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{text: option1.value, id: 1},
				{text: option2.value, id: 2},
				{text: option3.value, id: 3},
				{text: option4.value, id: 4},
			]
		}

		this.props.createQuizQuestion(newQuestion)

		this.setState({
			rightAnswerId: 1,
			isFormValid: false,
			formControls: createFormControls()
		})
		
		
	}
	
	creteQuizHandler = async event => {
		event.preventDefault()

		this.setState({
			rightAnswerId: 1,
			isFormValid: false,
			formControls: createFormControls()
		})

		this.props.finishCreateQuiz()
	}

	changeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = formControls[controlName]
		
		control.value = value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)
		
		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({
			formControls, isFormValid
		})
	}

	renderInputs = () => {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = { ...this.state.formControls[controlName] };
			return (
				<React.Fragment key={controlName + index}>
					<Input
						label={control.label}
						value={control.value}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						errorMessage={control.errorMessage}
						onChange={event => this.changeHandler(event.target.value, controlName)}
					/>
					{ index === 0 ? <hr /> : null}
				</React.Fragment>
			)
		})
	}

	selectChangeHandler = event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}

	render() {
		const select = <Select
			label="Выберите правильный ответ"
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{ text: 1, value: 1 },
				{ text: 2, value: 2 },
				{ text: 3, value: 3 },
				{ text: 4, value: 4 },
			]}
		/>
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание нового теста</h1>

					<form onSubmit={this.submitHandler}>
						{this.renderInputs()}

						{select}
						
						<Button type='primary' onClick={this.addQuestionHadler} disabled={!this.state.isFormValid}>Добавить вопрос</Button>
						<Button type='error' onClick={this.creteQuizHandler} disabled={this.props.quiz.length === 0}>Создать тест</Button>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quiz: state.create.quiz
	}
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
