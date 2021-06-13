import React from './hcc/react'
import ReactDOM from './hcc/react-dom'
// import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'
// import App from './App'
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

// const element = React.createElement('h1', {
//   className: 'title',
//   style: { color: 'red' }
// }, React.createElement('span', null, 'hello'), 'world')
// console.log(JSON.stringify(element, null, 2))

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


/*class CountAdd extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef()
    this.b = React.createRef()
    this.c = React.createRef()
  }
  add = () => {
    let aValue = this.a.current.value
    let bValue = this.b.current.value
    this.c.current.value = parseFloat(aValue) + parseFloat(bValue)
  }
  render() {
    return (
        <div>
          <input ref={this.a} type="text"/> <br/>
          <input ref={this.b} type="text"/>
          <button onClick={this.add}>=</button><br/>
          <input type="text" ref={this.c}/>
        </div>
    )
  }
}*/


const element = <Counter />
const a = <div>ddd</div>
console.log(a)
console.log(element)
// console.log(element)
ReactDOM.render(
    // element,
    // <CountAdd/>,
    // <Welcome name='hcc' />,
    element,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
