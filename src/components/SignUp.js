import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { withFireBase } from '../Firebase'
import { compose } from 'recompose'

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const initialState = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: ''
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...initialState })
        this.props.history.push('/home')
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='Full Name'
        />
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <input
          name='passwordTwo'
          value={passwordTwo}
          onChange={this.onChange}
          type='password'
          placeholder='Confirm Password'
        />
        <button disabled={isInvalid} type='submit'>
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={'/signup'}>Sign Up</Link>
  </p>
)

const SignUpForm = compose(
  withRouter,
  withFireBase
)(SignUpFormBase)

export default SignUpPage

export { SignUpForm, SignUpLink }
