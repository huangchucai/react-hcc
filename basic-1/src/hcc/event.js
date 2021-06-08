/**
 * 处理事件绑定 react会将事件绑定在根组件中
 * @param dom  真实dom
 * @param eventType 事件类型（小写）onclick
 * @param listener  真实的事件绑定
 */
import { updateQueue } from './component'

export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {})
  store[eventType] = listener // store.onclick=handleClick
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}


function dispatchEvent(event) {
  let { target, type } = event
  let eventType = `on${type}`
  updateQueue.isBatchingUpdate = true
  let { store } = target
  let listener = store && store[eventType]
  listener.call(target, event)
}
