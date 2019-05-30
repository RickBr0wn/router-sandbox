import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFireBase } from '../Firebase'

const initialState = {
  username: '',
  email: '',
  password: '',
  error: '',
  auth: false
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      console.log('LOG_IN action.type has been actioned.')
      return { ...state, auth: true }
    case 'TEXT_INPUT':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'ERROR':
      console.log('ERROR action.type has been actioned.')
      return {
        ...state,
        error: action.err
      }
    default:
      return { ...state }
  }
}

const _SignInForm = props => {
  const [credentials, dispatch] = React.useReducer(authReducer, initialState)
  const emailRef = React.useRef(null)
  const passwordRef = React.useRef(null)
  const isInvalid = emailRef === '' || passwordRef === ''

  if (props.firebase.auth.currentUser) {
    props.history.push('/home')
  }

  const onSubmit = async event => {
    event.preventDefault()
    await props.firebase
      .doSignInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOG_IN' })
        props.history.push('/home')
      })
      .catch(err => ({ type: 'ERROR', err }))
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={emailRef}
        type='text'
        placeholder='Email Address'
        onChange={e =>
          dispatch({
            type: 'TEXT_INPUT',
            field: 'email',
            value: e.currentTarget.value
          })
        }
      />
      <input
        ref={passwordRef}
        type='password'
        placeholder='Password'
        onChange={e =>
          dispatch({
            type: 'TEXT_INPUT',
            field: 'password',
            value: e.currentTarget.value
          })
        }
      />
      <button disabled={isInvalid} type='submit'>
        Sign In
      </button>
      {credentials.error && <p>{credentials.error}</p>}
    </form>
  )
}

const SignInForm = compose(
  withRouter,
  withFireBase
)(_SignInForm)

export default SignInForm
