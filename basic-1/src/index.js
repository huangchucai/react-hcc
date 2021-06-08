import React from './hcc/react'
import ReactDOM from './hcc/react-dom'
// import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
import { updateQueue } from './hcc/component'
// import App from './App'
console.log(JSON.stringify(React.createElement('h1', {
  className: 'title',
  style: { color: 'red' }
}, 'hello', 'weod'), null, 1))



class Count extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }

  handleClick = () => {
    updateQueue.isBatchingUpdate = true
    this.setState({
      number: this.state.number + 1
    })
    console.log(this.state.number)
    this.setState(prev => {
      return {number: prev.number + 1 }
    })
    updateQueue.batchUpdate()
  }

  render() {
    return (
        <div>
          <p>{this.state.number}</p>
          <button onClick={() => this.handleClick()}>+1</button>
        </div>
    )
  }
}

const element = React.createElement('h1', {
  className: 'title',
  style: { color: 'red' }
}, React.createElement('span', null, 'hello'), 'world')
console.log(JSON.stringify(element, null, 2))

//
// function Welcome(props) {
//   // return React.createElement("h1", {
//   //   className: props.className,
//   //   style: {
//   //     color: 'red'
//   //   }
//   // }, React.createElement('span', null, 'hello'), 'world')
//   return <h1>hello {props.name}</h1>
// }

class Welcome extends React.Component {
  render() {
    return <h1>hello, {this.props.name}</h1>
  }
}

ReactDOM.render(
    // element,
    <Count/>,
    // <Welcome name='hcc' />,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
