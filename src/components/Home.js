import React from 'react'
import uuid from 'react-uuid'

import { withFireBase } from '../Firebase'
import { withRouter } from 'react-router-dom'
import { withStore } from '../Store'
import { compose } from 'recompose'

import Calendar from './Calendar/'

function _Home(props) {
  const { firebase, store, dispatch, history } = props
  const { docs, isLoading, isError } = store

  if (!firebase.getCurrentUsername()) {
    history.replace('/signin')
    return null
  }

  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <Calendar store={store} dispatch={dispatch} />
          <ul>
            {docs && docs.map(item => <li key={uuid()}>{item.quote}</li>)}
          </ul>
        </>
      )}
    </>
  )
}

const Home = compose(
  withRouter,
  withFireBase,
  withStore
)(_Home)

export default Home
