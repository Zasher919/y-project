import Vue from "vue";
import AlertComonent from "./main.vue";

let instance;

// extend 是构造一个组件的语法器，传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComonent);

let initInstance = () => {
  // 实例化 confirmConstructor
  instance = new AlertConstructor({
    el: document.createElement("div"),
  });
  // 添加body
  document.body.appendChild(instance.$el);
};

let component = (options = {}) => {
  // 初始化
  initInstance();
  instance.$date.title = options.title;

  return new Promise((resolve, reject) => {
    console.log(instance);
    console.log(options);
    instance.show = true;
    let onSelect = instance.onSelect;
    let onCancel = instance.onCancel;

    instance.onSelect = () => {
      let id = instance.id;
      // 先执行instance.onselect main.vue 里面的onSelect函数
      onSelect();
      // 在执行自定义函数
      resolve(id);
    };

    instance.onCancel = () => {
      onCancel();

      reject(new Error("取消"));
    };
  });
};

export default component;
