<template>
	<view>
		<swiper-img :activityList="activityList"></swiper-img>
		<view class="navTabbar">
			<nav-tab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></nav-tab>
		</view>
		<view v-if="current === 0" class="brief">
			<scroll-view scroll-y="true">
				<view class="swiper-activity box">
					<view class="activity-title">{{activityList.activity_name}}</view>
					<view class="actitity-body">
						<view class="activity" v-for="(item,index) in activityList.activity_status_info" :key="index" :class="index <= activityList.sign_status ? 'active' : ''">
							<view class="active-icon" :src="item.img" ></view>
							<view class="active-name">{{item.status_txt}}</view>
							<view class="active-time">{{item.time}}</view>
						</view>
					</view>
					<view class="activity-end">
						<text class="activity-active">{{activityList.sign_status_text}}</text>
						<view class="activity-active-time" v-if="activityList.sign_status_text=='进行中'? true : false">
							活动结束倒计时{{day}}天{{hour}}:{{min}}:{{second}}
						</view>
					</view>
				</view>
				<view class="activity-arrangements box">
					<view class="activity-arrangements-top">
						<view class="ring"></view>
						<text class="activity-arrangements-title">活动安排</text>
					</view>
					<view class="site-list-content-item" v-for="(item4,index4) in activityList.positions" :key="index4">
						<image class="site-list-content-icon" :src="item4.pos_type_code_icon"></image>
						<view class="site-list-content-right">
							<view class="site-list-item-intro">
								{{item4.pos_type_code_name}}
							</view>
							<view class="site-address" v-for="(item5,index5) in activityList.positions[index4].position_basic_info">
								<text class="site-address-txt">{{item5.title}}:</text>
								<text class="site-address-content">{{item5.value}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="activity-athletic-events box" v-for="(item2,index2) in activityList.activityPrices" :key="index2">
					<view class="activity-title">
						<view class="ring"></view>
						<text class="activity-athletic-events-txt">活动项目</text>
					</view>
					<view class="linkman-item">
						<view class="linkman-item-title">{{item2.name}}</view>
						<view class="item_text" @click="itemText">
							<text class="linkman-text">{{item2.price}}</text>
							<view class="linkman-icon"></view>
						</view>
					</view>
					<view class="linkman-item-content-box box" v-for="(item3,index3) in activityList.activityPrices[index2].position_basic_info"
					 :key="index3">
						<view class="linkman-item-content">
							<text class="base-info-name">{{item3.title}}:</text>
							<text class="base-info-detail">{{item3.value}}</text>
						</view>
					</view>
				</view>

				<view class="activity-detail-end box">
					<view class="activity-title">
						<view class="ring"></view>
						<text class="activity-athletic-events-txt">活动详情</text>
					</view>
					<view class="activity-title-end">
						<rich-text :nodes="activityList.desc"></rich-text>
					</view>
				</view>
				<view class="activity-end">技术支持 易见源科技</view>
			</scroll-view>
			<view class="tabbottom">
				<view class="bottomLeft">
					<view class="bottomIcon icon iconfont icon-zixun"></view>
					<view class="bottomFont">咨询</view>
				</view>
				<view class="bottomLeft">
					<view class="bottomIcon icon iconfont icon-yaoqing"></view>
					<view class="bottomFont">邀请</view>
				</view>
				<view class="bottomRight">立即报名</view>
			</view>
		</view>
		<view v-if="current === 1">
			<map class="map" scale="13" :longitude="longitude" :latitude="latitude" :markers="markers"
			show-compass="true" enable-satellite="true" enable-overlooking="true"></map>
		</view>
		<view v-if="current === 2">
		<view class="announcement" >
			<image src="../../static/images/index/none.png"></image>
		</view>
		</view>
		<view v-if="current === 3">
			<view class="talk">
				<view class="adding">加载中...</view>
				<view class="full_screen">
					<image src="../../static/images/index/下载.png"></image>
					<view>全屏</view>
				</view>
				<view class="issue">
					<image src="../../static/images/index/issue.png"></image>
					<view>发布</view>
				</view>
				<view class="present">
					<image src="../../static/images/index/present.png"></image>
					<view>礼物</view>
				</view>
				<view class="send">
					<view class="send_left">
						<image src="../../static/images/index/send.png"></image>
					</view>
					<view class="send_line"></view>
					<view class="send_input">
						<input type="text" placeholder="请输入留言" />
					</view>
					<view class="send_icon">
						<image src="../../static/images/index/small.png"></image>
					</view>
					<view class="send_button">发送</view>
				</view>
			</view>
		</view>
		<view v-if="current === 4" v-for="(item,index) in activityList.activityPrices" :key="index">
			<view class="actorTop">
				<view class="actorLeft">
					{{item.name}}
					<view class="actorIcon"  @click="hideBack"></view>
				</view>
				<view class="actorRight">
					<image src="../../static/images/index/下载.png"></image>
					<view class="quanping">全屏</view>
				</view>
			</view>
			<view class="hide" v-if="flag">
				<view class="hideFont">{{item.name}}</view>
			</view>
			<view>
				<view class="actor" v-for="(aitem,aindex) in actorList" :key="aindex">
					<view class="actorhd">
						<image :src="aitem.headimg_url"></image>
					</view>
					<view class="actorbd">
						<view class="actorTitle">{{aitem.nickname}}</view>
						<view class="actorBut">
							<view class="one icon iconfont icon-liwu">{{aitem.gift_num}}</view>
							<view class="two icon iconfont icon-aixinjiaguanzhu">{{aitem.follow_num}}</view>
							<view class="three icon iconfont icon-xinxi">{{aitem.fans_num}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current === 5">
			<view class="myLive">
				<view class="myServer">
					<view class="myLeft">
						<image src="../../static/images/index/myServer.png"></image>
						<view>附加服务</view>
					</view>
					<view class="myRight icon iconfont icon-icon-test3"></view>
				</view>
				<view class="myServer">
					<view class="myLeft">
						<image src="../../static/images/index/myGift.png"></image>
						<view>我的礼物</view>
					</view>
					<view class="myRight icon iconfont icon-icon-test3"></view>
				</view>
				<view class="myServer">
					<view class="myLeft">
						<image src="../../static/images/index/myCoupon.png"></image>
						<view>我的优惠券</view>
					</view>
					<view class="myRight icon iconfont icon-icon-test3"></view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import swiperImg from '../../components/index/swiperImg.vue'
	import navTab from '../../components/index/swiperNav.vue'
	export default {
		components: {
			"swiper-img": swiperImg,
			"nav-tab": navTab
		},
		data() {
			return {
				curStartTime:'',
				day: '0',
				hour: '00',
				min: '00',
				second: '00',
				activity_price_id:0,
				flag:false,
				html: '',
				fold: true,
				activityList: {},
				activityPriceList:[],
				actorList:[],
				tabTitle: ["简介", "地图", "公告", "互动", "参与者", "我的"],
				current: 0,
				longitude:112.964051,
				latitude:27.917558,
				index:0,
				markers:[
					{
						title:'起点',
						longitude:112.964051,
						latitude:27.917558,
						iconPath:'',
						label:{
							content:'起点',
							color:'#008DFF'
						}
					},
					{
						longitude:112.957537,
						latitude:27.896419,
						iconPath:'',
						title:'莲城大桥',
						label:{
							content:'终点',
							color:'#008DFF'
						}
					}
				]
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getActivityList()
			
		},
		methods: {
			 getList(){
				this.activityList.map((item,index)=>{
					this.activityPriceList = index
				})
			},
			
			getList(){
				
			},
			hideBack(){
				this.flag = !this.flag
			},
			itemText() {
				this.fold = !this.fold
				console.log("点击了")
			},
			getActivityList() {
				this.$request.send(
					'vip/Activity/getDetails', {
						id: this.id
					},
					res => {
						if (res.code == 1) {
							this.activityList = res.data
							this.curStartTime = res.data.details_activity_end_time_text;
							this.countTime()
							this.getActorList()
						}
					},
					null,
					false,
					'GET'
				);
			},
			getActorList() {
				let _that= this;
				this.$request.send(
					'vip/Activity/getPlayerList', {
						size: 6,
						current: 1,
						id: this.id, 
						activity_price_id:_that.activityList.activityPrices[0].id,
						activity_id:_that.activityList.activityPrices[0].activity_id,
						sign_up_type:_that.activityList.activityPrices[0].sign_up_type,
					},
					res => {
						if (res.code == 1) {
							this.actorList = res.data.list
							
			
						}
					},
					null,
					false,
					'GET'
				);
			},
			changeTab(index) {
				this.current = index
			},
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
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F7FB;
		margin-bottom: 51px;
	}
	.navTabbar{
		
	}
	.box {
		width: 700rpx;
		margin: 0 auto;
	}
	.brief{
		.swiper-activity {
			height: 430rpx;
			background-color: #F7F7FB;
			margin-top: 5px;
		
			.activity-title {
				height: 44px;
				background-color:#F0F0F0;
				font-size: 20px;
				color: #000000;
				font-weight: 700;
				text-align: center;
				line-height: 44px;
			}
		
			.actitity-body {
				width: 100%;
				background-color: #F7F7FB;
				display: flex;
				align-items: center;
		
				.activity {
					width: 170rpx;
					text-align: center;
					color: #000000;
		
					.active-icon {
						width: 40px;
						height: 40px;
						background-color: #E1E1E1;
						border-radius: 20px;
						margin: 10px auto;
					}
		
					.active-name {
						font-size: 14px;
					}
		
					.active-time {
						font-size: 12px;
					}
				}
				.active{
					.active-icon{
						background-color: #008DFF;
					}
				}
			}
		
			.activity-end {
				display: flex;
				align-items: center;
				height: 40px;
				width: 660rpx;
				background-color: #FFFFFF;
				border-radius: 5px;
				margin: 10px auto;
				padding-left: 10px;
		
				.activity-active {
					background-color: #2394FB;
					font-size: 12px;
					font-weight: 700;
					width: 45px;
					height: 18px;
					line-height: 18px;
					text-align: center;
					color: #FFFFFF;
					margin-right: 5px;
				}
		
				.activity-active-time {
					font-size: 14px;
					color: #000000;
				}
			}
			
		}
		
		.activity-arrangements {
			height: 210px;
			background-color: #FFFFFF;
		
			.activity-arrangements-top {
				height: 43px;
				display: flex;
				align-items: center;
				border-top: 1px solid #F0F0F0;
		
				.ring {
					width: 10px;
					height: 10px;
					border-radius: 5px;
					background-color: #007AFF;
					margin-right: 10px;
				}
		
				.activity-arrangements-title {
					font-size: 16px;
					color: #000000;
					font-weight: 700;
				}
			}
		
			.site-list-content-item {
				height: 36px;
				padding-top: 15px;
				display: flex;
		
				.site-list-content-icon {
					width: 24px;
					height: 24px;
				}
		
				.site-list-content-right {
					margin-left: 10px;
		
					.site-list-item-intro {
						font-size: 14px;
						color: #000000;
					}
		
					.site-address {
						.site-address-txt {
							font-size: 15px;
							color: #A9A8AD;
							margin-right: 5px;
						}
		
						.site-address-content {
							font-size: 15px;
							color: #000000;
						}
		
					}
				}
			}
		
		}
		
		.activity-athletic-events {
			height: 300px;
			background-color: #FFFFFF;
			margin-top: 10px;
		
			.activity-title {
				height: 43px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F8F8F8;
		
				.ring {
					width: 10px;
					height: 10px;
					border-radius: 5px;
					background-color: #007AFF;
					margin-right: 10px;
				}
		
				.activity-athletic-events-txt {
					font-size: 16px;
					color: #000000;
					font-weight: 700;
				}
			}
		
			.linkman-item {
				height: 24px;
				line-height: 24px;
				font-size: 18px;
				color: #007AFF;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				margin: 15px 20px;
		
				.linkman-item-title {}
		
				.item_text {
					display: flex;
					width: 64px;
					height: 24px;
					font-size: 18px;
					font-weight: 900px;
		
					.linkman-text {}
		
					.linkman-icon {
						margin-top: 7px;
						margin-left: 5px;
						width: 0px;
						border: 10px solid transparent;
						border-top-color: blue;
					}
				}
			}
		
			.linkman-item-content-box {
				padding: 0 40px;
				background-color: #FFFFFF;
				width: 542rpx;
				margin: 0 auto;
		
				.linkman-item-content {
					height: 20px;
					font-size: 14px;
					margin-bottom: 10px;
		
					.base-info-name {
		
						color: #000000;
					}
		
					.base-info-detail {
						color: #A2A3A4;
					}
				}
			}
		}
		
		.activity-detail-end {
			margin-top: 10px;
			background-color: #FFFFFF;
		
			.activity-title {
				height: 43px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #F8F8F8;
		
				.ring {
					width: 10px;
					height: 10px;
					border-radius: 5px;
					background-color: #007AFF;
					margin-right: 10px;
				}
		
				.activity-athletic-events-txt {
					font-size: 16px;
					color: #000000;
					font-weight: 700;
				}
			}
		
			.activity-title-end {
				font-size: 14px;
				color: #000;
			}
		}
		
		.activity-end {
			height: 32px;
			line-height: 32px;
			text-align: center;
			font-size: 12px;
			color: #CCCCCC;
			background-color: #F2F2F2;
			padding: 10px 0;
		}
		.tabbottom{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 51px;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			.bottomLeft{
				width: 182rpx;
				height: 100%;
				text-align: center;
				padding: 9px 0;
				border-right: 1px solid #F2F2F2;
				.bottomIcon{
					color: #7D7E80;
					font-size: 18px;
				}
				.bottomFont{
					color: #7D7E80;
					font-size: 10px;
				}
			}
			.bottomRight{
				margin: auto;
				height: 40px;
				line-height: 40px;
				background-color: #30C58D;
				width: 366rpx;
				text-align: center;
				font-size: 16px;
				color: #FFFFFF;
			}
		}
	}
	
	.map{
		width: 750rpx;
		height: 750rpx;
	}
	.actorTop{
		margin-top: 5px;
		margin-bottom: 15px;
		height:25px;
		padding: 12px 13px 12px 10px;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		
		.actorLeft{
			display: flex;
			justify-items: center;
			align-items: center;
			height: 22px;
			border: 1px solid #CCCCCC;
			font-size: 14px;
			color: #007AFF;
			.actorIcon{
				border: 6px solid transparent;
				border-top-color: #007AFF;
			}
		}
		.actorRight{
			display: flex;
			align-items: center;
			image{
				width: 16px;
				height:16px
			}
			.quanping{
				font-size: 14px;
				color: #60D2A7;
			}
		}
		
	}
	.hide{
		height:25px;
		background-color: #FFFFFF;
		border-top: 1px solid #CCCCCC;
		padding: 10px 16px;
		.hideFont{
			font-size: 14px;
			color: #9DE4C9;
		}
	}
	.actor{
		display: flex;
		background-color: #FFFFFF;
		padding: 12px 14px;
		border-bottom: 1px solid #F7F7FB;
		.actorhd{
			margin: 0 20px;
			width: 48px;
			height: 48px;
			border-radius: 24px;
			background-color: #F2F2F2;
			overflow: hidden;
			image{
				width: 100%;
				height:100%;
			}
		}
		.actorbd{
			.actorTitle{
				font-size: 14px;
				color: #000000;
			}
			.actorBut{
				display: flex;
				justify-content: space-between;
				margin-top: 13px;
				width: 216px;
				view{
					margin-left: 5px;
					font-size: 14px;
					color: #BBBBBB;
				}
			}
		}
	}
	
	.myLive{
		margin: 15px 10px 0;
		padding: 15px;
		background-color: #FFFFFF;
		border-radius: 10px;
		.myServer{
			height: 24px;
			padding: 10px 16px;
			display: flex;
			border-bottom: 1px solid #F0F0F0;
			.myLeft{
				display: flex;
				align-items: center;
				width: 272px;
				image{
					width: 22px;
					height: 22px;
					margin-right: 3px;
				}
				view{
					font-size: 14px;
					color: #000000;
				}
			}
			.myRight{
				font-size: 24px;
				color: #C8C9CA;
			}
		}
	}
	.talk{
		position: relative;
		width: 100%;
		height: 320px;
		background-color: #F0F0F0;
		text-align: center;
		.adding{
			color: #959595;
		}
		.full_screen{
			position: absolute;
			top: 20px;
			right: 15px;
			border-radius: 5px;
			width: 40px;
			height: 40px;
			background-color: #FFFFFF;
			text-align: center;
			padding: 4px;
			image{
				width: 20px;
				height: 20px;
				
			}
		}
		.issue{
			position: absolute;
			top: 190px;
			right: 15px;
			border-radius: 5px;
			width: 40px;
			height: 40px;
			background-color: #FFFFFF;
			text-align: center;
			padding: 4px;
			image{
				width: 20px;
				height: 20px;
				
			}
		}
		.present{
			position: absolute;
			top: 250px;
			right: 15px;
			border-radius: 5px;
			width: 40px;
			height: 40px;
			background-color: #FFFFFF;
			text-align: center;
			padding: 4px;
			image{
				width: 20px;
				height: 20px;
				
			}
		}
		.send{
			position: fixed;
			display: flex;
			align-items: center;
			padding: 10px;
			bottom: 0px;
			left: 0px;
			width: 100%;
			height: 60px;
			background-color: #E7E7E7;
			.send_left{
				width: 20px;
				height: 20px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.send_line{
				margin: 0 10px;
				height: 20px;
				width: 2px;
				background-color: #007AFF;
			}
			.send_input{
				box-sizing: border-box;
				width: 63%;
				height: 44px;
				background-color: #FFFFFF;
				border-radius: 5px;
				padding: 10px 16px;
				input{
					width: 100%;
					text-align: left;
				}
			}
			.send_icon{
				width: 28px;
				height: 28px;
				margin: 0 5px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
			.send_button{
				width: 38px;
				height: 25px;
				line-height: 25px;
				background-color: #008DFF;
				border-radius: 5px;
				font-size: 14px;
				color: #FFFFFF;
				text-align: center;
			}
			
		}
	}
	.announcement{
		width: 100%;
		height: 300px;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
