import React from 'react'
import SignInForm from './test'
import { SignUpLink } from './SignUp'

const SignInPage = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  )
}

export default SignInPage
