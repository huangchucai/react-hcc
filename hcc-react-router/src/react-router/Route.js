import React, { Component } from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

class Route extends Component {
  static contextType = RouterContext

  render() {
    const { history, location } = this.context
    const { component } = this.props
    const match = matchPath(location.pathname, this.props) // 如果匹配
    const RouteProps = {
      history,
      match,
      location
    }
    if (match) {
      return React.createElement(component, RouteProps)
    } else {
      return null
    }
  }
}

export default Route
