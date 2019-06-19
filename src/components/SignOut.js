import React from 'react'
import { withRouter } from 'react-router-dom'
import { withFireBase } from '../Firebase'
import { compose } from 'recompose'

const _SignOutButton = ({ firebase, history }) => (
  <div
    style={{ cursor: 'pointer' }}
    type='button'
    onClick={() => {
      firebase.doSignOut()
      history.push('/landing')
    }}>
    Sign Out
  </div>
)

const SignOutButton = compose(
  withFireBase,
  withRouter
)(_SignOutButton)

export default SignOutButton
