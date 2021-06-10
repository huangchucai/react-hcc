import Component from './component'

/**
 * react 会从根组件开始比较新旧虚拟dom， 而 vue则是从和组件绑定属性触发的watcher开始比较（组件层面）
 */

/**
 * // 将jsx转换成react元素
 * @param type  元素类型 (一个字符串（元素组件）， 函数（函数组件） )
 * @param config  配置对象，一般来说就是属性对象
 * @param children  第一个儿子
 * @returns {{type, props}}
 */
function createElement(type, config, children) {
  let ref
  if (config) {
    delete config._owner
    delete config._store
    ref = config.ref
    delete config.ref
  }
  let props = { ...config }
  if (arguments.length > 3) {
    children = [...arguments].slice(2)
  }
  props.children = children // children 可能是数组(多个子元素)，字符串，数字，null， react元素
  return {
    type,
    ref,
    props
  }
}
/*
  'type': 'h1',
  'ref: null,
  'props': {
    'className': 'title',
    'style': {
      'color': 'red'
    },
    'children': [
      'hello',
      'weod'
    ]
  }
*/

function createRef() {
  return {
    current: null
  }
}

const React = {
  Component,
  createRef,
  createElement,
}


export default React
