<template>
	<view class="customer-box">
		<uni-popup ref="customer-popup" type="center">
			<view class="popup-box">
				<view class="popup-header">
					<view class="">
						咨询客服
					</view>
					<view @click="close" class="close-icon">
						<uni-icons type="close" color="#999999" size="24"></uni-icons>
					</view>
				</view>

				<view class="phone-number">
					<view>客服：{{phoneNum}}</view>
					<view @click="callNum">
						<image src="/static/phone.png" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		uniPopup,
		uniIcons
	} from '@dcloudio/uni-ui';

	export default {
		components: {
			uniPopup,
			uniIcons
		},
		data() {
			return {
				phoneNum: ''
			};
		},
		created() {
			if (this.$store.state.kfPhoneNum) {
				this.phoneNum = this.$store.state.kfPhoneNum;
			} else {
				this.$store.dispatch('getPhoneNum').then(res => {
					this.phoneNum = res.KF_CONCAT_PHONE;
				})
			}
		},
		methods: {
			close() {
				this.$refs['customer-popup'].close();
			},
			open() {
				this.$refs['customer-popup'].open();
			},
			callNum() {
				uni.makePhoneCall({
					phoneNumber: this.phoneNum
				});
			}
		}

	}
</script>

<style>
	.popup-box {
		background-color: #fff;
		border-radius: 5px;
		width: 80vw;
	}

	.popup-header {
		font-weight: 700;
		font-size: 14px;
		text-align: center;
		position: relative;
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;
	}

	.close-icon {
		position: absolute;
		top: 5px;
		right: 5px;
	}

	.phone-number {
		border-top: ;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 30rpx;
	}

	.phone-number image {
		width: 60rpx;
		height: 60rpx;
	}
</style>
