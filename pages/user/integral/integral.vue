<template>
	<view class="integral">
		<view class="top">
			<view class="black-bg">
				<view class="gold-bg">
					<image :src="userInfo.headimg_url"></image>
					<view class="title">
						<view>{{userInfo.nickname}}</view>
						<view>连续签到1天</view>
					</view>
					<view class="totalIntegral">{{userPoints}}积分</view>
				</view>
			</view>
			<view class="integral-menu">
				<view class="icon iconfont icon-jifen integral-detail" @click="toIntegralDetails">积分明细</view>
				<view class="icon iconfont icon-paihang integral-rank">积分排行</view>
				<view class="icon iconfont icon-guize integral-rule" @click="toIntegralRule">积分规则</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="sign-in">
			<view class="sign-in-button">
				<button class="btn" @click="signIn" :disabled="signInfo.flag" 
								:style="{'background-color':signInfo.bgcolor,color:signInfo.txtColor}">
								{{signInfo.txt}}
				</button>
			</view>
			<view class="sign-in-text">
				<text>{{signInfo.intro}}</text>
			</view>
			<view class="calendar">
				<view>
				    <uni-calendar 
				    :insert="true"
				    :start-date="'2019-3-2'"
				    :end-date="'2020-5-20'"
				    @change="change"
				     />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions } from 'vuex'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components:{
			uniCalendar
		},
		
		data() {
			return {
				userInfo: {
					nickname: '',
					headimg_url: ''
				},
				
				//签到按钮
				signInfo:{
					flag:false,
					txt:"签到",
					txtColor:"#ffffff",
					intro:"今日未签到，签到领积分！",
					bgcolor:"#30c58d"
				},
				
				userPoints:0//用户积分
			};
		},
		
		onLoad() {
			this.getUserHomeInit()
		},
		
		onShow() {
			this.getUserInfo().then(res => {
				this.userInfo = res
			})
		},
		
    methods: {
			...mapActions(['getUserInfo', 'getAccessToken']),
			
        change(e) {
            console.log(e);
        },
				
				toIntegralRule(){
					this.$request.send(
						'vip/CommonArticle/index', {
							code: "integral_rule"
						},
						data => {
							if (data.code == 1) {
								uni.navigateTo({
									"url":"/pages/user/integral/integralRule?current=" + JSON.stringify(data)
								})
								
							}
						}
					)
				},
				
				toIntegralDetails(){
					uni.navigateTo({
						"url":"/pages/user/integral/integralDetails"
					})
				},
				
				signIn(){
					//签到按钮样式修改
					this.signInfo.flag=true
					this.signInfo.txt="已签到"
					this.signInfo.intro="今日已完成签到任务！"
					this.signInfo.bgcolor="#bbbbbb"
					this.signInfo.txtColor="#323233"
					
					/* this.$request.send(
						'vip/User/userSign', {},
						data => {
							if (data.code == 1) {
								console.log("用户签到成功")
							}else{
								console.log(data.msg)
							}
						}
					); */
				},
				
				//获取用户主页初始化信息
				getUserHomeInit(){
					let that=this
					this.$request.send(
						'vip/User/getHomeInit', {},
						data => {
							if (data.code == 1) {
								that.userPoints=data.data.user_points
							}
						}
					);
				}
    }
	}
</script>

<style lang="scss">
	.top{
		width: 100%;
		height: 300rpx;
		
		.black-bg{
			height: 212rpx;
			background-color: #333;
			display: flex;
			flex-direction: column-reverse;
			border-radius: 0 0 47% 47%;
			
			.gold-bg{
				color: #845400;
				font-weight: bold;
				height: 170rpx;
				margin:0 30rpx 0rpx;
				background-image: linear-gradient(0deg,#bc8537,#f3d7a5);
				border-radius: 0 0 45% 45%;
				display: flex;
				image{
					width: 82rpx;
					height: 82rpx;
					margin-top: 20rpx;
					margin-left: 30rpx;
					border-radius: 50rpx;
					border: 5rpx solid #FFFFFF;
				}
				
				.title{
					margin-left: 30rpx;
					margin-top: 20rpx;
					line-height: 50rpx;
				}
				
				.totalIntegral{
					width: 50%;
					margin-top: 30rpx;
					text-align: right;
				}
			}
		}
		
		.integral-menu{
			height: 88rpx;
			display: flex;
			justify-content: space-between;
			
			.icon-jifen:before {
				margin-right: 10rpx;
				color: #845400;
				font-weight: 700;
			}
			
			.icon-paihang:before {
				width: 32rpx;
				height: 30rpx;
			  margin-right: 10rpx;
			  color: #845400;
			  font-weight: 700;
			}
			
			.icon-guize:before {
				width: 32rpx;
				height: 30rpx;
			  margin-right: 10rpx;
			  color: #845400;
			  font-weight: 700;
			}
			
			.integral-detail{
				font-size: 28rpx;
				color: #323233;
				width: 33%;
				text-align: center;
				margin-top: 40rpx;
			}
			
			.integral-rank{
				font-size: 28rpx;
				color: #323233;
				width: 33%;
				text-align: center;
				margin-top: 40rpx;
			}
			
			.integral-rule{
				font-size: 28rpx;
				color: #323233;
				width: 33%;
				text-align: center;
				margin-top: 40rpx;
			}
		}
	}
	
	.line{
		width: 100%;
		height: 22rpx;
		background-color: #efeff4;
	}
	
	.sign-in{
		display: flex;
		flex-wrap: wrap;
		background-color: #FFFFFF;
		
		.sign-in-button{
			width: 30%;
			height: 100rpx;
			padding-top: 20rpx;
			
			.btn{
				border-radius: 100rpx;
				width: 175rpx;
				height: 80rpx;
				font-size: 28rpx;
			}
		}
		
		.sign-in-text{
			width: 70%;
			padding-top: 40rpx;
		}
		
		.calendar{
			margin: auto;
		}
	}
</style>
