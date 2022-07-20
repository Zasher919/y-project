<template>
	<view>
		<!-- 表单 -->
		<cl-form ref="form" :model.sync="form" :rules="rules">
			<cl-form-item label="活动名称" prop="name"><cl-input class="z-input" placeholder="请输入账号" v-model="form.phoneNum"></cl-input></cl-form-item>
			<cl-form-item label="活动名称" prop="name"><cl-input class="z-input" placeholder="请输入密码" v-model="form.password"></cl-input></cl-form-item>
		</cl-form>

		<view>
			<cl-button class="btn" @click="btnClick('login')" type="primary">登录</cl-button>
			<cl-button class="btn" @click="btnClick('addUser')" type="success">注册</cl-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phoneNum: '15611111119',
				password: '123456'
			},
			rules: {
				phoneNum: [
					{
						required: true,
						message: '账号不能为空'
					},
					{
						min: 3,
						message: '必须在3个字符以上'
					}
				],
				password: [
					{
						required: true,
						message: '密码不能为空'
					},
					{
						min: 3,
						message: '必须在3个字符以上'
					}
				]
			}
		};
	},
	created() {
		uni.setNavigationBarTitle({ title: '注册' });
	},
	methods: {
		async btnClick(type) {
			switch (type) {
				case 'login':
					let { code, data } = await this.$http('POST', 'api/h5/login', this.form);
					if (code == 200) {
						uni.setStorage({
							key: this.$config.userinfo,
							data: JSON.stringify(data.userinfo),
							success: function() {}
						});

						uni.setStorage({
							key: this.$config.token,
							data: JSON.stringify(data.access_token),
							success: function() {
								console.log('user-info-success');
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}

					break;

				case 'addUser':
					let res = await this.$http('POST', 'api/h5/register', this.form);

					break;
			}
		}
	}
};
</script>

<style scoped>
>>> .btn {
	/* pa */
	margin: 50rpx;
	width: 100%;
	margin-left: 0 !important;
}

.z-input {
	margin-right: 20rpx;
}
</style>
