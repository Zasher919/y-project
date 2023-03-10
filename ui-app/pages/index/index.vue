<template>
	<view>
		<view class="swiper-box">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="3000"
					:duration="500">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<view class="swiper-item uni-bg-red">
							<image style="width: 100%;" :src="item.url" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="d-flex icon-list">
			<view class="icon-item" v-for="(item, index) in iconList" :key="index">

				<image @click="iconBtn(index)" :src="item.url"></image>
				<view>{{ item.name }}</view>


			</view>

			<!-- <view class="icon-item"> -->
			<!-- 	<image src="../../static/sy-icon/cz.png"></image>
				<view>充值</view>
			</view>

			<view class="icon-item">
				<image src="../../static/sy-icon/lq.png"></image>
				<view>礼券</view>
			</view>

			<view class="icon-item">
				<image src="../../static/sy-icon/sx.png"></image>
				<view>蔬菜</view>
			</view>

			<view class="icon-item">
				<image src="../../static/sy-icon/wl.png"></image>
				<view>物流</view>
			</view> -->
		</view>

		<view class="d-flex product-list">
			<view @click="btnClick('detail', v)" class="product-item" v-for="(v, i) in goodList" :key="i">
				<image :src="v.url" mode=""></image>
				<p>{{ v.name }}</p>
			</view>

			<!-- <view class="product-item"></view> -->
		</view>

		<!-- <img src="http://localhost:7788/uploads/68395781f3ff89e45d8be05a410bac601655890761396.jpg" alt="" srcset=""> -->
		<!-- <cl-image size="150rpx" v-for="(item,index) in imgList" :key="index" :src="item.url" mode="aspectFill">

		</cl-image> -->
		
		<pay v-if="isPay" />
	</view>
</template>

<script>
	import http from '@/common/utlis/request.js';
	import { indexList } from '@/api/api.js'
	// import require from 'require'
	export default {
		data() {
			return {
				isPay:false,
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

			this.init();
		},

		created() {
			this.init();
			this.initTwo()
			console.log(this.$config.baseUrl, 'this.$config.baseUrl');
		},
		methods: {
			async initTwo(){
				let res = await indexList()
			},
			async init() {
				this.getImgs(); // 取首页图
				this.getGoods(); // 产品
			},
			iconBtn(index) {
				console.log('index', index);
				
				if(index === 9){
					// this.getUserInfo()
					this.isPay = true
				}
			},
				getUserInfo() {
					return new Promise((resolve, reject) => {
						uni.getUserProfile({
							lang: 'zh_CN',
							desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
							success: (res) => {
								console.log(res, 'resss')
								resolve(res.userInfo)
							},
							fail: (err) => {
								reject(err)
							}
						})
					})
				},
						
				getLogin() {
					return new Promise((resolve, reject) => {
						uni.login({
							success(res) {
								console.log(res, 'res')
								resolve(res)
							},
							fail: (err) => {
								console.log(err, 'logoer')
								reject(err)
							}
						})
					})
				},
			 
			   weixinLogin() {
					let that = this;
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
						   //支持微信、qq和微博等
						   if (~res.provider.indexOf('weixin')) {
								console.log(res, 'ress')
								let userInfo = that.getUserInfo();
								let loginRes = that.getLogin();
								Promise.all([userInfo, loginRes]).then((result) =>{
									let userInfo = result[0];
									let loginRes = result[1];
									let access_token = loginRes.authResult.access_token;
									let openid = loginRes.authResult.openid;
									let data = Object.assign(loginRes.authResult, userInfo);
									that.$store.dispatch('Login', {
											type: 'weixin',
											url: that.url,
											data
									}).then(r => {
											if (r == 'ok') {
												uni.hideLoading()
											}
											}).catch(err => {
												uni.hideLoading();
												uni.showToast({
												icon: 'none',
												title: err
											})
										})
									})
			 
									}
								},
					   fail: function(err) {
							uni.hideLoading();
							uni.showToast({
							icon: 'none',
							title: err
							})
						}
				})
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
	.d-flex {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	// .swiper-box{
	// height: 240rpx;
	// }

	.icon-list {
		margin-top: 20rpx;

		.icon-item {
			width: 20%;

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
			height: 200rpx;
			// border: 1px solid black;

			text-align: center;
			padding: 10rpx;

			image {
				width: 100%;
				height: 70%;
			}

			p {
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				overflow: hidden;
			}

			// margink;
			// margin-left: -2px;
		}

		// .product-item::nth-child(odd) {
		// 	border-left: 1px solid black;
		// }

		// .z-suang{
		// 	// background-color: red;
		// 	border-left: -1px solid black;
		// }
	}
</style>
