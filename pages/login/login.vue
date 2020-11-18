<template>
	<view class="login">
		<view class="login_logo">
			<image src="../../static/images/user/yjy_logo.jpg"></image>
			<view class="text">
				<view class="tit">易见源活动</view>
				<view class="intro">来呀，快乐起来呀啊</view>
			</view>
		</view>
		<view class="login_body">
			<view class="login_input_box">
				<view class="login_input_box_up">
					<input :placeholder='loginWay===true?"手机号":"手机号/用户名"' v-model="inputValue.inputUsername"/>
				</view>
				<view class="font-box" v-show="loginWay" @click="getValidCode"><span class="font">获取验证码</span></view>
				<view class="login_input_box_down">
					<input type="password" :placeholder='loginWay===true?"请输入验证码":"请输入密码"' v-model="inputValue.inputPassword"/>
				</view>
			</view>
			<view class="login_change" @click="changeLogin">{{loginWay===true?'账号密码登录':'验证码登录'}}</view>
			<view class="login_button" @click="login"><button>登录</button></view>
		</view>
		<view class="other_login"></view>
	</view>
</template>

<script>
import { isWeixinH5, isWeixinMiniProH5, getLang } from '../../common/util.js';
import { getSetting } from '../../common/login/authorize.js';
import { getProvider, getWechatUserInfoByCode, userLogin, getCode } from '../../common/login/login.js';

