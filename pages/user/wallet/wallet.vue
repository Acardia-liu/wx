<template>
	<view class="wallet">
		<view class="background-color">
			<font>{{userMoney}}</font>
			<font>余额（元）</font>
		</view>
		<ul class="detail">
			<li>
				<image src="/static/images/user/wallet/charge.png"></image>
				<view>充值</view>
			</li>
			<li>
				<image src="/static/images/user/wallet/withdrawCash.png"></image>
				<view>提现</view>
				</li>
			<li @click="toMoneyDetails">
				<image src="/static/images/user/wallet/details.png"></image>
				<view>明细</view>
			</li>
		</ul>
		<view class="other-wealth">
			<view class="coupon" @click="toCoupon">
				<image src="/static/images/user/wallet/coupon.png"></image>
				<span><font>优惠券（张）</font></span>
				<view class="font">{{userCoupon}}</view>
			</view>
			<view class="integral" @click="toIntegral">
				<image src="/static/images/user/wallet/integral.png"></image>
				<span><font>积分</font></span>
				<view class="font">{{userPoints}}</view>
			</view>
		</view>
		<view class="remark">
			<p>说明：</p>
			<p>1，该余额显示当前用户可提现余额</p>
			<p>2，剩余可用于购买赠送礼物给好友</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userMoney:0,
				userCoupon:0,
				userPoints:0
			}
		},
		
		onLoad() {
			this.getUserHomeInit()
		},
		
		methods: {
			
			//进入钱包详情
			toMoneyDetails(){
				uni.navigateTo({
					"url": "/pages/user/wallet/moneyDetails"
				})
			},
			
			//进入优惠券页面
			toCoupon(){
				uni.navigateTo({
					"url": "/pages/user/wallet/coupon"
				})
			},
			
			//进入积分页面
			toIntegral() {
				uni.navigateTo({
					"url": "/pages/user/integral/integral"
				})
			},
			
			//获取用户主页初始化信息
			getUserHomeInit(){
				let that=this
				this.$request.send(
					'vip/User/getHomeInit', {},
					data => {
						if (data.code == 1) {
							that.userMoney=data.data.user_money
							that.userCoupon=data.data.coupon
							that.userPoints=data.data.user_points
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss" >
	page{
		background-color: #F0F0F0;
	}

	.background-color{
		height: 134rpx;
		margin: 20rpx 30rpx 30rpx;
		padding: 50rpx 0;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		background-color: #008Dff;
		display: flex;
		border-radius: 10rpx;
		
		font{
			color: #FFFFFF;
			font-size: 56rpx;
			font-weight: 700;
			margin: 12rpx 0;
		}
		
		font:nth-child(2){
			font-size:24rpx;
			line-height: 34rpx;
			font-weight: 400;
		}
	}
	
	.detail{
		height: 200rpx;
		list-style: none;
		padding: 0 0 0 30rpx;
		display: flex;
		
		li{
			width: 30%;
			height: 100%;
			background-color: #FFFFFF;
			margin: 0 30rpx 0 0;
			border-radius: 10rpx;
			text-align: center;
			
			image{
				width: 72rpx;
				height: 72rpx;
				margin: 35rpx 0 14rpx;
			}
		}
	}
	
	.other-wealth{
		display: flex;
		justify-content: space-between;
		height: 200rpx;
		padding: 30rpx 30rpx 0;
		
		.coupon{
			width: 48%;
			height: 108rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			line-height: 50rpx;
			padding: 30rpx 0;
			font-size: 24rpx;
			
			image{
				width: 48rpx;
				height: 48rpx;
				margin: 0 30rpx;
			}
			
			.font{
				margin-left: 110rpx;
				font-size: 36rpx;
			}
		}
		
		.integral{
			width: 48%;
			height: 108rpx;
			border-radius: 10rpx;
			line-height: 50rpx;
			background-color: #FFFFFF;
			padding: 30rpx 0;
			font-size: 24rpx;
			
			image{
				width: 48rpx;
				height: 48rpx;
				margin: 0 30rpx;
			}
			
			.font{
				margin-left: 110rpx;
				font-size: 36rpx;
			}
		}
	
	}
	
	.remark{
		font-size: 26rpx;
		color: #666666;
		padding-left: 30rpx;
	}
</style>
