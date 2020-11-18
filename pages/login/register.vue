<template>
	<view>
		
		<view class="testone">
			<text>为了您更方便的找回密码，体验服务，请绑定手机号</text>
		</view>

		<view class="forget">
			<view class="verification box">
				<view class="verif">
					<i class="uni-icon uni-icon-shouji"></i>
					<input type="text" class="inputone box " placeholder="请输入手机号" />
				</view>
				<button type="default" class="">获取验证码</button>
			</view>
			<view class="verification">
				<i class="uni-icon uni-icon-anquan"></i>
				<input type="text" class="inputone box" placeholder="请输入验证码" />
			</view>
			<view class="verification">
				<i class="uni-icon uni-icon-mima"></i>
				<input type="text" password="" class="inputone" placeholder="请设置新密码，6-12位" />
			</view>
		</view>

		<view class="buttonone">
			<button type="default" class="">确定</button>
		</view>
		
		<view class="labelone">
			<label class="radio">
				<radio value="r1" color="#30C58D" />
				我已阅读并同意<text>《注册协议》</text>
			</label>
		</view>
		
	</view>
</template>

<script></script>

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
