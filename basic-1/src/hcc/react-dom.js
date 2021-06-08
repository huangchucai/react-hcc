/**
 * 虚拟dom转换成真实dom, 并插入到容器中
 * @param vdom 虚拟dom
 * @param root  容器
 */
import { addEvent } from './event'

function render(vdom, root) {
  const dom = createDOM(vdom)
  root.appendChild(dom)
}

/**
 * 更新真实dom的属性
 * @param dom
 * @param props
 */
function updateProps(dom, props) {
  for (const key in props) {
    if (key === 'children') continue
    if (key === 'style') {
      let styleObj = props[key]
      for (const styleObjKey in styleObj) {
        // dom.setAttribute('style', styleObj[styleObjKey])
        console.log(styleObj)
        dom.style[styleObjKey] = styleObj[styleObjKey]  // dom.style.color = 'red'
      }
    } else if(key.startsWith('on')) {
      addEvent(dom, key.toLocaleLowerCase(), props[key])
      // dom[key.toLocaleLowerCase()] = props[key]
    }
    else {
      dom[key] = props[key] // dom.className = 'title'
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
  let classInstance = new type(props) // new Welcome({name:'hcc'})
  let renderVdom = classInstance.render()
  let dom =  createDOM(renderVdom)
  classInstance.dom = dom // 让类组件的实例上挂一个真实的dom
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
  let { type, props } = vdom
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


  updateProps(dom, props) // 更新属性，把虚拟dom上的属性设置到真实DOM上


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
  return dom
}

export default {
  render
}
