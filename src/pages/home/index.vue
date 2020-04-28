<template>
	<view class="page-wrapper">
		<view v-if="supportedWxSdk" class="content animated fadeInUp">
			<image
				class="logo"
				src="https://hh-oss-html.miyapay.com/hhops/picture/15770813092372b16d3e25eb7"
			/>
			<view class="title">欢迎登录</view>
		</view>
		<view v-if="supportedWxSdk" class="slogan">
			<view class="xian"></view>
			<view class="title">this is title</view>
			<view class="xian"></view>
		</view>
		<view v-else>
			<text>当前微信客户端较低，请升级至微信最新版本 ~</text>
		</view>
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
import Config from '../../config/base.config.js'
import util from '../../lib/utils.js'
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState(['system', 'user']),
		supportedWxSdk: function () {
			return util.versionCompare(this.system.SDKVersion, Config.supportWxSDKVersion)
		}
	},
	onLoad() {
		
	},
	methods: {

	}
}
</script>

<style lang="scss">
.page-wrapper {
	min-height: 100vh;
	position: relative;
	.content {
		text-align: center;
		.logo {
			height: 208rpx;
			width: 208rpx;
			margin-top: 138rpx;
		}

		.title {
			font-size: 32rpx;
			color: rgba(51, 51, 51, 0.8);
			line-height: 44rpx;
			letter-spacing: 2rpx;
		}
	}
	.slogan {
		width: 100%;
		position: absolute;
		bottom: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30rpx;
		.title {
			font-size: 28rpx;
			color: rgba(51, 51, 51, 0.4);
			line-height: 40rpx;
			letter-spacing: 1rpx;
			margin: 0 20rpx;
		}
		.xian {
			flex: 1;
			background-color: rgba(151, 151, 151, 0.4);
			height: 2rpx;
		}
	}
}
</style>
