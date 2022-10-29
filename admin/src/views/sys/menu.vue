<!--  -->
<template>
  <div>
    <div class="head">
      <el-button type="primary" @click="btnClick('add')">新增</el-button>
    </div>
    <!-- <div>菜单管理</div> -->
    <TemplateTable @selectChange="handleSelectionChange" :data="list" :columns="columns" :tableLoading="listLoading" />

    <!-- 新增 -->
    <el-dialog title="提示" :visible.sync="showForm">
      <TemplateForm v-if="showForm" :showForm.sync="showForm" :configData="formConfig" @submit="submit" />
    </el-dialog>
  </div>
</template>

<script>
import { menuList, menuAdd } from "@/api/sys.js";
import TemplateTable from "@/components/table";
import TemplateForm from "@/components/form";
export default {
  name: "SysMenu",
  components: {
    TemplateTable,
    TemplateForm
  },
  data() {
    return {
      columns: [
        // 列表字段
        { label: "名称", prop: "name" },
        { label: "上级菜单", prop: "parent_id" },
        { label: "图标", prop: "icon" },
        { label: "类型", prop: "type" },
        { label: "排序", prop: "sort" },
        { label: "菜单URL", prop: "url" },
        { label: "授权标识", prop: "auth_flag" }
      ],
      list: [], // 列表数据
      listLoading: false, // 列表loading
      showForm: false, // 新增弹框
      parentList: [],
      formConfig: [
        // 表单配置
        {
          key: "type",
          type: "radio",
          value:1,
          label: "类型:",
          options: [
            { label: "目录", value: 1 },
            { label: "菜单", value: 2 },
            { label: "按钮", value: 3 }
          ]
        },
        { key: "name", type: "input", label: "菜单名称:" },
        { key: "parent_id", type: "select", label: "上级菜单:", options: this.parentList, show: { showKey: "type", hideValue: 1 } },
        { key: "icon", type: "input", label: "菜单图片:" },
        { key: "sort", type: "input", label: "排序:" },
        { key: "url", type: "input", label: "菜单地址:" },
        { key: "auth_flag", type: "input", label: "按钮标识:", show: { showKey: "type", showValue: 3 } }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let { code, data } = await menuList();
      this.$nextTick(() => {
        if (code === 10000) this.list = data;
        this.parentList = data.map(v => ({ label: v.name, value: v.id }));
        let index = this.formConfig.findIndex(v => v.key == "parent_id");

        this.$set(this.formConfig, index, { ...this.formConfig[index], options: this.parentList });
        console.log(this.parentList);
      });
    },

    async submit(data) {
      let res = await menuAdd(data);
      console.log(res, "data");
      this.init();
    },
    handleSelectionChange() {},
    btnClick(type) {
      switch (type) {
        case "add":
          this.showForm = true;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.head {
  margin: 10px;
}
</style>
