<template>
  <div class="template-table">
    <!-- 列表 -->

    <el-table
      highlight-current-row
      border
      v-bind="$attrs"
      stripe
      v-loading="loading"
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-for="item in columns" :key="item.id" v-bind="item"  />
      <!-- <el-table-column prop="username" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" /> -->
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div>
      <el-table
        highlight-current-row
        border
        v-bind="$attrs"
        stripe
        v-loading="loading"
        tooltip-effect="light"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="checks" type="selection" width="55"></el-table-column>
        <template v-for="(item, index) in columns">
          <el-table-column v-if="item.render" v-bind="item" :key="index" :width="item.width" :align="item.align" show-overflow-tooltip>
            <template #default="scope">
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
            <template #default="scope">
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
          ></el-table-column>
        </template>
      </el-table>
    </div> -->

    <!-- 分页 -->
    <!-- <div v-if="showPage" style="padding-top: 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.pageNo"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData.totalCount"
      >
      </el-pagination>
    </div> -->
  </div>
</template>

<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  columns: Array,
});

const { columns } = toRefs(props);

console.log('columns->', columns);

// export default {
//   name: "TemplateTable",
//   props: {
//     // 是否显示多选框
//     checks: {
//       type: Boolean,
//       default: true
//     },
//     columns: Array,
//     toUrl: {
//       type: String,
//       default: ""
//     },
//     showTableHeight: {
//       type: Boolean,
//       default: false
//     },
//     pageData: {
//       type: Object,
//       default: () => {
//         return {};
//       }
//     },
//     showPage: {
//       type: Boolean,
//       default: true
//     },
//     tableLoading: {
//       type: Boolean,
//       default: true
//     }
//   },
//   components: {
//     RenderDom: {
//       props: {
//         item: [Object, Function],
//         scope: [Object, String]
//       },
//       render(h, stx) {
//         console.log("h,stx", h, stx);
//         return <div>{this.item.render(this.scope)}</div>;
//       }
//     }
//   },
//   data() {
//     return {
//       tableHeight: window.screen.width >= 1920 ? 600 : 405
//     };
//   },
//   computed: {
//     loading() {
//       return this.tableLoading;
//     }
//   },
//   methods: {
//     handleSelectionChange(val) {
//       this.$emit("selectChange", val);
//     },
//     handleSizeChange(val) {
//       this.$emit("pageSizeChange", val);
//     },
//     handleCurrentChange(val) {
//       this.$emit("pageCurrentChange", val);
//     }
//   }
// };
</script>

<style lang="less"></style>
