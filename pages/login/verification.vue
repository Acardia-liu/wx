<template>
	<view class="background signInBackground">
		<view class="location">
			<view class="location-logo">
				<image src="../../static/images/sign-in/logo.jpg" mode=""></image>
				<text>小温星</text>
			</view>

			<view class="input">
				<view class="input-text-input distance">
					<i class="uni-icon uni-icon-shouji"></i>
					<input type="text" placeholder="请输入账号" placeholder-style="color:#fff;opacity:0.5;font-size:28upx;" class="box input-box" />
				</view>
				<button type="default" class="obtain">获取验证码</button>
				<view class="input-text-input">
					<i class="uni-icon uni-icon-anquan"></i>
					<input type="text" placeholder="请输入密码" placeholder-style="color:#fff;opacity:0.5;font-size:28upx;" class="box input-box" />
				</view>
				<view class="verification-code"><text @tap="login">密码登录</text></view>
			</view>

			<view class="sign-in">
				<button class="button" type="default" @tap="signIn">登录</button>
				<view class="sign-in-text">
					<text @tap="password">忘记密码</text>
					<text style="margin: 0 20upx;">|</text>
					<text @tap="register">快速注册</text>
				</view>
				<view class="quick">
					<view class="line"></view>
					<view class="quick-sign-in-one" @click="WeChat">
						<view class="quick-sign-in uni-icon uni-icon-weixinfill"></view>
						<text>快捷登录</text>
					</view>
					<view class="line"></view>
				</view>
			</view>
			<view class="copyright">技术支持 易见源科技</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			page: 0,
			loadMoreStatus: 'more'
		};
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
	onPullDownRefresh() {},
	onReachBottom() {},
	methods: {
		WeChat() {
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(res.provider);
					if (~res.provider.indexOf('qq')) {
						uni.login({
							provider: 'qq',
							success: function(loginRes) {
								console.log(JSON.stringify(loginRes));
							}
						});
					}
				}
			});
		},

		password(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/login/forget'
			});
		},

		register(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/login/register'
			});
		},

		login(e) {
			console.log(e);
			uni.redirectTo({
				url: '/pages/login/login'
			});
		},

		signIn(e) {
			console.log(e);
			uni.switchTab({
				url: '/pages/index/inex'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
//yemi

.background {
	height: 100%;
}
// .input-style{
// 	color: #fff;
// }
.input-text-input{
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.input-text-input > i{
	font-size: 28upx;
}
.location {
	// position: absolute;
	// top: 150upx;
	color: #fff;
	padding: 0 70upx;
	width: -webkit-fill-available;
	height: 100%;
}
.location-logo {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 180upx;
}
.location-logo image {
	width: 130upx;
	height: 130upx;
	border-radius: 200upx;
	margin-bottom: 20upx;
}
.location-logo text {
	font-size: 34upx;
	font-weight: bold;
}
.input {
	margin: 80upx 0 100upx 0;
	position: relative;
}
.verification-code {
	margin-top: 10upx;
}
.input-box {
	height: 100upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 28upx;
}
.distance {
	margin-bottom: 20upx;
}
.verification-code {
	display: flex;
	flex-direction: row-reverse;
}
.sign-in > button {
	background: #fff;
	font-size: 32upx;
	color: #30c58d;
	border-radius: 100upx;
}
.sign-in-text {
	margin-top: 40upx;
	text-align: center;
}
.quick {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-top: 60upx;
}
.line {
	content: '';
	width: 160upx;
	border-bottom: 1px solid #ededed;
	opacity: 0.5;
}
.quick-sign-in {
	width: 80upx;
	height: 80upx;
	text-align: center;
	line-height: 90upx;
	border: 1px solid #ededed;
	border-radius: 100upx;
	margin-bottom: 10upx;
}
.quick-sign-in-one {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.copyright {
	width: 83%;
	position: absolute;
	bottom: 40upx;
	text-align: center;
	opacity: 0.5;
}
.uni-input-placeholder {
	color: #fff;
	opacity: 0.7;
}
.obtain {
	background-color: #fff;
	font-size: 24upx;
	color: #30c58d;
	border-radius: 100upx;
	width: 180upx;
	position: absolute;
	top: 30upx;
	right: 0;
}
button::after {
	border: none;
}
</style>
