<!--  -->
<template>
  <div>
    <h2>UserList-----</h2>
    <Table :columns="state.columns" :data="state.list" />
  </div>
</template>

<script setup>
import { getUserList } from '@/api';
import { reactive } from 'vue';
import Table from '@/components/table/index.vue';
// import { created } from 'vue'

const state = reactive({
  columns: [
    { label: '用户名', prop: 'username' },
    { label: '角色', prop: 'role_id' },
    { label: '状态', prop: 'status' },
    { label: '创建时间', prop: 'create_time' },
  ],
  list: [],
});

const init = async () => {
  console.log('init->');

  let { data } = await getUserList();

  state.list = data;

  console.log('res->', state.columns);
};
init();
// export default {
//   data () {
//     return {
//     }
//   }
// }
</script>

<style scoped></style>
