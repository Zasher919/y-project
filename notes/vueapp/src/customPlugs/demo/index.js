import component from "./src/main";

const install = function (Vue) {
  // 注册组件
  Vue.component(component.name, component);

  // 添加全局api
  Vue.prototype.$demo = component;
};

export default install;
