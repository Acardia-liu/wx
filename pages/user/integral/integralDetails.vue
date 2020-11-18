<template>
	<view>
		<!-- 导航区 -->
		<top-tab :tabIndex="tabIndex" :tabBars="tabBars" @toggleTab="toggleTab"></top-tab>
		<!--内容区-->
		<view>
			<swiper :current="tabIndex" @change="changeTab" :style="{height:swiperHeight+'rpx'}">
				<swiper-item v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper-item">
						<view class="integral-item" v-for="(content,index) in contentList" :key="index">
							<view class="title">
								<text>{{content.type_text}}</text>
								<view class="time">{{content.createtime}}</view>
							</view>
							<view class="points">{{content.points}}个</view>
						</view>
						
						<view class="no-data" v-show="isShow">
							<image src="/static/images/user/wallet/nomoreData.png"></image>
							<view>没有更多数据了</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
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
				isShow:false,
				tabIndex:0,
				page:1,//当前页
				swiperHeight:1000,
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
		
		onLoad() {
			this.getIntegralList(this.tabIndex,this.page)
		},

		methods: {
			//获取积分明细信息
			getIntegralList(index,page){
				let tempIndex
				if(index==0){
					tempIndex=-1
				}else{
					tempIndex=index
				}
				
				let that=this
				
				this.$request.send(
					'vip/User/getIntegralList', {
						current_page: page,
						page_size: 10,
						data_type: tempIndex
					},
					data => {
						if (data.code == 1) {
							if(data.data.list.length==0){
								that.contentList = []
								that.isShow = true
							}else{
								that.contentList = data.data.list
							}
							
							//页码数大于1时，定义swiper高度
							if(that.contentList.length>=7){
								that.swiperHeight=that.contentList.length*170+150
							}else{
								uni.getSystemInfo({
									success(res){
										that.swiperHeight= (res.windowHeight-51)*2
									}
								})
							}
						}
					}
				)
			},
			
			//导航栏点击滑块触发
			toggleTab(index){
				this.tabIndex=index
				this.getIntegralList(this.tabIndex,this.page)
			},
			
			//内容区滑动改变swiper
			changeTab(e){
				console.log(e);
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
			}
	
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F0F0;
	}

	.swiper-item{
		background-color: #f0f0f0;
		padding: 30rpx 30rpx 0;
		height: 100%;
		
		.integral-item{
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 32rpx;
			margin-bottom: 30rpx;
			display: flex;
			
			.title{
				line-height: 50rpx;
				font-size: 28rpx;
				color: #1d2023;
				width: 50%;
				
				.time{
					font-size: 26rpx;
					color: #606972;
				}
			}
			
			.points{
				text-align: right;
				font-size: 28rpx;
				color: #1d2023;
				margin-top: 30rpx;
				width: 50%;
			}
		}
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
