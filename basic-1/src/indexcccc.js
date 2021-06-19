// import React from './hcc/react.js'
// import ReactDOM from './hcc/react-dom.js'
import React from 'react'
import ReactDOM from 'react-dom'

/*
console.log(JSON.stringify(React.createElement('h1', {
  className: 'title',
  style: { color: 'red' },
}, 'hello', 'weod'), null, 1))
*/


class Counter extends React.Component {
  constructor(props) {
    console.log('父组件：set up props and state')
    super(props)
    this.state = {
      number: 0
    }
  }

  componentWillMount() {
    console.log('父组件：componentWillMount')
  }

  componentDidMount() {
    console.log('父组件：componentDidMount')
  }

  handleClick = () => {
    // this.setState({
    //   number: this.state.number + 1
    // })
    // console.log(this.state.number)
    this.setState(prev => {
      return { number: prev.number + 1 }
    })
  }

  shouldComponentUpdate(newProps, newStart) {
    console.log('父组件：shouldComponentUpdate', newProps, newStart)
    return newStart.number % 2 === 0
  }

  componentWillUpdate() {
    console.log('父组件：componentWillUpdate')

  }

  componentDidUpdate() {
    console.log('父组件：componentDidUpdate')
  }

  render() {
    console.log('父组件：render')
    return (
        <div id={`counter${this.state.number}`}>
          <p>{this.state.number}</p>
          {this.state.number === 4 ? null : <ChildCounter count={this.state.number}/>}
          <button onClick={() => this.handleClick()}>+1</button>
        </div>
    )
  }
}

class Parent extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate')
    return true
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props)
    console.log('子组件：set up props and state')
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('子组件：componentWillReceiveProps')

  }

  componentWillUpdate() {
    console.log('子组件：componentWillUpdate')

  }

  componentDidUpdate() {
    console.log('子组件：componentDidUpdate')
  }

  componentWillMount() {
    console.log('子组件：componentWillMount')
  }

  componentWillUnmount() {
    console.log('子组件：componentWillUnmount')
  }

  componentDidMount() {
    console.log('子组件：componentDidMount')
  }

  render() {
    return (
        <div id="child-counter">
          <p>{this.props.count}</p>
        </div>
    )

  }
}


class Index extends Parent {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('Index: shouldComponentUpdate')
    return true
  }
  handleClick = () => {
    this.setState({
      number: this.state.number + 1
    })
    // this.setState({
    //   number: 0
    // })
  }

  render() {
    console.log('render')
    return (
        <div>
          <h3 onClick={this.handleClick}>Index</h3>
          <h5>{this.state.number}</h5>
        </div>
    )
  }
}


const element = <Counter/>
// console.log(element)
ReactDOM.render(
    // element,
    // <CountAdd/>,
    // <Welcome name='hcc' />,
    <Index />,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
