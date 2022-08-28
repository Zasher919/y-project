<!--  -->
<template>
  <div>
    <el-button v-if="!showForm" @click="showForm = !showForm">显示</el-button>
    <div style="width: 500px">
      <Form @submitForm="submitForm" :showForm.sync="showForm" :configData="configData">
        <!-- <template v-slot:footer>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button>取消</el-button>
      </template> -->
      </Form>
    </div>
  </div>
</template>

<script>
import Form from "../../components/form";

export default {
  name: "Demo",
  components: {
    Form
  },
  data() {
    return {
      showForm: false,
      formInput6Options: [
        { label: "胆大", value: 1 },
        { label: "心细", value: 2 },
        { label: "中二", value: 3 },
        { label: "憨批", value: 4 }
      ],
      configData: [
        { type: "input", key: "inputOne", label: "名称", tip: "请输入名称", rg: null, required: true, trigger: "blur" },
        { type: "input", key: "inputTwo", label: "账号", tip: "请输入账号", rg: null, required: true, trigger: "blur" },
        {
          type: "select",
          key: "input6",
          label: "性格",
          options: [
            { label: "胆大", value: 1 },
            { label: "心细", value: 2 },
            { label: "中二", value: 3 },
            { label: "憨批", value: 4 }
          ],
          tip: "请选择性格",
          rg: null,
          required: true,
          trigger: "change"
        },
        {
          type: "date",
          key: "input2",
          label: "出生日期",
          tip: "请选择出生日期",
          rg: null,
          required: true,
          trigger: "change"
        },
        {
          type: "radio",
          key: "input3",
          label: "性别",
          options: [
            { label: "男", value: 1 },
            { label: "女", value: 2 }
          ],
          tip: "请选择性别",
          rg: null,
          required: true,
          trigger: "change"
        },
        {
          type: "checkbox",
          key: "input5",
          label: "爱好",
          options: [{ label: "抽烟" }, { label: "喝酒" }, { label: "烫头" }],
          tip: "请选择爱好",
          rg: null,
          required: true,
          trigger: "change",
          value: ["抽烟"]
        }
        // { type: "file", key: "input4", rg: null },
      ]
    };
  },
  methods: {
    submitForm(data) {
      console.log("data", data);
    }
  }
};
</script>

<style scoped></style>
