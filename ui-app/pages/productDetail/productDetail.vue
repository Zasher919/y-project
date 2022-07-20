<template>
	<view class="page-detail">
		<view class="head-img"><image :src="info.pic" mode=""></image></view>

		<view class="content">
			<view class="content-head">
				<view class="content-price">
					<text>￥</text>
					{{ info.price || 0 }}
				</view>

				<view @click="btn('collect')" class="content-sc">
					<!-- <text style="color: black;">收藏</text> -->

					<cl-icon :size="40" :name="!isIcon ? 'cl-icon-like' : 'cl-icon-like-fill'"></cl-icon>
				</view>
			</view>

			<view class="content-name">{{ info.name }}</view>

			<view class="content-describe" v-html="info.content"></view>
		</view>

		<view class="footer">
			<view class="left-content">
				<cl-icon class="z-icon" :size="40" name="cl-icon-friend"></cl-icon>

				<text>客服</text>
			</view>
			<view class="right-content">
				<cl-button @click="btn('addCart')" class="z-btn" type="primary" round>加入购物车</cl-button>

				<cl-button @click="btn('toPay')" class="z-btn" type="primary" round>立即购买</cl-button>
			</view>
		</view>

		<cl-toast ref="toast"></cl-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			isIcon: false,
			loginInfo: {},
			userinfo: {}
		};
	},
	onLoad(option) {
		console.log(option);
		this.init(option.id);
	},
	created() {
		uni.getStorage({
			key: this.$config.userinfo,
			complete: async res => {
				this.userinfo = res.data ? JSON.parse(res.data) : '';
				if (!res.data) {
					this.$refs['toast'].open({
						position: 'middle',
						message: '请先登录'
					});
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						});
					}, 1000);
				}
			}
		});
		// this.init();
		// /api/products/d849131c-dcf7-4f89-8b0a-ba538c1f3b59
	},
	methods: {
		async init(id) {
			this.info = await this.$http('GET', 'api/products/' + id);
			this.info = {
				...this.info,
				pic: this.$config.baseUrl + this.info.pic
			};

			this.info.pic = this.info.pic.split('\\').join('/');
			console.log(this.info, 'info');
		},
		async btn(type) {
			let submitFrom = {};

			console.log(this.userinfo, 'userinfo');
			switch (type) {
				case 'addCart':
					this.isIcon = !this.isIcon;
					submitFrom = {
						userId: user.id,
						productId: this.info.id,
						productName: this.info.name,
						productImg: this.info.pic || '无',
						productPrice: this.info.price || 0,
						productTag: this.info.productTag || '无',
						isCollect: this.isIcon
					};

					console.log(submitFrom);
					let { code } = await this.$http('POST', 'api/h5/cart/add', submitFrom);
					if (code == 200) {
						this.$refs['toast'].open({
							position: 'middle',
							message: '添加成功'
						});
					}
					break;
				case 'toPay':
					break;
				case 'collect':
					this.isIcon = !this.isIcon;
					submitFrom = {
						userId: this.userinfo.id,
						productId: this.info.id,
						isCollect: this.isIcon ? 1 : 0,
						productName: this.info.name,
						productImg: this.info.pic || '无',
						productPrice: this.info.price || 0,
						productTag: this.info.productTag || '无'
					};

					let res = await this.$http('POST', 'api/h5/cart/collect', submitFrom);
					if (res.code == 200) {
						this.$refs['toast'].open({
							position: 'middle',
							message: this.isIcon ? '收藏成功' : '取消收藏'
						});
					}
					break;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.head-img {
	width: 100%;
	height: 500rpx;
	image {
		display: inline-block;
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		// height: 500rpx;
		text-align: center;
	}
}

.content {
	height: 180rpx;
	margin: 10rpx;

	background-color: #f0f0f0;
	border-radius: 20rpx;
	margin-top: 40rpx;
	.content-head {
		height: 60rpx;
		line-height: 60rpx;

		color: #f2270c;
		display: inline-block;
		font-family: JDZH-Regular;

		display: flex;
		justify-content: space-between;
		.content-price {
			margin-left: 20rpx;
		}

		.content-sc {
			margin-right: 20rpx;
		}
	}

	.content-name {
		padding: 10rpx;
		margin-top: 20rpx;
		font-weight: 700;
		line-height: 42rpx;
		color: #262626;
		font-size: 16px;
		font-family: inherit;
	}
}

.content-describe {
	margin-top: 40rpx;
}

.footer {
	position: fixed;

	bottom: 0;
	left: 0;

	height: 120rpx;
	width: 100%;
	background-color: #fff;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.left-content {
		margin-left: 40rpx;

		.z-icon {
			display: block;
			margin-left: 6rpx;
		}

		text {
			font-size: 30rpx;
		}
	}

	.right-content {
		width: 55%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 10rpx;

		.z-btn {
			width: 200rpx;
			height: 80rpx;
		}
	}
}
</style>
