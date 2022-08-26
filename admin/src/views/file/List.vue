<!--  -->
<template>
  <div class="list-content">
    <div>
      <el-button style="float: left; margin: 10px" @click="addRow" size="mini" type="primary">新增文件</el-button>
    </div>

    <TemplateTable :data="tableList" :columns="columns" :tableLoading="tableLoading" />
    <!-- 新增/修改操作 -->
    <el-dialog :visible.sync="submitDialogVisible" title="新增数据" width="70%">
      <el-form ref="formRef" :model="submitForm" label-width="120px">
        <el-form-item label="文件别名">
          <el-input v-model="submitForm.imgName"></el-input>
        </el-form-item>
        <el-form-item label="文件位置">
          <el-select v-model="submitForm.imgType" placeholder="文件位置">
            <el-option v-for="(k, y) in imgTypeEnum" :key="k" :label="k" :value="y" />
          </el-select>
        </el-form-item>

        <el-form-item label="文件">
          <!-- <el-upload
            class="upload-demo"
            drag
            :headers="token"
            :action="`${uploadApi}/oss/upload`"
            :file-list="fileList"
            :limit="1"
            list-type="picture"
            :on-success="
              (response, file, fileList) => {
                return sucUpload(response, file, fileList)
              }
            "
          >
            <el-icon class="el-icon--upload"></el-icon>
            <div class="el-upload__text">拖动上传 <em>点击上传</em></div>
          </el-upload> -->

          <el-upload
            :action="`${uploadApi}/api/upload`"
            list-type="picture-card"
            :auto-upload="true"
            :file-list="uploadFile.list"
            name="upload"
            drag
            :limit="uploadFile.limit"
            :on-success="
              (response, file, fileList) => {
                return sucUpload(response, file, fileList);
              }
            "
            :on-exceed="onUploadExceed"
            :headers="uploadHeaders"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="submitDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitData">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { imgPostion } from "@/utils/enum";

import { getList, create, update, remove } from "@/api/img";

// import { getToken } from '@/utils/auth'
import { resManage, formatDate } from "@/utils/index";
import TemplateTable from "@/components/table";

import { getToken } from "@/utils/auth";

const token = getToken();
const Authorization = `Bearer ${token}`;

export default {
  components: {
    TemplateTable
  },
  data() {
    return {
      uploadFile: {
        list: [],
        limit: 1
      },
      uploadHeaders: {
        Authorization
      },
      imgHeadUrl: "",
      uploadApi: process.env.VUE_APP_UPLOAD_API,
      token: { Authorization: getToken() },
      imgTypeEnum: imgPostion,
      tableList: [],
      fileList: [],
      submitForm: {
        imgName: null,
        imgType: null,
        imgUrl: null
      },
      tableLoading: false,
      submitDialogVisible: false,
      columns: [
        { label: "文件名称", prop: "imgName", align: "center" },
        {
          label: "所属位置",
          align: "center",
          render: scope => {
            return this.imgTypeEnum[scope.row.imgType];
          }
        },
        // {
        //   label: '文件地址',
        //   align: 'center',
        //   render: (scope) => {
        //     return (
        //       <img style="width: 50px; height: 50px" src={scope.row.imgUrl} />
        //     )
        //   },
        // },
        {
          label: "文件地址",
          align: "center",
          prop: "imgUrl",
          width: 600
        },
        { label: "创建时间", prop: "createDate", align: "center" },
        { label: "更新时间", prop: "updateDate", align: "center" },
        {
          label: "操作",
          align: "center",
          render: scope => {
            return (
              <div>
                <el-button
                  type="text"
                  onClick={() => {
                    this.modifyRow(scope.row);
                  }}
                >
                  修改
                </el-button>
                <el-button
                  type="text"
                  onClick={() => {
                    this.rowDel(scope.row.id);
                  }}
                >
                  删除
                </el-button>
              </div>
            );
          }
        }
      ]
    };
  },
  mounted() {
    console.log(this.imgTypeEnum, "2");
    this.init();
  },
  methods: {
    async init() {
      this.tableLoading = true;
      let res = await getList();
      console.log(res, "res");
      this.tableLoading = false;
      this.tableList = res.data.map(item => ({
        ...item,
        imgUrl: this.uploadApi + "/" + item.imgUrl,
        createDate: this.formatTime(Number(item.createDate)),
        updateDate: this.formatTime(Number(item.updateDate))
      }));

      console.log("this.tableList", this.tableList);
    },

    // 超出文件
    onUploadExceed() {
      this.$message({
        message: "抱歉，只能上传一张文件",
        type: "error"
      });
      console.log("onUploadExceed");
    },
    // 保存数据
    async submitData() {
      let res = await create(this.submitForm);
      // let res = await this.$api.http('post', '/img', this.submitForm)
      // await resManage(res)
      this.submitDialogVisible = false;
      this.init();
    },
    addRow() {
      this.submitForm = {};
      this.fileList = [];
      this.uploadFile.list = [];
      this.submitDialogVisible = true;
    },
    async rowDel(id) {
      // let res = await this.$api.del('/img', id)
      let res = await remove(id);

      this.init();
    },

    modifyRow(row) {
      this.fileList = [];
      this.submitDialogVisible = true;
      this.fileList.push({ name: row.imgName, url: row.imgUrl });
      this.submitForm = row;
    },
    sucUpload(res, file, list) {
      console.log(res, "res, file, list");
      this.submitForm.imgUrl = res.realUrl;
    },
    formatTime(time) {
      return formatDate(time);
    }
  }
};
</script>
<style lang="css" scoped></style>
