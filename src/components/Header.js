import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import { AuthUserContext } from '../Session'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return authUser ? <SignedInLinks /> : <SignedOutLinks />
    }}
  </AuthUserContext.Consumer>
)

const SignedInLinks = () => (
  <ul>
    <li>
      <Link to={'/home'}>Home</Link>
    </li>
    <li>
      <Link to={'/account'}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const SignedOutLinks = () => (
  <ul>
    <li>
      <Link to={'/landing'}>Landing</Link>
    </li>
    <li>
      <Link to={'/signin'}>Sign In</Link>
    </li>
  </ul>
)

export default Navigation
