import pathToRegexp from 'path-to-regexp'

/**
 * 源码中会有缓存，如果一个路径编译过，再次匹配的时候就不会在编译了
 * @param path
 * @param options
 * @returns {{regexp: *, keys: []}}
 */
function compilePath(path, options) {
  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  return { keys, regexp }
}


/**
 *
 * /post/:id
 * @param pathname 浏览器栏中的真实路径
 * @param options 匹配的参数 path, exact, strict, sensitive
 */
function matchPath(pathname, options = {}) {
  let { path = '/', exact = false, strict = false, sensitive = false } = options
  const { keys, regexp } = compilePath(path, {
    exact, sensitive, strict
  })
  // /post/:id  keys=[{name: "id"}] regexp = /\/post\/([^\/]+?)/
  const match = regexp.exec(pathname)
  if (!match) return null
  const [url, ...values] = match // ['/post/1', 1] url = '/post/1 values=[1]
  // eg: pathname : /post/1/name  /post/1
  const isExact = pathname === url
  // 需要精确匹配，但是匹配的不精确，没有完全相等，也相当于没有匹配上
  if (exact && !isExact) return null
  return { // 路由组件中的props.match
    path,// Route 的原始path
    url, // 正则匹配到的浏览器的pathname部分
    isExact,
    params: keys.reduce((memo, obj, index) => {
      memo[obj.name] = values[index]
      return memo
    }, {})
  }
}

export default matchPath
