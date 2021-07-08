import React from 'react'
import RouterContext from '../react-router/RouterContext'

export default function Link(props) {
  return (
      <RouterContext.Consumer>
        {
          contentContext => {
            return (
                <a {...props}
                   onClick={(event) => {
                     event.preventDefault()
                     contentContext.history.push(props.to)
                   }}
                ></a>
            )
          }
        }
      </RouterContext.Consumer>
  )
}
