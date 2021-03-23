import React, { Component } from 'react'
import classes from './Auth.module.css'
import {validateControl} from '../../form/formFramework'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'

import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'


class Auth extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				valid: false,
				touched: false,
				errorMessage: 'Введите корректный Email',
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				valid: false,
				touched: false,
				errorMessage: 'Пароль слишком короткий',
				validation: {
					required: true,
					minLength: 6
				}
			},

		}
	}

	loginHandler = async () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true
		)

		// this.props.history.push('/')
	}

	registerHandler = async () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			false
		)
	}

	submitHandler = event => {
		event.preventDefault();
	}

	onChangeHandler = (value, controlName) => {
		const formControls = { ...this.state.formControls }
		const control = formControls[controlName]
		
		control.value = value
		control.touched = true
		control.valid = validateControl(control.value, control.validation)

		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})
		
		this.setState({
			formControls, isFormValid
		})
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Input
					key={controlName + index}
					type={control.type}
					label={control.label}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={control.validation}
					errorMessage={control.errorMessage}
					onChange={event => this.onChangeHandler(event.target.value, controlName)}
				/>
			)
		});
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Авторизация</h1>

					<form onSubmit={this.submitHandler} className={classes.AuthForm}>
						{this.renderInputs()}
						
						<Button
							type='primary'
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
						>
							Войти
						</Button>
						<Button type='error' onClick={this.registerHandler}>Регистрация</Button>
					</form>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
}

export default connect(null, mapDispatchToProps)(Auth)
