<script>
	export default {
		onLaunch: function() {
			// 初始化网络监听
			uni.onNetworkStatusChange((res) => {
				if (!res.isConnected) {
					uni.showToast({
						title: '网络断开了，请重新连接',
						duration: 5000
					})
				}
			})
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>
<style lang="scss">
	/*每个页面公共css */
	page {
		background: #ffffff;
	}

	.f7f7f7 {
		// 微信默认背景色
		background: #f7f7f7;
	}

	view {
		box-sizing: border-box;
	}

	.page-wrapper {
		width: 100%;
		height: 100%;
	}

	.text_overflow {
		/* 超出一行 */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.over_two_lines {
		/* 超出两行 */
		display: -webkit-box;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre-line;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.clearfix {
		zoom: 1;

		&:after {
			height: 0;
			overflow: hidden;
			display: block;
			content: '';
			clear: both;
		}
	}
	
	button::after {
		border: none;
	}

</style>