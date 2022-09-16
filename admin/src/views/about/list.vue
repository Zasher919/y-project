<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search">
        <el-input v-model="listQuery.keyword" clearable placeholder="请输入内容" @keyup.enter.native="onFilter">
          <el-button slot="append" icon="el-icon-search" type="primary" @click="onFilter" @keyup.enter.native="onFilter"
            >搜索</el-button
          >
        </el-input>
      </div>
      <div class="filter-container__ctrl">
        <el-button
          class="filter-item"
          style="margin-left: 10px"
          type="primary"
          plain
          icon="el-icon-edit"
          @click="handleCreate"
        >
          {{ $t("table.add") }}
        </el-button>
      </div>
    </div>
    <div class="el-table__footer">
      <el-button
        v-if="isAdmin"
        type="danger"
        plain
        :disabled="selectedRows.length <= 0"
        @click="handleDelete(selectedRows)"
        >删除选中
      </el-button>
    </div>

    <TemplateTable @selectChange="handleSelectionChange" :data="list" :columns="columns" :tableLoading="listLoading">
    </TemplateTable>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { config } from "./config";
import { fetchList, remove } from "@/api/about";
import waves from "@/directive/waves"; // waves directive
import { formatDate } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import TemplateTable from "@/components/table";

let categoryList = {};
export default {
  name: "AboutList",
  components: {
    Pagination,
    TemplateTable
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return status ? "success" : "info";
    },
    formatDate(date) {
      return formatDate(date);
    },
    categoryIDsToName(ids) {
      let names = "";
      ids.forEach((v, i) => {
        let item = categoryList[v] || {};
        let name = item.name || "";
        if (name) {
          names += i === 0 ? name : ` > ` + name;
        }
      });
      return names;
    }
  },
  data() {
    return {
      columns: [
        { label: "标题", prop: "name" },

        { label: "更新时间", prop: "updatedAt" },
        {
          label: "状态",
          render: scope => {
            return (
              <div>
                <el-tag type={scope.row.status ? "success" : "info"} size="mini">
                  {scope.row.status ? "开启" : "停用"}
                </el-tag>
              </div>
            );
          }
        },
        {
          label: "操作",
          render: scope => {
            return (
              <div>
                <el-button
                  size="mini"
                  onClick={() => {
                    this.handleUpdate(scope.row);
                  }}
                >
                  {this.$t("table.edit")}
                </el-button>
                <el-button
                  style={ scope.row.status  ? 'display:none' : 'display:block'}
                  size="mini"
                  type="danger"
                  plain
                  onClick={() => {
                    this.handleDelete(scope.row);
                  }}
                >
                  {this.$t("table.delete")}
                </el-button>
              </div>
            );
          }
        }
      ],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        keyword: ""
      },
      downloadLoading: false,
      selectedRows: [],

      categoryList: {}
    };
  },
  computed: {
    isAdmin() {
      const roles = this.$store.state.user.roles;
      return roles.includes("admin");
    }
  },
  watch: {
    "listQuery.keyword"(value) {
      if (value.length <= 0) {
        this.getList();
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(res => {
        this.list = res.data;
        this.total = res.total;

        this.listLoading = false;
      });
    },

    // 添加事件
    handleCreate() {
      this.$router.push(`${config.routePath}create`);
    },

    // 编辑信息
    handleUpdate(row) {
      this.$router.push({
        path: `${config.routePath}update`,
        query: { id: row.id }
      });
    },

    // 删除
    handleDelete(row) {
      let ids = [];
      if (Array.isArray(row)) {
        ids = row.map(v => v._id);
      } else {
        ids.push(row._id);
      }

      this.handleClose(() => {
        remove({
          ids
        }).then(res => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      });
    },

    handleSelectionChange(val) {
      this.selectedRows = val;
    },

    // 删除提醒
    handleClose(done) {
      this.$confirm("确认删除？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    // filter
    onFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>
