// import React from './hcc/react.js'
// import ReactDOM from './hcc/react-dom.js'
import React, { memo } from 'react'
import ReactDOM from 'react-dom'

let hooksState = []
let hookIndex = 0
/*
function useState(initValue) {
  hooksState[hookIndex] = hooksState[hookIndex] || initValue
  let currentIndex = hookIndex

  function setState(newState) {
    hooksState[currentIndex] = newState
    render()
  }

  return [hooksState[hookIndex++], setState]
}


function useMemo(factory, deps) {
  if (hooksState[hookIndex]) {
    let [lastMemo, lastDeps] = hooksState[hookIndex]
    let same = deps.every((item, index) => item === lastDeps[index])
    if (same) {
      hookIndex++
      return lastMemo
    } else {
      let newMemo = factory()
      hooksState[hookIndex++] = [newMemo, deps]
      return newMemo
    }
  } else {
    let newMemo = factory()
    hooksState[hookIndex++] = [newMemo, deps]
    return newMemo
  }
}


function useCallback(callback, deps) {
  if (hooksState[hookIndex]) {
    let [lastCallback, lastDeps] = hooksState[hookIndex]
    let same = deps.every((item, index) => item === lastDeps[index])
    if (same) {
      hookIndex++
      return lastCallback
    } else {
      hooksState[hookIndex++] = [callback, deps]
      return callback
    }
  } else {
    hooksState[hookIndex++] = [callback, deps]
    return callback
  }
}

const Child = memo(function Child(props) {
  console.log('child render')
  return (
      <button onClick={props.handle}>{props.data.number}</button>
  )
})*/
//
// const useReducer = function() {
//
// }

function useReducer(reducer, initValue, init) {
  hooksState[hookIndex] = hooksState[hookIndex] || (init ? init(initValue) : initValue)
  let currentIndex = hookIndex

  function dispatch(action) {
    hooksState[currentIndex] = reducer ? reducer(hooksState[currentIndex], action) : action
    render()
  }

  return [hooksState[hookIndex++], dispatch]
}

function useState(initValue) {
  return useReducer(null, initValue, null)
}

function reducer(state, action) {
  switch (action) {
    case 'ADD': {
      return {
        number: state.number + 1
      }
    }
  }
}

function useEffect(callback, deps) {
  if (hooksState[hookIndex]) {
    let { lastDeps, destroy } = hooksState[hookIndex]
    let same = deps.every((item, index) => lastDeps[index] === item)
    if (same) {
      hookIndex++
    } else {
      console.log('1')
      destroy && destroy()
      let state = { lastDeps: deps }
      hooksState[hookIndex++] = state
      setTimeout(() => {
        let destroy = callback()
        state.destroy = destroy
      })
    }
  } else {
    let state = { lastDeps: deps }
    hooksState[hookIndex++] = state
    setTimeout(() => {
      let destroy = callback()
      state.destroy = destroy
    })
  }
}

function useRef(current) {
  hooksState[hookIndex] = hooksState[hookIndex] || { current }
  return hooksState[hookIndex++]
}

/*function App() {
  const [count, setCount] = useState(0)
  console.log('render')
  useEffect(() => {
    console.log('useEffect')
    return () => {
      console.log('clear')
    }
  }, [count])
  const [state, dispatch] = useReducer(reducer, 0, (init) => ({
    number: init
  }))

  return (
      <div>
        <div>{count}</div>
        <button onClick={() => {
          setCount(count + 1)
        }}>+1</button>


        <div>{state.number}</div>
        <button onClick={() => {
          dispatch('ADD')
        }}>+1</button>
        {/!*<input type="text" value={name} onChange={(e) => {*!/}
        {/!*  setName(e.target.value)*!/}
        {/!*}}/>*!/}

        {/!*<Child data={data} handle={handle}/>*!/}
      </div>
  )
}*/

function getArticle(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        title: `这是第${id}篇文章`,
        id
      })
    }, 1000 * (5 - id))
  })
}

function Article(props) {
  const [articleData, setArticleData] = useState({})
  const { id } = props
  console.log(id)
  useEffect(() => {
    let cancel = false

    async function getData() {
      let res = await getArticle(id)
      if (!cancel) {
        setArticleData(res)
      }
    }

    getData()
    return () => {
      cancel = true
    }
  }, [id])
  return (
      <div>
        <h6>{articleData.id}</h6>
        <h6>{articleData.title}</h6>
      </div>
  )
}

/*function App() {
  const [id, setId] = useState(0)
  return (
      <div>
        <h4>获取文章{id}</h4>
        <button onClick={() => {
          setId(id + 1)
        }}>+id</button>
        <Article id={id}/>
      </div>
  )
}*/

/*function FunctionChild(props) {
  const { dom } = props
  return (
      <input ref={dom}/>
  )
}*/

function forwardRef(FunctionChild) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      console.log(this)
      return FunctionChild(this.props, this.props.ref2)
    }
  }

}

const FunctionChild = forwardRef((props, ref) => {
  return (
      <input ref={ref}/>
  )
})

class ClassChild extends React.Component {
  constructor(props) {
    super(props)
    this.dom = props.dom
    this.ref = React.createRef()
  }

  focus() {
    this.ref.current.focus()
  }

  render() {
    return (
        <input ref={this.dom}/>
    )
  }
}

function App() {
  const [number, setNumber] = useState(0)
  const classRef = useRef(null)
  const funcRef = useRef(null)
  const refNumber = useRef(number)

  React.useEffect(() => {
    // console.log(classRef.current.focus())
    console.log(refNumber,number)
    refNumber.current = number
    console.log(funcRef.current.focus())
  })
  return (
      <>
        <p>{number}</p>
        <button onClick={() => {
          setNumber(number + 1)
        }}> +1</button>
        <button onClick={() => {
          setTimeout(() => {
            alert(refNumber.current)
          }, 2000)
        }}>输出</button>
        <ClassChild dom={classRef}/>
        <FunctionChild ref2={funcRef}/>
      </>
  )
}

function render() {
  hookIndex = 0
  ReactDOM.render(
      // element,
      // <CountAdd/>,
      // <Welcome name='hcc' />,
      <App/>,
      document.getElementById('root')
  )
}

// console.log(element)
render()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
