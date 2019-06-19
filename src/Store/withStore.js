import React from 'react'
import { withFireBase } from '../Firebase'
import { StoreContext } from '../Store'

const withStore = Component => {
  class WithStore extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        docs: null,
        isLoading: false,
        isError: false
      }
    }

    componentDidMount() {
      this.props.firebase
        .getAllDocuments()
        .then(res => {
          if (!this.state.isLoading) {
            this.setState({ ...this.state, docs: res })
          }
        })
        .catch(err => this.setState({ ...this.state, isError: true }))
    }

    componentWillUnmount() {}

    render() {
      return (
        <StoreContext.Provider>
          <Component {...this.props} store={this.state} />
        </StoreContext.Provider>
      )
    }
  }
  return withFireBase(WithStore)
}

export default withStore
