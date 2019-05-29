import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import { AuthUserContext } from '../Session'
import styled from 'styled-components'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      return authUser ? <SignedInLinks /> : <SignedOutLinks />
    }}
  </AuthUserContext.Consumer>
)

const StyledNavBar = styled.nav`
  background: #333;
  color: white;

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    list-style: none;
    padding: 8px 20px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .right-hand-links {
    display: flex;
  }
`

const SignedInLinks = () => (
  <StyledNavBar>
    <ul>
      <div>
        <li>Rick Brown</li>
      </div>
      <div className='right-hand-links'>
        <li>
          <Link to={'/home'}>Home</Link>
        </li>
        <li>
          <Link to={'/account'}>Account</Link>
        </li>
        <li>
          <SignOutButton />
        </li>
      </div>
    </ul>
  </StyledNavBar>
)

const SignedOutLinks = () => (
  <StyledNavBar>
    <ul>
      <div>
        <li>Rick Brown</li>
      </div>
      <div className='right-hand-links'>
        <li>
          <Link to={'/signin'}>Sign In</Link>
        </li>
      </div>
    </ul>
  </StyledNavBar>
)

export default Navigation
