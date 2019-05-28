import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import FireBase, { FireBaseContext } from './Firebase'

ReactDOM.render(
  <FireBaseContext.Provider value={new FireBase()}>
    <App />
  </FireBaseContext.Provider>,
  document.getElementById('root')
)
