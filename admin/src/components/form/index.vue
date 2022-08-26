<!--
    公共表单组件
    二次封装element-form
-->
<template>
  <div></div>
</template>

<script>
import Form from "../../components/form";
export default {
  name: "TemplateForm",
  props: {
    configData: {
      Type: Array,
      default: []
    }
  },
  create() {},
  data() {
    return {
      config: []
    };
  }
};
</script>

<style scoped></style>
