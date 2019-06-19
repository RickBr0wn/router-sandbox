import React from 'react'
import { withFireBase } from '../Firebase'
import { AuthUserContext } from '../Session'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        authUser: null
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      })
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      const authUser = this.state.authUser

      return (
        <AuthUserContext.Provider>
          <Component {...this.props} authUser={authUser} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFireBase(WithAuthentication)
}

export default withAuthentication
