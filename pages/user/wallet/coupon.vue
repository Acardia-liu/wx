<template>
	<view>
		<!-- 导航区 -->
		<top-tab :tabIndex="tabIndex" :tabBars="tabBars" @toggleTab="toggleTab"></top-tab>
		
		<!--内容区-->
		<view>
			<swiper :current="tabIndex" @change="changeTab" :style="{height:swiperHeight+'rpx'}">
				<swiper-item v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper-item">
						<view class="coupon-item" v-for="(content,index) in contentList" :key="index">
							<view class="up">
								<view class="coupon-status">
									<view class="status-value">兑</view>
								</view>
								<view class="text">
									<view class="txt-up">
										<span class="bg">
											{{content.type_text}}
										</span>
										{{content.title}}
									</view>
									<view class="txt-down">有效期至：{{content.expiration_date_text}}</view>
								</view>
								<view class="img"><image src="/static/images/user/wallet/expired.png"></image></view>
							</view>
							<view class="down">{{content.use_prompt}}</view>
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
				swiperHeight:1145,
				contentList:[],//数据列表
				tabBars: [{
					name: "未使用（0）",
					id:0
				}, {
					name: "已使用（0）",
					id:1
				}, {
					name: "已过期（1）",
					id:2
				}]
			};
		},
		
		onLoad() {
			this.getCouponList(this.tabIndex,this.page)
		},
		
		methods:{
			//获取优惠券信息
			getCouponList(index,page){
				let tempIndex
				if(index==0){
					tempIndex=-1
				}else{
					tempIndex=index
				}
				
				let that=this
				
				this.$request.send(
					'vip/User/getUserCouponList', {
						current_page: page,
						page_size: 10,
						data_type: tempIndex
					},
					data => {
						if (data.code == 1) {
							if(data.data.page_data_list.list.length==0){
								that.contentList = []
								that.isShow = true
							}else{
								that.contentList = data.data.page_data_list.list
								that.isShow = false
							}
							
							//页码数大于1时，定义swiper高度
							/* if(that.contentList.length>=7){
								that.swiperHeight=that.contentList.length*170+150
							}else{
								uni.getSystemInfo({
									success(res){
										that.swiperHeight= (res.windowHeight-51)*2
									}
								})
							} */
						}
					}
				)
			},
			
			//导航栏点击滑块触发
			toggleTab(index){
				this.tabIndex=index
				this.getCouponList(this.tabIndex,this.page)
			},
			
			//内容区滑动改变swiper
			changeTab(e){
				//console.log(e);
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
			}
		}
	}
</script>

<style lang="scss">
	.swiper-item{
		background-color: #f0f0f0;
		padding: 30rpx 30rpx 0;
		height: 100%;
		
		.coupon-item{
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			
			.up{
				display: flex;
				flex-wrap: nowrap;
				
				.coupon-status{
					width: 185rpx;
					height: 173rpx;
					background-color: #bbbbbb;
					color: #FFFFFF;
					text-align: center;
					border-right: 8rpx dashed #FFFFFF;
					border-radius: 10rpx 0 0 0;
					
					.status-value{
						line-height: 173rpx;
						font-size: 36rpx;
					}
				}
				
				.text{
					width: 330rpx;
					height: 173rpx;
					
					.txt-up{
						font-size: 28rpx;
						color: #333333;
						line-height: 50rpx;
						margin-left: 20rpx;
						margin-top: 20rpx;
						font-weight: bold;
						
						.bg{
							background-color: #0081FF;
							color: #FFFFFF;
							width: 90rpx;
							height: 36rpx;
							border-radius: 50rpx;
							font-size: 24rpx;
							margin-right: 20rpx;
							padding: 5rpx;
						}
						
					}
					
					.txt-down{
						font-size: 24rpx;
						color: #606972;
						margin-left: 20rpx;
					}
				}
				
				.img{
					width: 166rpx;
					height: 173rpx;
					text-align: center;
					
					image{
						width: 96rpx;
						height: 96rpx;
						margin-top: 30rpx;
					}
				}
			}
			
			.down{
				padding: 20rpx 32rpx;
				font-size: 26rpx;
				color: #666666;
				height: 48rpx;
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
