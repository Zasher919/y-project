<!--
    公共表单组件
    二次封装element-form
-->
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item v-for="item in config" :key="item.key" :label="item.label" :prop="item.key">
        <el-input v-model="form[item.key]" v-if="item.type === 'input'" :placeholder="item.tip"></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="form[item.key]"
          :options="item.op"
          placeholder="请选择活动区域"
        >
          <el-option v-for="j in item.options" :key="j.value" :label="j.label" :value="j.value" />
        </el-select>

        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          placeholder="选择日期"
          v-model="form[item.key]"
          style="width: 100%"
        ></el-date-picker>

        <el-radio-group v-if="item.type === 'radio'" v-model="form[item.key]">
          <el-radio v-for="j in item.options" :key="j.value" :label="j.value">{{ j.label }}</el-radio>
        </el-radio-group>

        <el-checkbox-group v-if="item.type === 'checkbox'" v-model="form[item.key]">
          <el-checkbox v-for="(j, i) in item.options" :key="i" :label="j.label">{{ j.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <template>
        <div class="footer-btn">
          <slot name="footer">
            <el-button type="primary" @click="submit('ruleForm')">立即创建</el-button>
            <el-button @click="$emit('update:showForm', false)">取消</el-button>
          </slot>
        </div>
      </template>
    </el-form>
  </div>
</template>

<script>
import { deepClone } from "../../utils";

export default {
  name: "TemplateForm",
  props: {
    configData: {
      Type: Array,
      default: []
    }
  },
  data() {
    return {
      aaa: "",
      form: {}, // 表单
      config: [], // 配置
      ruleForm: {
        // 规则
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {}
    };
  },
  created() {},
  mounted() {
    console.log("mounted", this.config);
    this.config = deepClone(this.configData);

    this.$nextTick(() => {
      this.config.forEach(v => {
        // this.form[v.key] = null;
        if (v.type === "checkbox") {
          console.log("333");
          this.$set(this.form, v.key, v.value);
        } else {
          this.$set(this.form, v.key, null);
        }
        this.rules[v.key] = [{ required: v.required, message: v.tip, trigger: v.trigger }];
      });
    });

    console.log("form", this.form);
    // console.log("rule", this.rules);
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$emit("submitForm", this.form);
          this.$emit("update:showForm", false);
        } else {
          console.log(this.form);
          console.log(this.rules);
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // this.$forceUpdate();
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.footer-btn {
  text-align: center;
}
</style>
