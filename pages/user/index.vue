<template>
	<view class="index">
		<view class="head">
			<view class="title" v-if="!loginToken">
				<view class="tit">易见源活动</view>
				<view class="intro">来呀，快乐起来呀</view>
			</view>
			<view class="content" v-if="!loginToken">
				<button class="btn" @click="login">登录/注册</button>
			</view>

			<view class="headimg" v-if="loginToken">
				<image :src="userInfo.headimg_url_show"></image>
			</view>
			<view class="font" v-if="loginToken">{{userInfo.nickname}}</view>
			<view class="calendar" v-if="loginToken">
				<image src="/static/images/user/calendar.png" @click="toIntegral"></image>
			</view>
		</view>
		
		<scroll-view class="body">
			<view class="activity">
				<view class="title" @click="toActivity">
					<view class="tit">我的活动</view>
					<view class="more">更多</view>
					<view class="icon iconfont icon-icon-test3 icon-css"></view>
				</view>
				<view class="line"></view>
				<view class="nav">
					<view class="navItem" @click="toActivity(1,1)">
						<view class="quantity" v-if="loginToken&&userInfo.no_pay_num!=0">{{userInfo.no_pay_num}}</view>
						<view class="placeholder" v-if="userInfo.no_pay_num==0"></view>
						<image src="/static/images/user/pay.png"></image>
						<text>待付款</text>
					</view>
					<view class="navItem" @click="toActivity(2,1)">
						<view class="quantity" v-if="loginToken&&userInfo.no_check_num!=0">{{userInfo.no_check_num}}</view>
						<view class="placeholder" v-if="userInfo.no_check_num==0"></view>
						<image src="/static/images/user/audit.png"></image>
						<text>待审核</text>
					</view>
					<view class="navItem" @click="toActivity(3,1)">
						<view class="quantity" v-if="loginToken&&userInfo.no_start_num!=0">{{userInfo.no_start_num}}</view>
						<view class="placeholder" v-if="userInfo.no_start_num==0"></view>
						<image src="/static/images/user/unstart.png"></image>
						<text>未开始</text>
					</view>
					<view class="navItem" @click="toActivity(4,1)">
						<view class="quantity" v-if="loginToken&&userInfo.jxz_num!=0">{{userInfo.jxz_num}}</view>
						<view class="placeholder" v-if="userInfo.jxz_num==0"></view>
						<image src="/static/images/user/begining.png"></image>
						<text>进行中</text>
					</view>
				</view>
			</view>
			
			<view class="activiting">
				<view class="title" @click="toActivity">
					<view class="tit">正在参与的活动</view>
					<view class="more">更多</view>
					<view class="icon iconfont icon-icon-test3 icon-css"></view>
				</view>
				<view class="line"></view>
				<view class="content">
					<text v-if="!loginToken">您还没有正在参与的活动</text>
					<button v-if="!loginToken" @click="login">去报名</button>
					
					<view class="act_item" v-for="(content,index) in contentList" :key="index" v-if="loginToken" @click="toActivityDetails(content.order_id,content.activity_id)">
						<image :src="content.cover_img_show"></image>
						<view class="right">
							<view class="tit">
								{{content.activity_name}}
							</view>
							<view class="time">
								<image src="/static/images/user/time.png"></image>
								<text>{{content.activity_time}}</text>
							</view>
							<view class="address">
								<image src="/static/images/user/address.png"></image>
								<text>{{content.address}}</text>
							</view>
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="option">
				<uni-list>
					<uni-list-item title="我的钱包" thumb="/static/images/user/myWallet.png" @click="toWallet" :rightText="loginToken?'￥'+userInfo.user_money:''"></uni-list-item>
					<uni-list-item title="分销中心" thumb="/static/images/user/distributionCenter.png"></uni-list-item>
					<uni-list-item title="我的积分" thumb="/static/images/user/myIntegral.png" @click="toIntegral" :rightText="loginToken?userInfo.user_points+'':''"></uni-list-item>
					<uni-list-item title="我的优惠券" thumb="/static/images/user/myCoupon.png" @click="toCoupon" :rightText="loginToken?userInfo.coupon+'张':''"></uni-list-item>
					<uni-list-item title="我的关注" thumb="/static/images/user/myAttention.png" @click="toFocus"></uni-list-item>
					<uni-list-item title="我的礼物" thumb="/static/images/user/myGift.png" @click="toGifts"></uni-list-item>
					<uni-list-item title="我的证书" thumb="/static/images/user/myCertificate.png" @click="toCertificates"></uni-list-item>
					<uni-list-item title="我的动态" thumb="/static/images/user/myDynamic.png" @click="toTrends"></uni-list-item>
					<uni-list-item title="我的设置" thumb="/static/images/user/mySetting.png" @click="toSettings"></uni-list-item>
				</uni-list>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"

	export default {
		name: 'userIndex',
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				loginToken:'',//登录票据，有值为已登录，空值为未登录
				contentList:[],//正在参与的活动列表
				page: 0,
				loadMoreStatus: 'more',
				image: '/static/images/home-page/background.png',
				userInfo: {
					nickname: '',
					headimg_url_show: '',
					user_money:0,
					coupon:0,
					user_points:0
				}
			};
		},
		//页面显示执行方法
		onShow() {
			this.getAccessToken().then(res => {
				this.loginToken = res
				if(res){
					this.getActiviting()
					this.getUserHomeInit()
				}
			});
			this.getUserInfo().then(res => {
				this.userInfo = res;
			});
		},
		async onLoad(e) {
			//#ifdef MP-WEIXIN

			//#endif

			//#ifdef H5
			this.$wechat.share();
			//#endif
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: this.$store.state.shareConfig.title,
				path: this.path,
				imageUrl: this.$store.state.shareConfig.image
			};
		},
		onPullDownRefresh() {
			this.getActiviting()
			this.getUserHomeInit()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			console.log("触底了")
		},
		methods: {
			...mapMutations(['setLang', 'setAccessToken']),
			...mapActions(['getUserInfo', 'getAccessToken']),
			security(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/user/security'
				});
			},

			/**
			 * 关注用户
			 * @param {Object} e
			 */
			follow(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/user/follow'
				});
			},
			language(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/user/language'
				});
			},
			signOut() {
				let _that = this;

				uni.showModal({
					title: this.$t('prompt'),
					content: this.$t('user.logOutComfirm'),
					confirmColor: '#30C58D',
					cancelText: this.$t('cancelText'),
					confirmText: this.$t('confirmText'),
					success: function(res) {
						if (res.confirm) {
							//请求服务器退出接口
							//清空本地登录用户信息

							_that.$request.send('vip/Account/logOut', {}, data => {
								_that.setAccessToken('');
								uni.reLaunch({
									url: '/pages/login/login'
								});
							});
						}
					}
				});
			},
			
			//获取正在进行的活动
			getActiviting(){
				let that = this
				this.$request.send('vip/User/getHomeIng', {
					flag: "all",
					_yjy_config: {}
				}, data => {
					if(data.code==1){
						that.contentList=data.data
					}
				});
			},
			
			//获取用户主页初始化信息
			getUserHomeInit(){
				let that=this
				this.$request.send(
					'vip/User/getHomeInit', {},
					data => {
						if (data.code == 1) {
							that.userInfo=data.data
						}
					}
				);
			},
			
			//登录
			login() {
				uni.navigateTo({
					"url": "/pages/login/login"
				})
			},

			//进入活动页面
			toActivity(index,page) {
				uni.navigateTo({
					"url": "/pages/user/activity/activity?index="+index+"&page="+page
				})
			},
			
			//进入活动详情
			toActivityDetails(order_id,activity_id){
				uni.navigateTo({
					url:"/pages/user/activity/activityDetails?order_id="+order_id+"&activity_id="+activity_id
				})
			},

			//进入钱包页面
			toWallet() {
				uni.navigateTo({
					"url": "/pages/user/wallet/wallet"
				})
			},

			//进入积分页面
			toIntegral() {
				uni.navigateTo({
					"url": "/pages/user/integral/integral"
				})
			},
			toFocus() {
				uni.navigateTo({
					"url": "/pages/user/focus/focus"
				})
			},
			toCertificates() {
				uni.navigateTo({
					"url": "/pages/user/certificates/certificates"
				})
			},
			toTrends() {
				uni.navigateTo({
					"url": "/pages/user/trends/trends"
				})
			},
			toGifts() {
				uni.navigateTo({
					"url": "/pages/user/gifts/gifts"
				})
			},
			
			//进入优惠券页面
			toCoupon(){
				uni.navigateTo({
					"url": "/pages/user/wallet/coupon"
				})
			},
			
			//进入设置页面
			toSettings(){
				uni.navigateTo({
					"url": "/pages/user/settings/settings"
				})
			}

		}
	}
