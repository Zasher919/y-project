<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="filter-container__search">
        <el-input
          v-model="listQuery.keyword"
          clearable
          placeholder="请输入内容"
          @keyup.enter.native="onFilter"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="onFilter"
            @keyup.enter.native="onFilter"
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
          {{ $t('table.add') }}
        </el-button>
      </div>
    </div>
    <div class="el-table__footer">
      <el-button
        type="danger"
        plain
        :disabled="selectedRows.length <= 0"
        @click="handleDelete(selectedRows)"
        >删除选中
      </el-button>
    </div>
    <TemplateTable
      @selectChange="handleSelectionChange"
      :data="list"
      :columns="columns"
      :tableLoading="listLoading"
    >
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
import { config } from './config'
import { fetchList, remove } from '@/api/product'
import { fetchList as fetchCategoryList } from '@/api/product-category'
import waves from '@/directive/waves' // waves directive
import { formatDate, listToObject, baseHost } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import TemplateTable from "@/components/table";

let categoryList = {}
export default {
  name: 'ProductList',
  components: {
    Pagination,
    TemplateTable
  },
  directives: {
    waves,
  },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'info'
    },
    formatDate(date) {
      return formatDate(date)
    },
    categoryIDsToName(id) {
      console.log('categoryList', categoryList)
      let item = categoryList[id] || {}
      let name = item.name || ''

      return name
    },
  },
  data() {
    return {
      uploadApi: process.env.VUE_APP_UPLOAD_API,
      imgApi: process.env.VUE_APP_BASE_HOST,
      columns: [
        { label: "标题", prop: "name" },
        {
          label: "图片",
          render: scope => {
            return (
              <div>
                <el-popover placement="right" width="230" trigger="hover">
                  <img src={this.imgApi + scope.row.pic} style="width: 200px" />
                  <img src={this.imgApi +scope.row.pic} slot="reference" style="width: 40px" />
                </el-popover>
              </div>
            );
          }
        },
        { label: "分类", prop: "category" },
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
                  type="text"
                  onClick={() => {
                    this.handleUpdate(scope.row);
                  }}
                >
                  修改
                </el-button>
                <el-button
                  type="text"
                  onClick={() => {
                    this.handleDelete(scope.row.id);
                  }}
                >
                  删除
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
        sort: '+id',
        keyword: '',
      },
      downloadLoading: false,
      selectedRows: [],
    }
  },
  watch: {
    'listQuery.keyword'(value) {
      if (value.length <= 0) {
        this.getList()
      }
    },
  },
  async created() {
    await this.getCategory()
    await this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then((res) => {
        const { data = [], total = 0 } = res
        console.log('res', res)
        this.list = data
        console.log('this.list', this.list)
        this.total = total
        this.listLoading = false
      })
    },

    // 分类列表
    getCategory() {
      fetchCategoryList().then((res) => {
        const { data = [] } = res

        let listObject = listToObject(data)
        this.categoryList = listObject
        categoryList = listObject
      })
    },

    // 添加事件
    handleCreate() {
      this.$router.push(`${config.routePath}create`)
    },

    // 编辑信息
    handleUpdate(row) {
      this.$router.push({
        path: `${config.routePath}update`,
        query: { id: row.id },
      })
    },

    // 删除
    handleDelete(row) {
      let ids = []
      if (Array.isArray(row)) {
        ids = row.map((v) => v.id)
      } else {
        ids.push(row.id)
      }

      this.handleClose(() => {
        remove({
          ids,
        }).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000,
          })
          this.getList()
        })
      })
    },

    handleSelectionChange(val) {
      this.selectedRows = val
    },

    // 删除提醒
    handleClose(done) {
      this.$confirm('确认删除？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },

    // filter
    onFilter() {
      this.listQuery.page = 1
      this.getList()
    },
  },
}
</script>
