import React from 'react'
import { Link } from 'react-router-dom'
import SignOutButton from './SignOut'
import styled from 'styled-components'
import { withFireBase } from '../Firebase'

const Navigation = ({ firebase }) => {
  return firebase.getCurrentUsername() ? (
    <SignedInLinks name={firebase.auth.currentUser.displayName} />
  ) : (
    <SignedOutLinks name={null} />
  )
}

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

const SignedInLinks = ({ name }) => (
  <StyledNavBar>
    <ul>
      <div>
        <li>{name ? name : '.'}</li>
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

const SignedOutLinks = ({ name }) => (
  <StyledNavBar>
    <ul>
      <div>
        <li>{name ? name : '.'}</li>
      </div>
      <div className='right-hand-links'>
        <li>
          <Link to={'/signin'}>Sign In</Link>
        </li>
      </div>
    </ul>
  </StyledNavBar>
)

export default withFireBase(Navigation)
