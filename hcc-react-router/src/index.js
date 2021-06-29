import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { Route } from 'react-router-dom'
import { HashRouter, BrowserRouter } from './react-router-dom'
import { Route } from './react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'


ReactDOM.render(
    <HashRouter>
      <>
        <Route path="/" component={Home} exact/>
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
      </>
    </HashRouter>,
    document.getElementById('root')
)
