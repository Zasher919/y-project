<template>
  <div class="modal">
    <button @click="onSelect">选择</button>
    <button @click="onCancel">取消</button>
    <button @click="onEdit">修改</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "测试",
      id: 10086,
    };
  },
  methods: {
    onSelect() {
      console.log("选择了-select");
    },
    onCancel() {
      console.log("选择了-cancel");
    },
    onEdit() {
      console.log("选择了-edit");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /*height: 100vh;*/
  /*width: 100vw;*/
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
</style>
