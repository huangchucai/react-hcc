import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Link, Route } from 'react-router-dom'
// import { HashRouter, BrowserRouter } from './react-router-dom'
import { HashRouter, BrowserRouter } from 'react-router-dom'
// import { Route, Link } from './react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import Post from './components/Post'


ReactDOM.render(
    <BrowserRouter>
      <>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/user">用户</Link></li>
          <li><Link to="/profile">个人中心</Link></li>
          <li><Link to={{ pathname: '/post/1', state: { title: '这是帖子1的标题' } }}>帖子</Link></li>
        </ul>
        <Route path="/" component={Home} exact/>
        <Route path="/user" component={User}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/post/:id" component={Post}/>
      </>
    </BrowserRouter>,
    document.getElementById('root')
)