</script>

<style lang="scss">
	//页面自定义样式
	page {
		background-color: #eaeaea;
	}

	.index {
		width: 100%;
		height: 350rpx;
		background-image: url(/static/images/user/background.jpg);

		.head {
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 132rpx;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: 400;

			.title {
				margin-top: 15rpx;

				.tit {
					font-size: 38rpx;
					color: #FFFFFF;
				}

				.intro {
					font-size: 26rpx;
					color: #FFFFFF;
				}
			}

			.content {
				height: 120rpx;

				.btn {
					color: #FFFFFF;
					border-radius: 50rpx;
					width: 220rpx;
					background-color: #55aaff;
					margin-top: 30rpx;
					
				}
			}

			.headimg {
				width: 20%;
				text-align: right;

				image {
					width: 120rpx;
					height: 120rpx;
					margin-top: 12rpx;
					border-radius: 50rpx;
				}

			}

			.font {
				width: 50%;
				color: #FFFFFF;
				font-size: 33rpx;
				margin-top: 50rpx;
				text-align: left;
			}

			.calendar {
				width: 20%;
				text-align: center;
				line-height: 132rpx;

				image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		.body {
			width: 100%;
			height: 2000rpx;
			line-height: 10rpx;
			display: flex;

			.activity {
				width: 90%;
				height: 250rpx;
				margin: 14rpx auto;
				border-radius: 10rpx;

				.title {
					width: 100%;
					height: 100rpx;
					background-color: #ffffff;
					border-radius: 10rpx 10rpx 0 0;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit {
						width: 80%;
						font-size: 28rpx;
						margin: auto 0;
						margin-left: 30rpx;
					}

					.more {
						font-size: 24rpx;
						margin: auto 0;
					}
					
					.icon-css{
						margin: auto 0;
						margin-right: 20rpx;
					}
				}

				.line {
					width: 100%;
					height: 2rpx;
					background-color: #e1e1e1;
				}

				.nav {
					width: 100%;
					height: 60%;
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					border-radius: 0 0 10rpx 10rpx;

					.navItem {
						display: flex;
						flex-direction: column;
						justify-content: center;
						width: 25%;
						line-height: 50rpx;
						font-size: 25rpx;
						text-align: center;
						
						.quantity{
							color: #FFFFFF;
							font-size: 26rpx;
							line-height: 40rpx;
							background-color: #ff0000;
							border-radius: 50%;
							width: 40rpx;
							height: 40rpx;
							position: relative;
							z-index: 1;
							left: 90rpx;
							top: 20rpx;
						}
						
						.placeholder{
							width: 40rpx;
							height: 40rpx;
							position: relative;
							z-index: 1;
							left: 90rpx;
							top: 20rpx;
						}

						image {
							width: 50rpx;
							height: 50rpx;
							display: flex;
							align-self: center;
						}
					}
				}
			}

			.activiting {
				width: 90%;
				margin: 20rpx auto;
				border-radius: 10rpx;

				.title {
					width: 100%;
					height: 100rpx;
					background-color: #ffffff;
					border-radius: 10rpx 10rpx 0 0;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.tit {
						width: 80%;
						font-size: 28rpx;
						margin: auto 0;
						margin-left: 30rpx;
					}

					.more {
						font-size: 24rpx;
						margin: auto 0;
					}
					
					.icon-css{
						margin: auto 0;
						margin-right: 20rpx;
					}
				}

				.line {
					width: 100%;
					height: 5rpx;
					background-color: #e6e6e6;
				}

				.content {
					width: 100%;
					background-color: #FFFFFF;
					border-radius: 0 0 10rpx 10rpx;
					display: flex;
					flex-direction: column;

					text {
						font-size: 30rpx;
						margin: 40rpx auto;
					}

					button {
						width: 160rpx;
						font-size: 25rpx;
						color: #FFFFFF;
						border-radius: 50rpx;
						background-color: #55aaff;
						margin-bottom: 50rpx;
					}
					
					.act_item{
						background-color: #f7f7fb;
						border-radius: 10rpx;
						margin: 30rpx auto;
						display: flex;
						width: 90%;
						height: 180rpx;
						image{
							width: 220rpx;
							height: 180rpx;
							border-radius: 10rpx 0 0 10rpx;
						}
						
						.right{
							height: 180rpx;
							padding: 0 20rpx;
							margin: auto 10rpx;
							line-height: 60rpx;
							.tit{
								color: #1d2023;
								font-size: 28rpx;
							}
							.time{
								image{
									width: 32rpx;
									height: 32rpx;
								}
								text{
									color: #3f454b;
									font-size: 24rpx;
									margin-left: 16rpx;
								}
							}
							.address{
								image{
									width: 32rpx;
									height: 32rpx;
								}
								text{
									color: #3f454b;
									font-size: 24rpx;
									margin-left: 16rpx;
								}
							}
						}
					}

				}
			}

			.option {
				width: 90%;
				margin: 15rpx auto;
				border-radius: 10rpx;
				background-color: #ffffff;
			}
		}
	}
</style>
