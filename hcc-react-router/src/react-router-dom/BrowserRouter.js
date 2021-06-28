import React from 'react'
import { Router } from '../react-router'
import { createBrowserHistory } from '../history'

// 创建对应的历史对象，b并且传入Router组件，原样渲染子组件
function BrowserRouter(props) {
  let history = createBrowserHistory(props)
  return (
      <Router history={history}>
        {props.children}
      </Router>
  )
}

export default BrowserRouter
