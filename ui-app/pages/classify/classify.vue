<template>
	<view class="box-content">
		<view class="box-left">
			<view class="left-item" :class="leftIndex === index ? 'item-active' : ''"
				@click="btnClick('leftEnvClick', index)" v-for="(item, index) in leftList" :key="index">
				{{ item }}
			</view>
		</view>

		<view class="box-right">
			<view class="right-head-swiper">
				<cl-swiper :list="imgList" height="100%" radius="10px" :autoplay="true"> </cl-swiper>
			</view>

			<view class="item-list">
				<view class="right-item" v-for="item in rightList" :key="item.key">
					<view class="item-name">
						{{ item.name }}
					</view>

					<view class="children-list" v-for="dump in item.children" :key="dump.key">

						<view class="children-item-img">
							<cl-image :src="dump.imgUrl" :size="['65px','65px']"></cl-image>
						</view>
						<view class="children-item-name">
							{{ dump.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftIndex: 0,
				imgList: ['http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
					'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png'
				],
				leftList: [
					"推荐分类",
					"生活超市",
					"手机数码",
					"家用电器",
					"玩具乐器",
					"家具加装",
					"美妆护肤",
				],
				rightList: [{
						name: '常用分类',
						key: '1',
						children: [{
							key: '1-1',
							imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
							name: '测试产品'
						}]
					},
					{
						name: '专场推荐',
						key: '2',
						children: [{
								key: '2-1',
								imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
								name: '测试产品'
							},
							{
								key: '2-2',
								imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
								name: '测试产品'
							}
						]
					},
					{
						name: '热门分类',
						key: '3',
						children: [{
								key: '3-1',
								imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
								name: '测试产品'
							},
							{
								key: '3-2',
								imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
								name: '测试产品'
							},
							{
								key: '3-3',
								imgUrl: 'http://localhost:7788/uploads/536e8a5c35ed932e1fd1484cebb5a0231678691736008.png',
								name: '测试产品'
							}
						]
					},


				]
			};
		},

		onShareAppMessage() {
			return {
				title: `简单易用的uni-app组件库`,
				path: '/pages/index/index'
			};
		},

		methods: {
			btnClick(type, data = null) {

				switch (type) {
					case 'leftEnvClick':
						this.leftIndex = data
						break;
					default:
						break;
				}
			}
		}
	};
</script>

<style lang="scss">
	.box-content {
		display: flex;
		height: 100vh;
		width: 100%;
		margin-right: 20px;
		// overflow: hidden;

		// background-color: pink;
		.box-left {
			height: 100%;
			width: 116px;
			background-color: #F6F5F5;

			.left-item {
				display: flex;
				height: 46px;
				align-items: center;
				justify-content: center;
				color: #333333;
				font-size: 14px;
				width: 116px;
				position: relative;
			}

			.item-active {
				color: #333333 !important;
				font-size: 16px !important;
				font-weight: 600;
				background-color: #fff !important;
				margin-right: 2px;
			}
		}

		.box-right {
			height: 100%;
			width: 259px;
			background-color: #fff;

			.right-head-swiper {
				margin: 10px;
				padding: 15px 16px 3px 16px;
				height: 77px;
				width: 220px;
			}

			.item-list {
				.right-item{
					display: block;
					height: 135px;
				}
				.item-name {
					padding: 18px 17px 0px 17px;
					color: #333333;
					font-size: 14px;
					font-weight: bold;
				}

				.children-list {
					text-align: center;
					margin: 13px 8px 0px 8px;
					float: left;

					

					.children-item-name {
						color: #333333;
						font-size: 12px;
					}
				}

			}


		}
	}
</style>
