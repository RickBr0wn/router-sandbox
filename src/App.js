import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Topics from './components/Topics'
import About from './components/About'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/topics' component={Topics} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </div>
    </Router>
  )
}

export default App
