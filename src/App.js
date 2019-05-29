import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Topics from './components/Topics'
import About from './components/About'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing'
import Account from './components/Account'
import { withAuthentication } from './Session'

const App = props => {
  console.log('App: ', props)
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Landing} />
        <Route exact path='/landing' component={Landing} />
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/topics' component={Topics} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/account' component={Account} />
      </div>
    </Router>
  )
}

export default withAuthentication(App)
