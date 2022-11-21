<template>
  <div class="login-body">
    <div class="login-container">
      <h1 class="head">管理系统登录</h1>
      <el-form :rules="state.rules" :model="state.ruleForm" label-width="120px" ref="loginForm">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="state.ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="state.ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="info" @click="submitForm">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import md5 from 'js-md5';
import { reactive, ref,onMounted } from 'vue';
import { setToken } from '@/utils/auth';
import { login } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginForm = ref(null);
const state = reactive({
  ruleForm: {
    username: 'admin',
    password: '123456',
  },
  checked: true,
  rules: {
    username: [{ required: 'true', message: '账户不能为空', trigger: 'blur' }],
    password: [{ required: 'true', message: '密码不能为空', trigger: 'blur' }],
  },
});

const init = onMounted(()=>{
    localStorage.removeItem('menus')
})

const submitForm = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      // password: md5(state.ruleForm.password),
      let res = await login({ username: state.ruleForm.username || '', password: state.ruleForm.password });
      setToken(res.data.token);
      localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
        
      router.push('/');
    } else {
      console.log('error submit!!');
      return false;
    }
  });
};
const resetForm = () => {
  loginForm.value.resetFields();
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 400px;
  margin: 200px auto;
  text-align: center;
  h1 {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
