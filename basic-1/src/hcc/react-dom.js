/**
 * 虚拟dom转换成真实dom, 并插入到容器中
 * @param vdom 虚拟dom
 * @param root  容器
 */
import { addEvent } from './event'

function render(vdom, root) {
  console.log(vdom)
  const dom = createDOM(vdom)
  root.appendChild(dom)
}

/**
 * 更新真实dom的属性
 * @param dom
 * @param newProps
 */
function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === 'children') continue
    if (key === 'style') {
      let styleObj = newProps[key]
      for (const styleObjKey in styleObj) {
        // dom.setAttribute('style', styleObj[styleObjKey])
        dom.style[styleObjKey] = styleObj[styleObjKey]  // dom.style.color = 'red'
      }
    } else if (key.startsWith('on')) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
      // dom[key.toLocaleLowerCase()] = newProps[key]
    } else {
      dom[key] = newProps[key] // dom.className = 'title'
    }
  }
}

/**
 * 把多个子节点从虚拟dom全部转换成真实dom并且插入到父节点中
 * @param childrenVdom（数组）多个子节点
 * @param parentDom
 */
function reconcileChildren(childrenVdom, parentDom) {
  childrenVdom.forEach(vdom => {
    render(vdom, parentDom)
  })
}

/**
 * 函数组件 获取真实dom
 * @param vdom  虚拟dom React元素
 */
function updateFunctionComponent(vdom) {
  let { type, props } = vdom
  let renderVdom = type(props)
  console.log(renderVdom)
  return createDOM(renderVdom)
}

/**
 * 类组件  获取真实dom
 * @param vdom
 * @returns {undefined}
 */
function updateClassComponent(vdom) {
  let { type, props } = vdom
  let classInstance = new type(props) // new Welcome({name:'hcc'}) // 1. 执行了组件的constructor
  console.log(1)
  vdom.classInstance = classInstance // 让虚拟dom的classInstance = 类组件实例
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount()  // 2. 执行组件componentWillMount
  }
  let renderVdom = classInstance.render() // 3. 执行组件的render
  let dom = createDOM(renderVdom)
  vdom.dom = renderVdom.dom = dom // 让这个类的虚拟dom的dom属性和render返回的虚拟dom绑定
  classInstance.oldVdom = renderVdom // 让组件实例的oldVdom属性指向本次render出来的实例
  classInstance.dom = dom // 让类组件的实例上挂一个真实的dom
  // 简单处理componentWillMount
  if (classInstance.componentDidMount()) {
    classInstance.componentDidMount()  // 2. 执行组件componentWillMount
  }
  return dom
}

/**
 * 把虚拟dom转换成真实dom
 * @param vdom null, 数字，字符串，React元素
 */
export function createDOM(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  if (!vdom) return ''

  // 否则就是一个React元素
  let { type, props, ref } = vdom
  let dom
  // 如果是一个组件（函数组件，或者类组件）
  if (typeof type === 'function') {
    if (type.isReactComponent) { // 说明这个type是一个类组件的虚拟dom元素
      return updateClassComponent(vdom)
    } else {
      return updateFunctionComponent(vdom)
    }
  } else { // 如果是一个原生元素
    dom = document.createElement(type) // span div
  }


  updateProps(dom, {}, props) // 更新属性，把虚拟dom上的属性设置到真实DOM上


  // 处理子节点 (如果子节点就是一个单节点，并且是字符串或者数字的话）
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children
  } else if (typeof props.children === 'object' && props.children.type) { // 如果是一个单的react元素
    render(props.children, dom)
  } else if (Array.isArray(props.children)) { // 如果第一个数组，说明有多个子元素
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children ? props.children.toString() : ''
  }

  if (ref) {
    ref.current = dom
  }
  return dom
}

function updateClassInstance(oldVdom, newVdom) {

}


function updateChild(currentDom, oldChildren, newChildren) {

}

/**
 * DOM-DIFF的时候，react为了提高性能有一些条件
 * 1. 不考虑跨层级移动的情况
 *
 * 进入深度比较
 * @param oldVdom
 * @param newVdom
 */
function updateElement(oldVdom, newVdom) {
  // 需要复用老的dom节点
  let currentDom = newVdom.dom = oldVdom.dom
  newVdom.classInstance = oldVdom.classInstance

  if (typeof oldVdom.type === 'string') { // 原生的dom类型
    updateProps(currentDom, oldVdom.props, newVdom.props)
    updateChild(currentDom, oldVdom.props.children, newVdom.props.children)
  } else if (typeof oldVdom.type === 'function') {
    updateClassInstance(oldVdom, newVdom)
  }
}

/**
 * 比较新旧2个虚拟dom树， 寻找差异， 把相应的差异更新到真实dom上
 * @param parentDOM  父的dom节点
 * @param oldVdom
 * @param newVdom
 */
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  if (!oldVdom && !newVdom) {
    return null
  } else if (oldVdom && !newVdom) { // 如果旧的虚拟dom有，新的没有，就需要删除旧的虚拟dom
    let currentDom = oldVdom.dom
    parentDOM.removeChild(currentDom)
    if (oldVdom.classInstance && oldVdom.classInstance.componentWillUnmount) {
      oldVdom.classInstance.componentWillUnmount()
    }
    return null
  } else if (!oldVdom && newVdom) { // 新建dom节点
    let newDom = createDOM(newVdom)
    newVdom.dom = newDom
    parentDOM.appendChild(newDom)
    return newVdom
  } else {
    // 新旧节点都有值
    updateElement(oldVdom, newVdom)
  }
}

export default {
  render
}
