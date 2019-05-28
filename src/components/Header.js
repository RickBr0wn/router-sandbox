import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <Link to='/topics'>Topics</Link>
      </li>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
    </ul>
  )
}

export default Header
