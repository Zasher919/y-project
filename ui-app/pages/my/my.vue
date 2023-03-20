<template>
	<view class="my-page">
		<!-- <view class="head-content">
			<image src="../../static/images/test.jpg" mode=""></image>
		</view> -->

		<view class="head-container">
			<view class="left">
				<view class="user-name">
					栗子球Kuriboh
				</view>
				<view class="sign">
					这个人太懒了，到现在还没有简介
				</view>
			</view>
			<view class="right">
				<cl-image src="../../static/images/test.jpg"></cl-image>
			</view>
		</view>

		<view class="data-list">
			<view class="data-item">
				<view class="data-num">
					24
				</view>
				<view class="data-text">
					商品收藏
				</view>
			</view>
			<view class="data-item">
				<view class="data-num">
					24
				</view>
				<view class="data-text">
					店铺关注
				</view>
			</view>
			<view class="data-item">
				<view class="data-num">
					24
				</view>
				<view class="data-text">
					喜欢的内容
				</view>
			</view>
			<view class="data-item">
				<view class="data-num">
					24
				</view>
				<view class="data-text">
					浏览记录
				</view>
			</view>
		</view>

		<view class="my-vip">

			<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>

		</view>


		<view class="my-item-top">
			<view class="item-title">
				我的订单
			</view>

			<view class="item-top-ret">
				全部订单
			</view>
		</view>

		<view class="my-item-list">
			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					待付款
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					待发货
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					待收货
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					退款/售后
				</view>
			</view>

		</view>

		<view class="my-item-top">
			<view class="item-title">
				其他服务
			</view>

			<view class="item-top-ret">
				全部订单
			</view>
		</view>

		<view class="my-item-list">
			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					余额充值
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					分销中心
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					地址管理
				</view>
			</view>

			<view class="item-cart">
				<cl-image class="j-image" src="../../static/images/test.jpg"></cl-image>
				<view class="cart-text">
					客服中心
				</view>
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

<style scoped lang="scss">
	.my-page {
		box-sizing: border-box;
	}

	.head-content {
		width: 400rpx;
		height: 400rpx;
		text-align: center;
		border-radius: 50%;

		overflow: hidden;
		margin: 0 auto;
	}

	.head-container {
		padding: 15px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			.user-name {
				color: #1A1A1A;
				font-size: 22px;
				font-weight: bold;
				margin-bottom: 2px;
			}

			.sign {
				color: #828899;
				font-size: 12px;
				margin-top: 2px;
			}
		}

		.right {

			width: 60px;
			height: 60px;

			image {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				// overflow: hidden;
			}

		}
	}

	.data-list {
		display: flex;
		align-items: center;
		padding-top: 12px;
		padding-bottom: 17px;

		.data-item {
			width: 25%;
			text-align: center;

			.data-num {
				color: #242833;
				font-size: 17px;
				font-weight: bold;
			}

			.data-text {
				color: #828899;
				font-size: 11px;
			}
		}
	}

	.my-vip {
		margin: 0px 20px;
		text-align: center;
		box-shadow: 0px 7px 15px rgba(254, 64, 79, 0.2);
		border-radius: 10px;
		height: 61px;

		.j-image {
			width: 335px;
			height: 61px;
		}
	}


	.my-item-top {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 25px 20px 2px 20px;


		.item-title {
			color: #1A1A1A;
			font-size: 16px;
			font-weight: bold;
		}

		.item-top-ret {
			display: flex;
			align-items: center;
		}
	}

	.my-item-list {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.item-cart {
			text-align: center;
			margin-top: 18px;
			float: left;
			width: 25%;

			.cart-text {
				color: #242833;
				font-size: 12px;
				margin-top: 5px;
			}

			.j-image {
				margin: 0 auto;
				width: 25px !important;
				height: 25px !important;
			}
		}
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
