<template>
	<view class="mySetting">
		<uni-list class="personal-info">
			<uni-list-item title="个人信息" />
		</uni-list>
		<view class="separate-line"></view>
		<uni-list class="other-settings">
			<uni-list-item class="setting-item" title="绑定微信" :showArrow="false" rightText="已绑定" />
			<uni-list-item class="setting-item" title="修改手机绑定" rightText="18588275631" />
			<uni-list-item class="setting-item" title="身份认证" />
			<uni-list-item class="setting-item" title="修改登录密码" />
		</uni-list>
		<view class="logout" @click="logout"><button>退出当前账号</button></view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {

			};
		},

		methods: {
			...mapMutations(['setLang', 'setAccessToken']),
			...mapActions(['getUserInfo', 'getAccessToken']),
			
			logout() {
				let that=this
				
				uni.showModal({
					title: '提示',
					content: '确认退出登录？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							
							
							that.$request.send('vip/Account/logOut', {}, data => {
								console.log("请求成功");
								that.setAccessToken('');
								uni.reLaunch({
									url: '/pages/index/index'
								});
							});
							
							/* uni.clearStorage();
							uni.redirectTo({
								url: "/pages/login/login"
							}) */
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.mySetting {
		padding: 30rpx 30rpx 0;

		.personal-info {
			border-radius: 10rpx;
		}

		.separate-line {
			height: 30rpx;
		}

		.other-settings {
			border-radius: 10rpx;

			.setting-item {
				height: 120rpx;
			}
		}

		.logout {
			button {
				background-color: #008dff;
				color: #FFFFFF;
				font-size: 28rpx;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 5rpx;
			}

			margin-top: 50rpx;
		}
	}
</style>
