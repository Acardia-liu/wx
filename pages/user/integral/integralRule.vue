<template>
	<view class="integral-rule">
		{{integralRule}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integralRule:''
			};
		},
		
		onLoad(options) {
			let data = JSON.parse(options.current)
			this.integralRule=data.data.content
		}
	}
</script>

<style lang="scss">
.integral-rule{
	font-size: 26rpx;
	color: #333333;
	background-color: #FFFFFF;
	padding: 20rpx;
	line-height: 45rpx;
	font-weight: 400;
}
</style>
