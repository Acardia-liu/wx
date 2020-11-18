<template>
	<view>
		<view class="follow-one">
			<view class="follow">
				<view class="follow-fips">
					<text>{{ $t('setUp.tip') }}:{{ $t('setUp.relatives') }}</text>
					<button type="default">{{ $t('setUp.followAll') }}</button>
				</view>

				<view v-for="(item, index) in followDataList" class="follow-people">
					<view class="people-block">
						<view class="people-text">
							<text>{{ item.alias_name }}</text>
							<text class="people-text-one-time">{{ $t('setUp.deviceNo') }}：{{ item.device_no }}</text>
						</view>
						<view class="people-button">
							<button type="default">{{ $t('setUp.lnvite') }}</button>
						</view>
					</view>
					<template v-if="item.followDataList.length == 0">
						<view class="people-block-one">{{ $t('setUp.noFollowers') }},{{ $t('setUp.please') }}</view>
					</template>
					<template v-if="item.followDataList.length > 0">
						<view v-for="(item2, index2) in item.followDataList" class="people-block-two">
							<view class="people">
								<view class="people-text-one">
									<text>{{ item2.nickname }}</text>
									<text class="people-text-one-time">{{ $t('setUp.followTime') }}：{{ item2.create_time_text }}</text>
								</view>
								<view class="people-button-one">
									<button type="default">{{ $t('setUp.relieve') }}</button>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			page: 0,
			followDataList: []
		};
	},
	methods: {
		/**
		 * 加载列表
		 */
		getVipUserDeviceShareDataList() {
			this.page++;

			uni.showLoading({
				title: this.$t('loading')
			});

			this.$request.send(
				'vip/VipUserDeviceShare/getList',
				{
					current: this.page
				},
				data => {
					if (data.code == 1) {
						this.followDataList = data.data.list;
					}
				},
				null,
				false,
				'GET'
			);
		}
	},
	onShow() {
		//设置标题
		uni.setNavigationBarTitle({
			title: this.$t('setUp.focusOnPeople')
		});
	},
	async onLoad(e) {
		this.getVipUserDeviceShareDataList();
	},
	onPullDownRefresh() {
		this.page = 0;
		this.getDeviceDataList();
	}
};
</script>

<style>
page {
	background: #f2f2f2;
}
.follow-one {
	padding: 30upx;
}
.follow-fips > text {
	font-size: 26upx;
	color: #666;
}
.follow-fips > button {
	margin-top: 30upx;
	background: #30c58d;
	color: #fff;
	border-radius: 100upx;
	font-size: 28upx;
}
.follow-people {
	background: #fff;
	margin-top: 30upx;
	border-radius: 10upx;
	padding-bottom: 30upx;
}
.people-text {
	display: flex;
	flex-direction: column;
}
.people-button > button {
	font-size: 26upx;
	color: #fff;
	background: #30c58d;
	border-radius: 100upx;
	width: 120upx;
	height: 60upx;
	line-height: 60upx;
}
.people-block {
	padding: 20upx 30upx;
	border-bottom: 1px solid #ededed;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.people-block-one {
	text-align: center;
	padding: 80upx 0;
	color: #999;
}
.people-block-two {
	padding: 0 30upx;
}
.people {
	background: #f2f4f7;
	margin-top: 30upx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 30upx;
	border-radius: 10upx;
}
.people-button-one button {
	width: 120upx;
	height: 60upx;
	line-height: 60upx;
	font-size: 26upx;
	border-radius: 100upx;
	background-color: #fff;
	border: 1px solid #30c58d;
	color: #30c58d;
}
.people-text-one {
	display: flex;
	flex-direction: column;
}
button::after {
	border: none;
}
.people-text-one-time {
	font-size: 26upx;
	color: #666;
}
</style>
