import React from 'react'
import { withFireBase } from '../Firebase'
import { StoreContext } from '../Store'

const GET_ALL_DOCS = 'GET_ALL_DOCS'
const ERROR_GETTING_DOCS = 'ERROR_GETTING_DOCS'
const START_LOADING_DOCS = 'START_LOADING_DOCS'
const END_LOADING_DOCS = 'END_LOADING_DOCS'

const initialState = {
  docs: null,
  isLoading: false,
  isError: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_DOCS:
      return Object.assign({}, state, { docs: action.docs })
    case START_LOADING_DOCS:
      return Object.assign({}, state, { isLoading: true })
    case END_LOADING_DOCS:
      return Object.assign({}, state, { isLoading: false })
    case ERROR_GETTING_DOCS:
      throw new Error('Error whilst loading docs from Firebase')
    default:
      return state
  }
}

function withLogger(dispatch) {
  return function(action) {
    console.log(
      '\x1b[43m%s\x1b[0m',
      'Action Type:',
      `{ action.type: ${action.type} }`
    )
    return dispatch(action)
  }
}

function useReducerWithLogger(...args) {
  let prevState = React.useRef(initialState)
  const [state, dispatch] = React.useReducer(...args)

  const dispatchWithLogger = React.useMemo(() => {
    return withLogger(dispatch)
  }, [dispatch])

  React.useEffect(() => {
    if (state !== initialState) {
      console.log('\x1b[33m%s\x1b[0m', 'Prev state: ', prevState.current)
      console.log('\x1b[33m%s\x1b[0m', 'Current state: ', state)
      console.groupEnd()
    }
    prevState.current = state
  }, [state])

  return [state, dispatchWithLogger]
}

const withStore = Component => props => {
  const [state, dispatch] = useReducerWithLogger(reducer, initialState)

  React.useEffect(() => {
    dispatch({ type: START_LOADING_DOCS })
    props.firebase
      .getAllDocuments()
      .then(res => {
        dispatch({ type: END_LOADING_DOCS })
        if (!state.isLoading) {
          dispatch({ type: GET_ALL_DOCS, docs: res })
        }
      })
      .catch(err =>
        dispatch({ type: ERROR_GETTING_DOCS, isError: true, isLoading: false })
      )
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StoreContext.Provider>
      <Component {...props} store={state} dispatch={dispatch} />
    </StoreContext.Provider>
  )
}

export default withStore
