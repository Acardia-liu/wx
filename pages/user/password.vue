<template>
	<view class="">
		
		<view class="ChangePassword">
			<view class="password">
				<text>{{$t ('password.usedPassword')}}</text>
				<input type="text" v-model="formData.old_password" value="" :placeholder="$t ('password.OldPasswordl')" />
			</view>
			<view class="password line">
				<text>{{$t ('password.newPasswordi')}}</text>
				<input type="text" v-model="formData.new_password" value="" :placeholder="$t ('password.NewPasswordl')" />
			</view>
			<view class="password line">
				<text>{{$t ('password.confirmPassword')}}</text>
				<input type="text" v-model="formData.confirm_new_password" value="" :placeholder="$t ('password.ConfirmPasswordl')" />
			</view>
		</view>
		
		<view class="password-button">
			<button type="default" @click="changePassword">{{$t ('password.confirmButton')}}</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 0,
				formData: {
					old_password:'',
					new_password:'',
					confirm_new_password:''
				}
			};
		},
		methods:{
			changePassword() {
			
				uni.showLoading({
					title: this.$t('loading')
				});
			
				this.$request.send(
					'vip/User/changePassword',
					{
						...this.formData
					},
					data => {
						if (data.code == 1) {
							// this.deviceDataList = data.data.list;
						}
					},
					null,
					false,
					'GET'
				);
			},
		},
		
		onShow() {
			//设置标题
			uni.setNavigationBarTitle({
				title: this.$t('password.changePassword')
			});
		},
		async onLoad(e) {
			this.getChangePasswordDataList();
		},
		onPullDownRefresh() {
			this.page = 0;
			this.getDeviceDataList();
		}
	};
</script>

<style>
	.ChangePassword{
		background: #fff;
		margin-top: 30upx;
		padding: 0 30upx;
	}
	.password{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 30upx 0;
	}
	.password-button{
		margin-top: 140upx;
		padding: 0 30upx;
	}
	.password-button > button{
		background: #30C58D;
		font-size: 32upx;
		color: #fff;
		border-radius: 100upx;
	}
	.line{
		border-top: 1px solid #dedede;
	}
	.password > input{
		width: 60%;
		text-align: right;
	}
</style>
