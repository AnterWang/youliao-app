<template>
	<view class="page-wrapper">
		
	</view>
</template>

<script>
import {
	mapState,
	mapMutations
} from 'vuex';
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState(['system', 'user']),
	},
	onLoad() {

	},
	onShow() {
		uni.hideHomeButton()
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
.page-wrapper {
	min-height: 100vh;
	position: relative;
	
}
</style>
