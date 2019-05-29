import React from 'react'
import { withRouter } from 'react-router-dom'
import { withFireBase } from '../Firebase'

const SignOutButton = ({ firebase, history }) => (
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

export default withRouter(withFireBase(SignOutButton))
