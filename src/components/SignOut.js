import React from 'react'
import { withFireBase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <button type='button' onClick={firebase.doSignOut}>
    Sign Out
  </button>
)

export default withFireBase(SignOutButton)
