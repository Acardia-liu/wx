<template>
	<view>
		<!--顶部导航栏-->
		<view class="uni-tab-bar">
			<scroll-view scroll-x class="uni-swiper-tab">
				<block v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper-tab-list" :class="{'active': tabIndex==index}" @tap="toggleTab(index)">
						{{tabBar.name}}
						<view class="swiper-tab-line">
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<!--内容区-->
		<view class="uni-tab-bar">
			<swiper :current="tabIndex" @change="tabChange" :style="{height:swiperHeight+'rpx'}">
				<swiper-item v-for="(tabBar,index) in tabBars" :key="index">
					<view class="swiper-item">
						<view class="act_item" v-for="(content,index) in contentList" :key="index" @click="toActivityDetails(content.order_id,content.activity_id)">
							<image :src="content.cover_img_show"></image>
							<view class="right">
								<view class="tit">
									{{content.activity_name}}
								</view>
								<view class="info">
									<image src="/static/images/activity/shijian.png"></image>
									<text>报名时间：{{content.create_time}}</text>
								</view>
								<view class="act-status" :style="{'background-color':statusColor[content.activity_status]}">
									<span class="font">
									{{content.activity_status_txt}}
									</span>
								</view>
							</view>
						</view>
						<view class="isOver" v-if="flag">--------没有更多信息了--------</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,//当前第几页
				totalPages:null,
				tabIndex: 0, //选中标签栏的序列
				contentList: [],//页面内容
				flag:false,
				statusColor:{
					"4":"#969799",//已结束
					"3":"#008DFF",//进行中
					"0":"#FF9800",//待付款
					"1":"#F2826A",//待审核
					"6":"#969766",//被驳回
					"5":"#969766" //已取消
				},
				tabBars: [
					{
						name: '全部',
						id: 'tab01'
					},
					{
						name: '待付款',
						id: 'tab02'
					},
					{
						name: '待审核',
						id: 'tab03'
					},
					{
						name: '未开始',
						id: 'tab04'
					},
					{
						name: '进行中',
						id: 'tab05'
					},
					{
						name: '已结束',
						id: 'tab06'
					},
					{
						name: '已取消',
						id: 'tab07'
					}
				],
				swiperHeight: 2000
			}
		},
		
		components: {
		},

		onLoad(option) {
			this.tabIndex=option.index
			this.page=option.page
			this.getActivityList(this.tabIndex,this.page)
		},
		
		onPullDownRefresh(){
			console.log("下拉刷新了")
			this.page=1
			//this.contentList=[]
			this.flag=false
			setTimeout(()=>{
				this.getActivityList(this.tabIndex,this.page)
			},1000)
		},

		onReachBottom() {
			console.log("触底了")
			/* if(this.contentList.length==0){
				return this.flag=true
			}else{
				this.getActivityList(this.tabIndex,this.page)
			} */
			if(this.page>this.totalPages){
				return this.flag=true
			}
			this.getActivityList(this.tabIndex,this.page)
		},
		
		methods: {
			//点击触发顶部导航
			toggleTab(index) {
				//console.log(index)
				this.contentList=[]
				this.flag=false
				this.tabIndex = index
				this.getActivityList(this.tabIndex,1)
			},

			//左右滑动切换swiper
			tabChange(e) {
				//console.log(e.detail)
				const tabIndex = e.detail.current
				this.tabIndex = tabIndex
			},
			
			//进入活动详情
			toActivityDetails(order_id,activity_id){
				uni.navigateTo({
					url:"/pages/user/activity/activityDetails?order_id="+order_id+"&activity_id="+activity_id
				})
			},
			
			//获取活动列表信息
			getActivityList(tabIndex,pageIndex){
				console.log("获取活动列表信息")
				this.page++;
				uni.showLoading({
					title: this.$t('loading')
				});
				
				this.$request.send(
					'vip/UserActivity/getList', {
						current: pageIndex,
						status:tabIndex
					},
					data => {
						if (data.code == 1) {
							console.log(data)
							//下拉刷新时
							if(this.page==2){
								this.contentList = data.data.list
							}else{
								this.contentList = [...this.contentList,...data.data.list]
							}
							
							//页码数大于1时，定义swiper高度
							if(this.contentList.length>=6){
								this.swiperHeight=this.contentList.length*200+200
							}else{
								this.swiperHeight=1246
							}
							this.totalPages=data.data.page.totalPages
							uni.stopPullDownRefresh()
						}
					}
				);
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-tab-list {
		color: #969696;
		font-weight: normal;
	}

	.uni-tab-bar .active {
		color: #343434;
	}

	.active .swiper-tab-line {
		width: 84rpx;
		margin: auto;
		border-radius: 20rpx;
		border-bottom: 6rpx solid #007AFF;
		border-top: 6rpx solid #007AFF;
	}

	.uni-swiper-tab {
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #eeeeee;
	}
	
	swiper{
		background-color: #eaeaea;
	}
	
	.swiper-item{
		background-color: #eaeaea;
		padding: 10rpx 20rpx;
		.act_item{
			background-color: #FFFFFF;
			border-radius: 10rpx;
			margin: 20rpx auto;
			display: flex;
			width: 100%;
			height: 180rpx;
			image{
				width: 220rpx;
				height: 180rpx;
				border-radius: 10rpx 0 0 10rpx;
			}
			.right{
				margin: auto 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.tit{
					margin-bottom: 20rpx;
					font-weight: bold;
					font-size: 32rpx;
				}
				.info{
					image{
						width: 26rpx;
						height: 26rpx;
					}
					font-size: 24rpx;
					text:nth-child(2){
						margin-left: 10rpx;
					}
				}
				.act-status{
					border-radius: 5rpx;
					margin-top: 10rpx;
					padding-bottom: 5rpx;
					width: 80rpx;
					height: 36rpx;
					text-align: center;
					.font{
						font-size: 20rpx;
						color: #FFFFFF;
					}
				}
			}
		}
		
		.isOver{
			width: 100%;
			height: 120rpx;
			text-align: center;
			font-size: 28rpx;
			margin-top: 60rpx;
		}
	}
</style>
