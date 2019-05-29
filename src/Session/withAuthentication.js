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
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} authUser={this.state.authUser} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFireBase(WithAuthentication)
}

export default withAuthentication
