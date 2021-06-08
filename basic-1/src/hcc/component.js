import { createDOM } from './react-dom'
import { isFunction } from './utils'


export let updateQueue = {
  updaters: new Set(), // 更新器的数组
  isBatchingUpdate: false, // 标识，是否处于批量更新模式，默认是非批量更新
  add(updater) { // 增加一个更新器
    this.updaters.add(updater)
  },
  batchUpdate() { // 强制批量更新
    this.updaters.forEach(updater => updater.updateComponent())
    this.isBatchingUpdate = false
    this.updaters.clear()
  }
}


/**
 * 每一个组件都有一个Updater
 */
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance  // 类组件的实例
    this.pendingStates = [] // 等待更新的状态
  }

  addState(partialState) {
    this.pendingStates.push(partialState)
    // 如果是批量更新（异步更新) 就放入更新队列中，如果是同步更新，就直接调用updateComponent进行更新
    updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent()
  }

  updateComponent() {
    let { classInstance, pendingStates } = this
    if (pendingStates.length > 0) { // 说明有等待更新的状态
      classInstance.state = this.getState()
      classInstance.forceUpdate()
    }
  }

  // 根据老状态 更新 新状态
  getState() {
    let { classInstance, pendingStates } = this
    let { state } = classInstance
    if (pendingStates.length > 0) {
      pendingStates.forEach(nextState => { // nextState 可能是对象或者函数
        if (isFunction(nextState)) {
          nextState = nextState(state)
        }
        state = { ...state, ...nextState }
      })
      pendingStates.length = 0
    }
    return state
  }
}


class Component {
  static isReactComponent = true

  constructor(props) {
    this.props = props
    this.state = {}
    this.updater = new Updater(this) // 每一个类组件实例配置一个updater 实例
  }

  /**
   * 同步更新
   * @param partialState 新的部分状态
   */
  setState(partialState) {
    this.updater.addState(partialState)


    /*    this.state = { ...this.state, ...partialState }
        let newVdom = this.render()
        updateClassInstance(this, newVdom)*/
  }

  forceUpdate() {
    let newVdom = this.render()
    updateClassInstance(this, newVdom)
  }
}

function updateClassInstance(classInstance, newVdom) {
  let newDom = createDOM(newVdom) //得到真实dom
  let oldDom = classInstance.dom
  oldDom.parentNode.replaceChild(newDom, oldDom)
  classInstance.dom = newDom
}

export default Component
