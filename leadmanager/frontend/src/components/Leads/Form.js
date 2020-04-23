import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLead } from '../../actions/leads'

class Form extends Component {
    state = {
        name: '',
        email: '',
        message: ''
    }

    onChange = e => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { name, email, message } = this.state
        const lead = { name, email, message }
        this.props.addLead(lead)
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }

    render() {
        const { name, email, message } = this.state
        return (
            <div className='card card-body mt-4 mb-4'>
                <h2>Add Lead</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Name</label>
                        <input
                            className='form-control'
                            type='text'
                            name='name'
                            value={name}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input
                            className='form-control'
                            type='email'
                            name='email'
                            value={email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Message</label>
                        <input
                            className='form-control'
                            type='text'
                            name='message'
                            value={message}
                            onChange={this.onChange}
                        />
                    </div>
                    <button className='btn btn-primary btn-sm'>Add Lead</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { addLead })(Form)
