<template>
	<view>
		<!--顶部导航栏-->
		<view class="uni-tab-bar">
			<scroll-view scroll-x >
				<view class="uni-swiper-tab">
					<block v-for="(tabBar,index) in tabBars" :key="index">
						<view class="swiper-tab-list" :class="{'active': selectedIndex==index}" @tap="tabToggle(index)">
							{{tabBar.name}}
							<view class="swiper-tab-line"></view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"topTab",
		
		props:{
			//选中标签栏的索引
			tabIndex:{
				type:Number,
				default:0
			},
			
			//导航栏标签内容
			tabBars:{
				type:Array,
				default:[
					{
						name: '标签1',
						id: '1'
					},
					{
						name: '标签2',
						id: '2'
					},
					{
						name: '标签3',
						id: '3'
					},
					{
						name: '标签4',
						id: '4'
					},
					{
						name: '标签5',
						id: '5'
					},
					{
						name: '标签6',
						id: '6'
					}
				]
			}
		},
		
		data() {
			return {
				selectedIndex:0 //被选中的标签索引
			}
		},
		
		components:{
			
		},
		onLoad() {
			
		},
		methods: {
			//导航栏点击滑块触发
			tabToggle(index){
				this.selectedIndex = index
				this.$emit("toggleTab",this.selectedIndex)
			}
		}
	}
</script>

<style>
	.swiper-tab-list {
		width: 100%;
		color: #969696;
		background-color: #FFFFFF;
		font-weight: normal;
	}
	.uni-tab-bar .active{
		color: #343434;
	}
	
	.active .swiper-tab-line {
		width: 84rpx;
		margin: auto;
		border-radius: 20rpx;
		border-bottom: 6rpx solid #007AFF;
		border-top: 6rpx solid #007AFF;
	}
	.uni-swiper-tab{
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #eeeeee;
	}
</style>