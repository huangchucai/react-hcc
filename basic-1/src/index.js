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

function App() {
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
        {/*<input type="text" value={name} onChange={(e) => {*/}
        {/*  setName(e.target.value)*/}
        {/*}}/>*/}

        {/*<Child data={data} handle={handle}/>*/}
      </div>
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