import { mapMutations } from 'vuex';
export default {
	components: {},
	data() {
		return {
			inputValue:{
				inputUsername:'',
				inputPassword:''
			},
			loginWay:true,  //登录方式判断
			
			
			page: 0,
			status: 0, //2未操作 1已经授权  0拒绝授权
			code: '',
			loginBtnLoading: false,
			loginBtnDisabled: false,
			loadMoreStatus: 'more',
			image: '/static/images/sign-in/background.png',
			formData: {
				userName: '',
				password: ''
			},
			index: 0,
			isApp: 0, //是否在app里
			dialogSelectData: {
				type: 'dialog',
				items: [
					{
						value: 'zh-cn',
						name: this.$t('language.zhCn')
					},
					{
						value: 'en-us',
						name: this.$t('language.enUs')
					}
				],
				currentSelect: 'zh-cn'
			}
		};
	},
	computed: {},
	onShow() {
		(async () => {
			uni.setNavigationBarTitle({
				title: this.$t('login.title')
			});
			
			//设置默认选中的中英文
			this.dialogSelectData.currentSelect = getLang();

			//#ifdef MP

			//获取授权状态
			this.status = await getSetting();

			//获取服务商信息
			let provider = await getProvider();

			//获取code
			this.code = await getCode(provider[0]);

			//#endif
		})();
	},
	onLoad(e) {},
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
	onPullDownRefresh() {},
	onReachBottom() {},
	
	
	methods: {
		...mapMutations(['setAccessToken', 'setUserInfo']),
		
		/**
		 * 切换登陆方式
		 */
		changeLogin(){
			this.loginWay=!this.loginWay;
		},
		//获取验证码
		getValidCode(){
			this.page++;
			uni.showLoading({
				title: this.$t('loading')
			});
					
			this.$request.send(
				'vip/Account/sendValidCode', {
					//current: this.page
					mobile:this.inputValue.inputUsername,
					operateType: 1,
					captchaCode:"",
					current_time:""
				},
				data => {
					if (data.code == 1) {
						//this.followDataList = data.data.list;
						//console.log(data.msg)
						console.log(data)
						//console.log(this.followDataList)
					}
				}
			);
			console.log("获取验证码")
		},
		//登录
		login(){
			//判断登录类型————账号密码登录
			if(this.loginWay!=true){
				
				this.page++;
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$request.send(
					'vip/Account/login', {
						//current: this.page
						username:this.inputValue.inputUsername,
						password:this.inputValue.inputPassword,
						loginMode:1,
						mp_id:14
						
					},
					data => {
						if (data.code == 1) {
							console.log(data.msg)
						
							this.setUserInfo(data.data)
							this.setAccessToken(data.data.access_token)
							
							uni.switchTab({
								url:'/pages/user/index'
							})
						}
					}
				);
				
				//验证码登录
			}else{
				console.log("验证码登录")
				
				this.page++;
				uni.showLoading({
					title: this.$t('loading')
				});
						
				this.$request.send(
					'vip/Account/login', {
						//current: this.page
						mobile:this.inputValue.inputUsername,
						verifyCode:this.inputValue.inputPassword,
						loginMode:2,
						mp_id:14
						
					},
					data => {
						if (data.code == 1) {
							console.log(data.msg)
							this.$userInfo=data
							uni.switchTab({
								url:'/pages/user/index'
							})
						}
					}
				);
			}
		},

		
		
		
		//显示中英文切换弹窗
		languageSwitch: function(e) {
			this.$refs.popup.open();
		},
		//选择中英文事件
		switchLangFunction: function(e) {
			 
			let lang = 'zh-cn';
			let selectLang = e.swithcSelectItem.detail.value;
			if (typeof selectLang != 'undefined' && selectLang != null && selectLang != '') {
				lang = selectLang;
			}

			this.dialogSelectData.currentSelect = lang;

			this.setLang(lang);
			this.$i18n.locale = lang;

			//重新设置下拉语言包
			this.dialogSelectData.items = [
				{
					value: 'zh-cn',
					name: this.$t('language.zhCn')
				},
				{
					value: 'en-us',
					name: this.$t('language.enUs')
				}
			];
		},
		...mapMutations([
			'setPayUrl',
			'setStockNumAmple',
			'setFirstPage',
			'setAccessToken',
			'setIsAuth',
			'setDistributorId',
			'setH5url',
			'setUserInfo',
			'setShareConfig',
			'setParentDistributorId',
			'setTempDistributorId',
			'setIdentityRequired',
			'setDistributorTypeName',
			'setLang'
		]),
		/**
		 * h5里微信登录
		 */
		h5WeChatLogin() {
			//判断本地是否有unionid，没有则跳转到微信系统授权
			console.log('h5WeChatLogin ...');
			if (!isWeixinH5()) {
				uni.showToast({
					icon: 'none',
					title: this.$t('login.pleaseOpenInWechat'),
					duration: 2000
				});
				return;
			}
		},
		forgetPassword(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/login/forget'
			});
		},
		register(e) {
			this.h5WeChatLogin();
		},
		verification(e) {
			console.log(e);
			uni.redirectTo({
				url: '/pages/login/verification'
			});
		},
		/**
		 * 微信授权登陆
		 * @param {Object} e
		 */
		getuserinfo(e) {
			//存储 openid 和 unionid 到本地
			let _that = this;

			//如果当前appid在本地存储了unionid 则直接登录

			if (!this.code) {
				uni.showToast({
					icon: 'none',
					title: this.$t('loading'),
					duration: 2000
				});
				return;
			}
			if (e.detail && e.detail.errMsg == 'getUserInfo:ok') {
				e.detail.code = this.code; //add code

				console.log('e.detail=');
				console.log(e.detail);

				//获取用户unionid
				getWechatUserInfoByCode(e.detail, res => {
					console.log('getWechatUserInfoByCode callback=');
					console.log(res);

					let data = {
						unionid: res.data.unionid,
						openid: res.data.openid,
						loginMode: 3
					};

					//禁用登陆按钮，避免重复触发
					_that.loginBtnLoading = true;
					_that.loginBtnDisabled = true;

					//请求服务器登录
					userLogin(data, res => {
						if (res.code == -2) {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}

						//返回错误后，开启登陆按钮状态
						_that.loginBtnLoading = false;
						_that.loginBtnDisabled = false;
					});
				});
			} else {
				//授权成功之后的回调
				uni.showToast({
					icon: 'none',
					title: '已拒绝授权',
					duration: 2000
				});
				//用户拒绝授权
				this.status = 0;
			}
		},
		openSetting() {
			uni.showModal({
				title: '提示',
				content: '你已经取消过授权，需设置授权权限',
				confirmText: '设置',
				success: function(res) {
					if (res.confirm) {
						uni.openSetting({
							success(res) {}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		/**
		 * 账号+密码登录
		 * @param {Object} e
		 */
		signIn(e) {
			let _that = this;

			let data = {
				username: this.formData.userName,
				password: this.formData.password,
				loginMode: 1
			};

			//禁用登陆按钮，避免重复触发
			_that.loginBtnLoading = true;
			_that.loginBtnDisabled = true;

			//请求服务器登录
			userLogin(data, res => {
				if (res.code == -2) {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}

				//返回错误后，开启登陆按钮状态
				_that.loginBtnLoading = false;
				_that.loginBtnDisabled = false;
			});
		}
	}
};
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}

	.login_logo{
		width: 670rpx;
		height: 100rpx;
		margin: 20rpx 40rpx 120rpx;
		display: flex;
		justify-content: center;
		text-align: left;
		display: flex;
		image{
			width:	100rpx;
			height: 100%;
			margin-right: 20rpx;
		}
		
		.text{
			line-height: 55rpx;
			.tit {
				font-size: 36rpx;
				font-family: "Microsoft Yahei";
			}
			
			.intro {
				font-size: 24rpx;
			}
		}
	}
	
	.login_body{
		width: 100%;
		height: 534rpx;
		display: flex;
		flex-direction:column;
		.login_input_box{
			width: 600rpx;
			height: 206rpx;
			padding: 0 30rpx;
			margin: 0 auto;
			border: 1rpx solid #d3d3da;
			border-radius: 10rpx;
			display: flex;
			flex-wrap:wrap;
			.login_input_box_up{
				width: 400rpx;
				height: 104rpx;
				input{
					margin: 30rpx 0;
				}
			}
			.font-box{
				width: 200rpx;
				height: 60rpx;
				background-color: #007AFF;
				margin: auto 0;
				text-align: center;
				line-height: 60rpx;
				.font{
					font-size: 28rpx;
					color: #FFFFFF;
				}
			}
			.login_input_box_down{
				border-top: 1rpx solid #C0C0C0;
				width: 600rpx;
				height: 104rpx;
				input{
					margin: 30rpx 0;
				}
			}
		}
		
		.login_change{
			width: 180rpx;
			height: 50rpx;
			font-size: 28rpx;
			text-align: right;
			line-height: 50rpx;
			margin: 10rpx 40rpx 180rpx 526rpx;
			color: rgba($color: #666666, $alpha: 1.0);
			
		}
		
		.login_button{
			width: 665rpx;
			height: 90rpx;
			border-radius: 5rpx;
			button{
				background-color: #007AFF;
				color: #FFFFFF;
			}
			margin: 0 auto;
		}
	}

</style>
