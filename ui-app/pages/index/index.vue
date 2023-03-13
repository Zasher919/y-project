<template>
	<view>
		
		<view class="head-content">
			<view class="content">
				<cl-input
					v-model="queryValue"
					round
					placeholder="3C数码"
					prefix-icon="cl-icon-search"
					@prefix-icon-tap="queryChcange"
				></cl-input>
			</view>
			
			<view class="swiper-box">
				<cl-swiper :list="imgList" :autoplay="true"> </cl-swiper>
			</view>
		</view>

	

		<view class="d-flex icon-list">
			<view class="icon-item" v-for="(item, index) in iconList" :key="index">

				<image @click="iconBtn(index)" :src="item.url"></image>
				<view>{{ item.name }}</view>


			</view>
		</view>

		<view class="d-flex product-list">
			<view @click="btnClick('detail', v)" class="product-item" v-for="(v, i) in goodList" :key="i">
				<image :src="v.url" mode=""></image>
				<view class="goods-title">{{ v.name }}</view>

				<view class="item-footer">
					<view class="goods-re">
						￥<text>279.0</text>
					</view>
					<view class="nums">482人付款</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		indexList,
		indexImgList
	} from '@/api/api.js'
	import {
		baseUrl
	} from '@/utils/config.js'
	export default {
		data() {
			return {
				queryValue:'',
				isPay: false,
				active: 'home',
				imgList: [],
				goodList: [],
				iconList: [{
						url: '../../static/sy-icon/cs.png',
						name: '超市'
					},
					{
						url: '../../static/sy-icon/cz.png',
						name: '充值'
					},
					{
						url: '../../static/sy-icon/lq.png',
						name: '礼券'
					},
					{
						url: '../../static/sy-icon/sx.png',
						name: '蔬菜'
					},
					{
						url: '../../static/sy-icon/wl.png',
						name: '物流'
					},
					{
						url: '../../static/sy-icon/cs.png',
						name: '超市'
					},
					{
						url: '../../static/sy-icon/cz.png',
						name: '充值'
					},
					{
						url: '../../static/sy-icon/lq.png',
						name: '礼券'
					},
					{
						url: '../../static/sy-icon/sx.png',
						name: '蔬菜'
					},
					{
						url: '../../static/sy-icon/wl.png',
						name: '物流'
					},
				],
				list: ['/static/images/banner1.png', '/static/images/banner2.png', '/static/images/banner3.png']
			};
		},
		onShow() {
			console.log('页面显示1')
			// this.init();
		},

		created() {
			this.init();
		},
		methods: {
			async init() {
				let productList = await indexList()
				let imgList = await indexImgList()
				this.productListDispose(productList)
				this.imgListDipose(imgList)
			},
			imgListDipose({
				data
			}) {
				this.imgList = data
					.filter(v => v.imgType === "2")
					.map(v => ({
						...v,
						url: baseUrl + v.imgUrl
					}))
					.map(v =>
						v.url.split('\\').join('/')
					)

				console.log('this.imgList', this.imgList);

			},
			productListDispose({
				data
			}) {
				this.goodList = data
					.map(v => ({
						...v,
						url: baseUrl + v.pic
					}))
					.map(v => ({
						...v,
						url: v.url.split('\\').join('/')
					}));

				console.log(this.goodList, 'this.goodList');
			},
			queryChcange(val){
				console.log('val->',123);
			},
			iconBtn(index) {
				console.log('index', index);

				if (index === 9) {
					// this.getUserInfo()
					this.isPay = true
				}
			},
			btnClick(type, data) {
				switch (type) {
					case 'detail':
						uni.navigateTo({
							url: '/pages/productDetail/productDetail?id=' + data.id
						});
						break;
					case value:
						break;
					case value:
						break;
					case value:
						break;
					case value:
						break;
				}
			},

			async getImgs() {
				let {
					code,
					data
				} = await http('GET', 'api/img');
				this.imgList = data
					.filter(v => v.imgType == 2)
					.map(v => ({
						...v,
						url: this.$config.baseUrl + v.imgUrl
					}))
					.map(v => ({
						...v,
						url: v.url.split('\\').join('/')
					}));
			},
			async getGoods() {
				let {
					data
				} = await http('GET', 'api/products');
				this.goodList = data
					.map(v => ({
						...v,
						url: this.$config.baseUrl + v.pic
					}))
					.map(v => ({
						...v,
						url: v.url.split('\\').join('/')
					}));

				console.log(this.goodList, 'this.goodList');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.head-content{
		width: 100%;
		margin: auto;
		// background-color: palevioletred;
		.content{
			width: 96%;
			margin: 10px auto 0;
		}
		
		.swiper-box {
			margin: 10px;
		}
	}
	

	.d-flex {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.icon-list {
		margin-top: 20rpx;

		.icon-item {
			width: 20%;
			padding: 10rpx 0;
			height: 112rpx;
			text-align: center;

			image {
				display: inline-block;
				width: 50%;
				height: 70%;
			}

			view {
				text-align: center;
				height: 30%;

				font-size: 26rpx;
			}
		}
	}

	.product-list {
		margin-top: 40rpx;

		.product-item {
			box-sizing: border-box;
			width: 50%;
			text-align: center;
			padding: 10px;


			image {
				border-radius: 10px;
				width: 100%;
				height: 176px;
			}

			p {
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				overflow: hidden;
			}

			.goods-title {
				padding: 9rpx 18rpx;
				color: #323332;
				font-size: 28rpx;
				text-align: left;
			}

			.item-footer {

				padding: 15rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.goods-re {
					color: #FB2B1C;
					font-size: 24rpx;

					text {
						font-size: 34rpx;
						font-weight: 600;
					}
				}

				.nums {
					color: #999999;
					font-size: 22rpx;
				}

			}
		}
	}
</style>
