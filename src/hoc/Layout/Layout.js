import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle';
import Drawer from '../../components/Navigation/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		isMenuOpen: false
	}

	toggleHandler = () => {
		this.setState({
			isMenuOpen: !this.state.isMenuOpen
		})
	}

	backDropHadler = () => {
		this.setState({
			isMenuOpen: false
		})
	}

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer
					isMenuOpen={this.state.isMenuOpen}
					backDropHadler={this.backDropHadler}
					isAuthinticated={this.props.isAuthinticated}
					/>

				<MenuToggle 
					onToggle={this.toggleHandler}
					isMenuOpen={this.state.isMenuOpen}
				/>
				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
	  isAuthinticated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout)
