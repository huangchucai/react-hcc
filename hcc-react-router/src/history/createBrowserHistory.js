function createBrowserHistory() {
  const globalHistory = window.history
  let listens = []

  function go(n) {
    globalHistory.go(n)
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

  function setState(newState) {
    Object.assign(history, newState)
    history.length = globalHistory.length
    listens.forEach(listen => listen && listen(history.location))
  }

  /**
   *
   * @param pathname 跳转到那个路径
   * @param state  这个路径的状态对象
   */
  function push(pathname, state) {
    const action = 'PUSH'
    globalHistory.pushState(state, null, pathname)
    let location = {
      pathname,
      state
    }
    setState({ action, location })
  }

  /*  function replace() {
    }*/

  const history = {
    action: 'POP',
    go,
    goBack,
    goForward,
    length: 0,
    listen,
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state
    },
    push,
    // replace
  }
  return history
}

export default createBrowserHistory
