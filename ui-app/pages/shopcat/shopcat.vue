<template>
	<view class="page-cart">
		<view class="good-list">
			<view class="good-item" v-for="(v, i) in goodList" :key="i">
				<cl-checkbox-group @change="checkChange('radio', goods)" class="good-check" v-model="goods">
					<cl-checkbox :label="v.id"></cl-checkbox>
				</cl-checkbox-group>

				<view class="good-img">
					<image :src="v.productImg"></image>
				</view>
				<view class="good-name">
					<view class="good-item-name">{{ v.productName || '无' }}</view>
					<view class="good-item-params">{{ v.productTag }}</view>
					<view class="good-item-pic">
						<text>￥</text>
						{{ v.productPrice }}
					</view>
				</view>
			</view>
		</view>

		<view class="footer-all">
			<view class="footer-left">
				
			<cl-checkbox @change="checkChange('all', !allGoods)"  v-model="allGoods">全选</cl-checkbox>
			
			<text @click="del" style="font-size: 24rpx;margin-left:20rpx ;">删除</text>
			</view>
			<view class="footer-right">
				<view class="pic-count">
					<text style="margin-right: 10rpx;">合计:</text>
					{{ sumpic }}
				</view>
				<cl-button type="primary" round><text>结算</text></cl-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allGoods: false,
				goods: [],
				userinfo: {},
				loginInfo: {
					code: '',
					spread_spid: 0,
					spread_code: 0
				},
				goodList: [

				]
			};
		},

		onShow() {
			console.log('页面显示2', )
			
			this.init()
		},


		created() {
			//登录按钮触发的事件
			// this.$forceUpdate();
			uni.getStorage({
				key: this.$config.token,
				complete: function(res) {

					if (!res.data) {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}
				}
			});
			uni.getStorage({
				key: this.$config.userinfo,
				complete: res => {

					this.userinfo = res.data ? JSON.parse(res.data) : uni.navigateTo({
						url: '/pages/login/login'
					});;
					this.init();

				}
			});


		},
		computed: {
			sumpic() {
				return this.goodList.filter(v => this.goods.includes(v.id)).reduce((pre, cur) => Number(pre) + Number(cur
					.productPrice), 0);
			}
		},
		methods: {
			async init() {
				let {
					data
				} = await this.$http('GET', 'api/h5/cart?userId=' + this.userinfo.id);
				this.goodList = data;
			},
			checkChange(type, data) {
				switch (type) {
					case 'radio':
						this.allGoods = data.length == this.goodList.length;
						break;
					case 'all':
						this.goods = data ? this.goodList.map(v => v.id) : [];
						break;
				}
			},
			async del(){
				console.log('del',this.goods);
				
				// return 
				
				let res = await this.$http('GET','api/h5/cart/del',{ids:this.goods.join()})
				
			}
		}
	};
</script>

<style scoped lang="scss">
	.page-cart {
		position: relative;
		// background: #f0f0f0;
	}

	.good-item {
		margin: 20rpx;
		height: 200rpx;
		background-color: #fff;

		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.good-check {
			width: 10%;
			margin-left: 10rpx;
		}

		.good-img {
			width: 30%;
			height: 180rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				// text-align: center;
				margin-top: 15rpx;
				border-radius: 20rpx;
			}
		}

		.good-name {
			width: 55%;
			height: 200rpx;

			margin-right: 30rpx;

			.good-item-name {
				font-weight: 600;
				font-size: 35rpx;
				margin-top: 10rpx;
				
				width: 100%;
				height: 40rpx;
				overflow-y: hidden;
			}

			.good-item-params {
				font-weight: 400;
				font-size: 30rpx;

				margin-top: 35rpx;
			}

			.good-item-pic {
				margin-top: 20rpx;
			}
		}
	}

	.footer-all {
		position: fixed;

		bottom: 0;
		left: 0;

		height: 100rpx;
		width: 100%;
		background-color: #fff;

		display: flex;
		align-items: center;
		justify-content: space-between;

		.footer-left {
			margin-left: 10rpx;
		}

		.footer-right {
			width: 40%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-right: 10rpx;

			.pic-count {
				font-size: 30rpx;
			}
		}
	}
</style>
