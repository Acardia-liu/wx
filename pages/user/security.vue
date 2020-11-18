<template>
	<view>
		<view class="security-one">
			<view class="security">
				<view class="security-text" @click="MobilePhone">
					<text>{{ $t('user.phone') }}</text>
					<i class="uni-icon uni-icon-forward flex">18588275631</i>
				</view>
				<view class="security-text line" @click="password">
					<text>{{ $t ('user.changePassword') }}</text>
					<i class="uni-icon uni-icon-forward flex"></i>
				</view>
				<!-- <view class="security-text line">
					<text>绑定微信</text>
					<i class="uni-icon uni-icon-forward flex">龍先生</i>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onShow() {
		//设置标题
		uni.setNavigationBarTitle({
			title: this.$t('user.accountAndSecurity')
		});
	},
	methods: {
		MobilePhone(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/login/forget'
			});
		},
		password(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/user/password'
			});
		},
	},
	async onLoad(e) {
		
		
		
	}
};
</script>

<style>
page {
	background: #f2f2f2;
}
.security-one {
	padding: 30upx;
}
.security {
	background: #fff;
	padding: 0 30upx;
	border-radius: 10upx;
}
.security-text {
	height: 90upx;
	line-height: 90upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.line {
	border-top: 1px solid #ededed;
}
.flex {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	color: #999;
	font-size: 28upx;
}
</style>
