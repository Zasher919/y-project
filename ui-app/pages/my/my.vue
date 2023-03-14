<template>
	<view>
		<view class="head-content">
			<image src="../../static/images/test.jpg" mode=""></image>
		</view>

		<view class="opt-list">
			<view @click="btn('myCollect')" class="opt-item">
				<p>我的收藏</p>
				<cl-icon class="icon" name="cl-icon-arrow-right"></cl-icon>
			</view>

			<view class="opt-item">
				<p>我的订单</p>
				<cl-icon class="icon" name="cl-icon-arrow-right"></cl-icon>
			</view>

			<view @click="btn('myUi')" class="opt-item">
				<p>我的组件</p>
				<cl-icon class="icon" name="cl-icon-arrow-right"></cl-icon>
			</view>

			<view class="opt-item">
				<p>收货地址</p>
				<cl-icon class="icon" name="cl-icon-arrow-right"></cl-icon>
			</view>

			<view @click="weixinLo" class="opt-item">
				<p>微信登录</p>
				<cl-icon class="icon" name="cl-icon-arrow-right"></cl-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		async created() {
			// let res = await this.$http('GET', 'api/about');
		},
		methods: {
			btn(type) {
				switch (type) {
					case 'myCollect':
						uni.navigateTo({
							url: '/pages/myCollect/myCollect'
						});
						break;
					case 'myUi':
						console.log('111')
						uni.navigateTo({
							url: '/pages/classify/demo'
						});
						break;
					case value:
						break;
					default:
						break;
				}
			}
			// weixinLo() {

			// 	let that = this;
			// 	wx.getUserProfile({
			// 		desc: '业务需要',
			// 		success: data => {
			// 			let bbb = data
			// 			wx.login({
			// 				success: async (res) => {
			// 					const code = res.code;
			// 					const aaa = await that.$http('GET', 'api/wxlogin?code=' + code)
			// 				},
			// 			})
			// 		}
			// 	})

			// }
		}
	};
</script>

<style scoped>
	.head-content {
		width: 400rpx;
		height: 400rpx;
		text-align: center;
		border-radius: 50%;

		overflow: hidden;
		margin: 0 auto;
	}

	.opt-list {}

	.opt-item {
		width: 100%;
		height: 80rpx;

		display: flex;
		justify-content: space-between;
		align-items: center;

		border-bottom: 1px solid #f0f0f0;
	}

	.opt-item p {
		padding-left: 30rpx;
	}

	.opt-item .icon {
		padding-right: 20rpx;
	}
</style>
