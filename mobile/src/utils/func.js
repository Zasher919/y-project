export default {
  // 节流
  throttle(fn, wait) {
    let timer = null;
    return function() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(this, arguments[1]);
        }, wait);
      }
    };
  },
  // 防抖
  debounce(fn, wait) {
    let timer = null;
    let args = arguments;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    };
  },
  // 深拷贝
  deepClone(data) {
    if (typeof data != "object" && data != null) return data;
    let deepData = Array.isArray(data) ? [] : {};
    for (const key in data) {
      deepData[key] = data[key];
      if (typeof data[key] == "object") {
        deepData[key] = deepTwo(data[key]);
      }
    }
    return deepData;
  }
  //
};
