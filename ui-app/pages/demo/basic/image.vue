<template>
	<view class="demo-image">
		<cl-card label="裁剪模式">
			<cl-row>
				<cl-col span="8" v-for="(item, index) in mode" :key="index">
					<view class="block">
						<cl-image size="150rpx" :mode="item" :src="url.mode"> </cl-image>
						<text>{{ item }}</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="占位内容">
			<cl-row>
				<cl-col span="8">
					<view class="block">
						<cl-image size="150rpx" src="http://"> </cl-image>
						<text>加载失败</text>
					</view>
				</cl-col>

				<cl-col span="8">
					<view class="block">
						<cl-image size="150rpx"> </cl-image>
						<text>未填写地址</text>
					</view>
				</cl-col>

				<cl-col span="8">
					<view class="block">
						<cl-image size="150rpx" :src="url.placeholder">
							<view class="placeholder" slot="error">
								<cl-button type="primary" size="mini" round @tap="changeImage">
									<text>替换</text>
								</cl-button>
							</view>
						</cl-image>
						<text>自定义</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="可预览">
			<cl-row>
				<cl-col span="8">
					<view class="block">
						<cl-image size="150rpx" :src="url.avatar" :preview-list="[url.avatar]">
						</cl-image>
						<text>单图</text>
					</view>
				</cl-col>
				<cl-col span="8">
					<view class="block">
						<cl-image
							size="150rpx"
							:src="url.avatar"
							:preview-list="[url.avatar, url.mode]"
						>
						</cl-image>
						<text>多图</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="其他">
			<cl-row>
				<cl-col span="8">
					<view class="block">
						<cl-image :size="150" :src="url.avatar"> </cl-image>
						<text>直角</text>
					</view>
				</cl-col>
				<cl-col span="8">
					<view class="block">
						<cl-image :size="150" round :src="url.avatar"> </cl-image>
						<text>圆角</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>

		<cl-card label="自定义大小">
			<cl-row>
				<cl-col span="6">
					<view class="block">
						<cl-image :size="100" :src="url.avatar"> </cl-image>
						<text>100 * 100</text>
					</view>
				</cl-col>
				<cl-col span="12">
					<view class="block">
						<cl-image :size="[100, 200]" mode="aspectFill" :src="url.avatar">
						</cl-image>
						<text>100 * 200</text>
					</view>
				</cl-col>
			</cl-row>
		</cl-card>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mode: ["scaleToFill", "aspectFit", "aspectFill", "heightFix", "widthFix"],
			url: {
				placeholder: "http://",
				mode:
					"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2419550195,2445223670&fm=26&gp=0.jpg",
				avatar: "https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/avatar.jpeg"
			}
		};
	},

	methods: {
		changeImage() {
			uni.chooseImage({
				success: res => {
					debugger
					this.url.placeholder = res.tempFilePaths[0];
				}
			});
		}
	}
};
</script>

<style lang="scss">
.demo-image {
	.block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 30rpx;

		text {
			margin-top: 10rpx;
			font-size: 26rpx;
		}

		.placeholder {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			background-color: #eee;
		}
	}
}
</style>
