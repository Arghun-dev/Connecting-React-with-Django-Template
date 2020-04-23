import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

class Header extends Component {
    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <span className='navbar-text mr-3'>
                    <strong>{user ? `Welcome ${user}` : ''}</strong>
                </span>
                <li className='nav-item'>
                    <button onClick={this.props.logout} className='nav-link btn btn-info btn-sm text-light'>Logout</button>
                </li>
            </ul>
        )

        const guestLinks = (
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className='nav-item'>
                    <Link to='/register' className='nav-link'>Register</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>Login</Link>
                </li>
            </ul>
        )

        return (
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <div className='container'>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a class="navbar-brand" href="#">Lead Manager</a>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Header)