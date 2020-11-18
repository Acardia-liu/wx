<template>
	<view>
		<top-tab :tabIndex="tabIndex" :swiperHeight="swiperHeight" 
		:contentList="contentList" :tabBars="tabBars"></top-tab>
		<view class="no-data">
			<image src="/static/images/user/wallet/nomoreData.png"></image>
			<view>没有更多数据了</view>
		</view>
	</view>
</template>

<script>
	import topTab from '@/components/top-tab/top-tab.vue'
	export default {
		components: {
			"top-bar": topTab
		},
		data() {
			return {
				tabIndex:0,
				swiperHeight:1,
				contentList:[],//数据列表
				tabBars: [{
					name: "全部",
					id:0
				}, {
					name: "收入",
					id:1
				}, {
					name: "支出",
					id:2
				}]
			};
		},

		methods: {
		
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.no-data{
		height: 368rpx;
		text-align: center;
		padding: 200rpx 0 20rpx;
		
		image{
			width: 242rpx;
			height: 160rpx;
		}
		
		view{
			opacity: 0.5;
		}
	}
</style>
