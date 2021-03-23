import React, { Component } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import Layout from './hoc/Layout'
import Quiz from './containers/Quiz'
import Auth from './containers/Auth'
import QuizCreator from './containers/QuizCreator'
import QuizList from './containers/QuizList'
import { connect } from 'react-redux'
import Logout from './components/Logout'
import { autoLogin } from './store/actions/auth'

export class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    )
    
    if (this.props.isAuthinticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }
  
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthinticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
