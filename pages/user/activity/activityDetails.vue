<template>
	<view>
		<uni-card title="活动信息" is-shadow="true">
			<view class="activity-info">
		    <view class="act-detail" @click="toActivityList">
					<image :src="content.activity.cover_img_show"></image>
					<view class="txt">{{content.activity.activity_name}}</view>
					<view class="icon iconfont icon-icon-test3 icon-css"></view>
				</view>
				<view class="line"></view>
				<view class="act-time">活动时间&emsp;&emsp;{{content.activity.start_time_txt}}</view>
				<view class="act-place">活动地点&emsp;&emsp;{{content.activity.address}}</view>
				<view class="line"></view>
				<view class="join-time">报名时间&emsp;&emsp;{{content.activity.create_time_txt}}</view>
				<view class="join-place">报名项目&emsp;&emsp;{{content.activity.price_name}}</view>
			</view>
		</uni-card>
		
		<uni-card title="报名信息" is-shadow="true">
			<view class="join-info">
				<view class="users" v-for="(user,userIndex) in content.users" :key="userIndex" :style="{'height':user.userInfo.length*50+'rpx'}">
					<view v-for="(info,infoIndex) in user.userInfo" :key="infoIndex">
						{{info.field_title}}：&emsp;&emsp;&emsp;{{info.field_value}}
					</view>
				</view>
			</view>
		</uni-card>
		
		<uni-card title="订单信息" is-shadow="true">
			<view class="order-info">
				<view class="order-id">订单编号&emsp;&emsp;{{content.order.order_sn}}</view>
				<view class="order-time">下单时间&emsp;&emsp;{{content.order.create_time_txt}}</view>
			</view>
		</uni-card>
		
		<uni-card title="服务及费用信息" type="" is-shadow="true" extra="免费">
			<view class="service-cost-info">
		    <view class="join-cost">报名费用</view>
				<view class="cost-tag"><span>免费</span></view>
				<view class="quantity">×1人</view>
				<view class="money">0.00元</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	
	export default {
		components: {uniCard},
		data() {
			return {
				orderId:0,
				activityId:0,
				content:{
					activity:{},
					users:[{
						userInfo:[{
							field_title:"",
							field_value:""
						}]
					}],
					order:{}
				}
			};
		},
		
		onLoad(res) {
			this.orderId=parseInt(res.order_id)
			this.activityId=parseInt(res.activity_id)
		},
		
		onShow() {
			this.getActivityDetails(this.orderId)
		},
		
		methods:{
			//进入活动列表
			toActivityList(){
				uni.navigateTo({
					url:"/pages/index/activityList?id="+this.activityId
				})
			},
			
			//获取活动详情信息
			getActivityDetails(id){
				
				let that= this
				this.$request.send(
					'vip/UserActivity/getDetails', {
						id: id
					},
					data => {
						if (data.code == 1) {
							that.content=data.data
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">

	.activity-info{
		height: 390rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.act-detail{
			display: flex;
			image{
				width: 80rpx;
				height: 80rpx;
				margin-right:10rpx ;
			}
			
			.txt{
				width: 80%;
				font-size: 32rpx;
				color: #323233;
				font-weight: bold;
				line-height: 80rpx;
			}
			
			.icon-css{
				line-height: 80rpx;
			}
		}
		
		.act-info{
			height: 120rpx;
		}
		
		.line{
			height: 1rpx;
			background-color: #eaeaea;
		}
		
	}
	
	.join-info{
		.users{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	
	.order-info{
			height: 100rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
	}
	
	.service-cost-info{
		display: flex;
		justify-content: space-between;
		
		.join-cost{
			width: 200rpx;
		}
		
		.cost-tag{
			span{
				background-color: #ff9800;
				padding: 4rpx 8rpx;
				border-radius: 5rpx;
				font-size: 20rpx;
				color: #FFFFFF;
			}
		}
		
	}
</style>
