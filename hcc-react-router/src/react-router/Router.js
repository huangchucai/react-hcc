import React, { Component } from 'react'
import RouterContext from './RouterContext'

/**
 * Router有2个作用
 * 1. 获取location 并通过上下文向下级Route等组件传递，Route可以通过Context获取到location (location.pathname可以获取路径名字，
 * 然后根据自己的path进行匹配，如果匹配就渲染component 组件
 *
 * 2. 监听路径变化，当路径发送变化的时候修改自己的 state.location
 *
 */

class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location
    }
    this.unlisten = props.history.listen((params) => {
      this.setState({
        location: params
      })
    })

  }

  componentWillUnmount() {
    this.unlisten && this.unlisten()
  }

  render() {
    const value = {
      location: this.state.location,
      history: this.props.history
    }
    return (
        <RouterContext.Provider value={value}>
          {this.props.children}
        </RouterContext.Provider>
    )
  }
}

export default Router
