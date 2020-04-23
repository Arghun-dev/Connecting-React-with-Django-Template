import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// components
import Header from './Header/Header'
import Dashboard from './Leads/Dashboard'
import Alerts from './Alerts/Alerts'
import Register from './accounts/Register'
import Login from './accounts/Login'
import PrivateRoute from './common/PrivateRoute'

// Redux
import { Provider } from 'react-redux'
import store from '../store'

// Actions
import { loadUser } from '../actions/auth'

// Alert
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            {/*<Alerts />*/}
                            <div className='container'>
                                <Switch>
                                    <PrivateRoute exact path='/' component={Dashboard} />
                                    <PrivateRoute exact path='/register' component={Register} />
                                    <PrivateRoute exact path='/login' component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));