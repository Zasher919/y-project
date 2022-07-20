<template>
  <div class="template-table">
    <!-- 列表 -->
    <div>
      <el-table
        v-bind="$attrs"
        v-on="$listeners"
        stripe
        v-loading="loading"
        tooltip-effect="light"
      >
        <template v-for="(item, index) in columns">
          <el-table-column
            v-if="item.render"
            v-bind="item"
            :key="index"
            :width="item.width"
            :align="item.align"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <RenderDom :item="item" :scope="scope"></RenderDom>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.type == 'htmlRender'"
            :label="item.label"
            :key="index"
            :width="item.width"
            :fixed="item.fixed"
            :align="item.align"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <slot name="htmlRender" :row="scope.row"></slot>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            v-bind="item"
            :width="item.width"
            :align="item.align"
            show-overflow-tooltip
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 分页 -->
    <div v-if="showPage" style="padding-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.pageNo"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageObj.totalCount"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplateTable',
  props: {
    columns: Array,
    toUrl: {
      type: String,
      default: '',
    },
    showTableHeight: {
      type: Boolean,
      default: false,
    },
    pageObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
    showPage: {
      type: Boolean,
      default: false,
    },
    tableLoading: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    RenderDom: {
      props: {
        item: [Object, Function],
        scope: [Object, String],
      },
      render(h, stx) {
        // const dom=this.item.render()
        return <div>{this.item.render(this.scope)}</div>
      },
    },
  },
  data() {
    return {
      tableHeight: window.screen.width >= 1920 ? 600 : 405,
    }
  },
  mounted() {},
  computed: {
    loading() {
      return this.tableLoading
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pageSizeChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('pageCurrentChange', val)
    },
  },
}
</script>

<style lang="less"></style>
