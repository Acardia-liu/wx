<template>
	<view>
		<view class="record-list">
			<yjy-empty v-if="handleResultItemDataList.length == 0" :text="$t('noRecord')" textColor="#777777"></yjy-empty>
			<view v-for="(item, index) in handleResultItemDataList" :key="index" class="problem">
				<view class="one">{{ index + 1 }}</view>
				<view class="ask">
					<text style="font-weight: bold;">{{ item.content }}</text>
					<view class="ask-one">
						<view class="ask-one-head">
							<view>
								<text>
									{{ $t('notice.result') }}：
									<text class="text-color">{{ item.handle_button_text }}</text>
								</text>
							</view>
							<view>
								<text>
									{{ $t('notice.reason') }}：
									<text class="text-color">{{ item.choose_text_result }}</text>
								</text>
							</view>
							<view>
								<text>
									{{ $t('notice.time') }}：
									<text class="text-color">{{ item.handle_time_text }}</text>
								</text>
							</view>
							<view>
								<text>
									{{ $t('notice.remark') }}：
									<text class="text-color">{{ item.handle_remark }}</text>
								</text>
							</view>
							<view>
								<text>
									{{ $t('notice.mercuryTemp') }}：
									<text class="text-color">{{  tempShowFormtter(item.mercury_temp) }}</text>
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'NoticeResultItem',
	data() {
		return {};
	},
	props: {
		handleResultItemDataList: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style lang="scss" scoped>
.record-one {
	/* padding: 30upx; */
	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
}
.problem {
	display: flex;
	flex-direction: row;
	/* width: 100%; */
	padding: 0 30upx;
}
.one {
	width: 40upx;
	height: 40upx;
	background: #15bbf5;
	color: #fff;
	border-radius: 30upx;
	text-align: center;
	margin: 30upx 20upx 30upx 0;
}
.ask {
	width: 95%;
	border-top: 1px solid #ededed;
	padding: 30upx 0;
}
.ask-one {
	display: flex;
	background: #f2f4f7;
	padding: 20upx;
	border-radius: 10upx;
	margin-top: 20upx;
}
.ask-one-head {
	color: #666;
}
.text-color {
	color: #000;
}
</style>
