<template>
	<view>

		<view class="forget">
			<view class="verification box">
				<view class="verif">
					<i class="uni-icon uni-icon-shouji"></i>
					<input type="text" class="inputone box " :placeholder="$t ('password.telephone')" />
				</view>
				<button type="default" class="">{{$t ('password.verification')}}</button>
			</view>
			<view class="verification">
				<i class="uni-icon uni-icon-anquan"></i>
				<input type="text" class="inputone box" :placeholder="$t ('password.verificationCode')" />
			</view>
			<view class="verification">
				<i class="uni-icon uni-icon-mima"></i>
				<input type="text" password="" class="inputone" :placeholder="$t ('password.newPassword')" />
			</view>
		</view>

		<view class="buttonone">
			<button type="default" class="">{{$t ('password.button')}}</button>
		</view>
		
	</view>
</template>

<script>
	export default{
		onShow() {
			//设置标题
			uni.setNavigationBarTitle({
				title: this.$t('password.forgetThePassword')
			});
		},
	}
</script>

<style>
page {
	background: #f2f2f2;
}
.verif{
	display: flex;
	flex-direction: row;
	align-items: center;
}
.box{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.verification{
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1px solid #ededed;
	/* color: #30C58D; */
}
.verification > i{
	font-size: 28upx;
	color: #30C58D;
}
.verif > i{
	font-size: 28upx;
	color: #30C58D;
}
.verification > button{
	background: #30C58D;
	font-size: 28upx;
	color: #fff;
	border-radius: 100upx;
	height: 60upx;
	line-height: 60upx;
	margin: 0;
}
.labelone{
	margin-left: 30upx;
}
.radio{
	color: #666;
}
.radio > radio{
	transform:scale(0.8);
}
.radio > text{
	color: #30C58D;
}

.testone{
	padding: 30upx;
	color: #999;
}
/* 
.verification{
	background-color: #30c58d;
	color: #fff;
	font-size: 28upx;
	border-radius: 100upx;
	width: 200upx;
	height: 60upx;
	line-height: 60upx;
	position: absolute;
	top: 15upx;
	right: 30upx;
} */
.forget {
	background-color: #ffffff;
	padding: 0 30upx;
	position: relative;
	margin-top: 20upx;
}
.forget > button{
	background-color: #30c58d;
	color: #fff;
	font-size: 28upx;
	border-radius: 100upx;
	width: 200upx;
	height: 60upx;
	line-height: 60upx;
	position: absolute;
	top: 15upx;
	right: 30upx;
}
.forget > input{
	font-size: 28upx;
}
.inputone {
	height: 90upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	/* color: #30C58D; */
}
/* .box {
	border-bottom: 1px solid #ededed;
} */

.buttonone > button{
	margin: 80upx 30upx 30upx 30upx;
	font-size: 32upx;
	background-color: #30c58d;
	color: #fff;
	border-radius: 100upx;
	height: 80upx;
}
button::after {
	border: none;
}
</style>
