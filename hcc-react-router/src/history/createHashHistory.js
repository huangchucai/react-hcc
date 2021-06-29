function createHashHistory() {
  let stack = []
  let index = -1
  let action, state
  let listens = []

  function go(n) {
    console.log(stack, index)
    index += n
    if (index < 0 || index > stack.length - 1) return
    action = 'POP'
    const newState = stack[index]
    state = newState.state
    window.location.hash = newState.pathname
  }

  function goBack() {
    go(-1)
  }

  function goForward() {
    go(1)
  }

  function listen(listen) {
    listens.push(listen)
    return () => {
      listens = listens.filter(l => l !== listen)
    }
  }


  window.addEventListener('hashchange', () => {
    const pathname = window.location.hash.slice(1)
    Object.assign(history, { action, location: { pathname, state } })
    if (action === 'PUSH') {
      stack[++index] = history.location
    }
    listens.forEach(listen => listen(history.location))
  })

  /**
   *
   * @param pathname 跳转到那个路径
   * @param state  这个路径的状态对象
   */
  function push(pathname, newState) {
    action = 'PUSH'
    state = newState
    window.location.hash = pathname
  }

  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    listen,
    location: {
      pathname: window.location.hash ? window.location.hash.slice(1) : '/',
      state: undefined
    },
    push,
    // replace
  }
  window.myHistory = history
  if (window.location.hash.slice(1) === '/') {
    stack[++index] = {
      pathname: '/',
      state: undefined
    }
  } else {
    window.location.hash = window.location.hash ? window.location.hash.slice(1) : '/'
  }
  return history
}

export default createHashHistory
