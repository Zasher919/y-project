console.log('test')

let cache = function () {
  console.log('start', arguments)
  let a = 1
  for (let i = 0; i < arguments.length; i++) {
    a = a * arguments[i]
  }
  return a
}

// 利用Object 的key 不能重复, 来实现数据缓存
let proxyCache = (function () {
  console.log('proxyCache-start')
  let cacheObj = {}
  return function () {
    let args = Array.prototype.join.call(arguments, ',')
    console.log('cacheObj', cacheObj)
    console.log('proxyCache->args', args)

    if (args in cacheObj) {
      console.log('args--->', cacheObj[args])
      return cacheObj[args]
    }

    return (cacheObj[args] = cache.apply(this, arguments))
  }
})()

console.log(proxyCache(1, 2))
console.log(proxyCache(1, 2))

console.log(proxyCache(1, 2, 3))
console.log(proxyCache(1, 2, 3))

console.log(proxyCache(1, 2, 3, 4))
console.log(proxyCache(1, 2, 3, 4))
