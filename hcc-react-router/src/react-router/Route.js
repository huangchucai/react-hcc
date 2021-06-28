import React, { Component } from 'react'
import RouterContext from './RouterContext'

class Route extends Component {
  render() {
    return (
        <RouterContext.Consumer>
          {
            (context) => {
              const { history, location } = context
              const { component, path } = this.props
              const match = location.pathname === path // 如果匹配
              const RouteProps = {
                history,
                match,
                location
              }
              if (match) {
                return React.createElement(component, RouteProps)
              }
            }
          }
        </RouterContext.Consumer>
    )
  }
}

export default Route
