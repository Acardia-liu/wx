<template>
	<view>
		<view class="">
			<view class="text">
				<radio-group @change="radioChange">
					<label class="text-one" v-for="(item, index) in items" :key="item.value">
						<view class="radio"><radio color="#30C58D" :value="item.value" :checked="item.value === currentLang" class="form-radio" /></view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
import { getLang } from '@/common/util.js';
import { mapMutations } from 'vuex';

export default {
	data() {
		return {
			items: [
				{
					value: 'zh-cn',
					name: this.$t('language.zhCn')
				},
				// {
				// 	value: 'zh-tw',
				// 	name: this.$t('language.zhTw')
				// },
				{
					value: 'en-us',
					name: this.$t('language.enUs')
				}
			],
			currentLang: 'zh-cn'
		};
	},
	async onLoad(e) {
		//设置标题
		uni.setNavigationBarTitle({
			title: this.$t('language.title')
		});

		this.currentLang = getLang();
	},
	methods: {
		...mapMutations(['setLang']),
		radioChange: function(evt) {
			let lang = evt.detail.value;
			console.log(lang);

			this.setLang(lang);
			this.$i18n.locale = lang;

			//返回上一页
			uni.navigateBack({});
		}
	}
};
</script>

<style>
.text {
	background-color: #fff;
	margin-top: 20upx;
}
.text-one {
	padding: 26upx;
	border-bottom: 1px solid #ededed;
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
}
.form-radio {
	transform: scale(0.9);
}
</style>
