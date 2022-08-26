<!--  -->
<template>
  <div>
    <Form />
  </div>
</template>

<script>
import Form from "../../components/form";
export default {
  create() {},
  data() {
    return {
      configData: [
        { type: "input", key: "inputOne", rg: null },
        { type: "input", key: "inputOne", rg: null },
        { type: "radio", key: "inputOne", rg: null },
        { type: "file", key: "inputOne", rg: null },
        { type: "radios", key: "inputOne", rg: null },
        { type: "select", key: "inputOne", rg: null }
      ]
    };
  }
};
</script>

<style scoped></style>
