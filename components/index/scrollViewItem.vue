<template>
	<view class="scroll-view-item">
		<view class="img">
			<image :src="item.cover_img_show" mode="aspectFill"></image>
			<view class="img-icon-a">
				<text>{{item.sign_status_text}}</text>
				<text class="text-icon">|</text>
				<text>已报{{item.enrolment}}人</text>
			</view>
			<view  v-if="item.sign_status_text=='进行中'?true:false">
				<view class="img-icon-b">
					<view>活动结束倒计时{{day}}天{{hour}}:{{min}}:{{second}}</view>
				</view>
				<view class="img-icon-c">
					<text>去报名</text>
					<text class="icon iconfont icon-youjiantou1"></text>
				</view>
			</view>
			
		</view>
		<view class="text">
			<view>
				<text class="text-title">{{item.activity_name}}</text>
			</view>
			<view>
				<text class="text-time">活动时间：{{item.details_start_time_text}}-{{item.details_activity_end_time_text}}</text>
			</view>
			<view>
				<text class="text-money">活动费用：</text>
				<text class="text-money-m">{{item.max_price}}</text>
			</view>
			<view>
				<text class="text-foot">活动路线：</text>
				<text class="text-foot-a">{{item.start_pos_name}}</text>
				<text class="icon iconfont icon-youjiantou text-foot-b"></text>
				<text class="text-foot-c">{{item.end_pos_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				   day: '0',
				   hour: '00',
				   min: '00',
				   second: '00',
			}
		},
		props: {
			item: Object,
			index: Number,
			curStartTime:String
		},
		created() {
			this.countTime()
			
		},
		methods:{
			// 倒计时
			countTime () {
			  // 获取当前时间
			  let date = new Date()
			  let now = date.getTime()
			  // 设置截止时间
			  let endDate = new Date(this.curStartTime) // this.curStartTime需要倒计时的日期
			  let end = endDate.getTime()
			  // 时间差
			  let leftTime = end - now
			  // 定义变量 d,h,m,s保存倒计时的时间
			  if (leftTime >= 0) {
			    // 天
			    this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)
			    // 时
			    let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
			    this.hour = h < 10 ? '0' + h : h
			    // 分
			    let m = Math.floor(leftTime / 1000 / 60 % 60)
			    this.min = m < 10 ? '0' + m : m
			    // 秒
			    let s = Math.floor(leftTime / 1000 % 60)
			    this.second = s < 10 ? '0' + s : s
			  } else {
			    this.day = 0
			    this.hour = '00'
			    this.min = '00'
			    this.second = '00'
			  }
			  // 等于0的时候不调用
			  if (Number(this.hour) === 0 && Number(this.day) === 0 && Number(this.min) === 0 && Number(this.second) === 0) {
			    return
			  } else {
			  // 递归每秒调用countTime方法，显示动态时间效果,
			    setTimeout(this.countTime, 1000)
			  }
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-item {
		height: 314px;
		border-radius: 8px;
		background-color: #FFFFFF;
		margin-bottom: 10px;

		.img {
			position: relative;
			width: 100%;
			height: 194px;

			image {
				width: 100%;
				height: 100%;
				border-radius: 8px 8px 0 0;
			}

			.img-icon-a {
				position: absolute;
				top: 10px;
				left: 10px;
				width: 93px;
				height: 17px;
				line-height: 17px;
				text-align: center;
				font-size: 10px;
				color: #FFFFFF;
				background-color: #00A9E1;

				.text-icon {
					margin: 0 5px;
				}
			}

			.img-icon-b {
				display: flex;
				position: absolute;
				bottom: 10px;
				left: 10px;
				font-size: 12px;
				color: #FFFFFF;
				line-height: 26px;
			}

			.img-icon-c {
				position: absolute;
				bottom: 10px;
				right: 20px;
				width: 80px;
				height: 26px;
				line-height: 26px;
				text-align: center;
				font-size: 12px;
				color: #008DFF;
				background-color: #FFFFFF;
				border: 1px solid #008DFF;
				border-radius: 5px;

				.icon-youjiantou1 {
					font-size: 14px;
					margin-left: 5px;
				}
			}

		}

		.text {
			width: 100%;
			height: 95px;
			line-height: 26px;
			margin: 10px 0 0 15px;

			.text-title {
				font-size: 14px;
				color: black;
			}

			.text-time {
				font-size: 11px;
				color: #A6A9AC;
			}

			.text-money {
				font-size: 11px;
				color: #A6A9AC;
			}

			.text-money-m {
				font-size: 13px;
				color: #FF822F;
			}

			.text-foot {
				font-size: 11px;
				color: #A6A9AC;
			}

			.text-foot-a,
			.text-foot-c {
				font-size: 11px;
				color: #85DDBC;
			}

			.text-foot-b {
				font-size: 11px;
				color: #A6A9AC;
			}
		}

	}
</style>
