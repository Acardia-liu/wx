<template>
	<view class="yjy-switch-container" :style="{ 'border-color': '' + defaultColor }">
		<view
			class="yjy-switch-item"
			:class="{
				'yjy-switch-selected': defaultValue == item.key ? true : false
			}"
			@click="selectItem(item)"
			v-for="item in switchArr"
			:style="{
				color: (defaultValue == item.key ? true : false) ? highColor : defaultColor,
				background: (defaultValue == item.key ? true : false) ? defaultColor : ''
			}"
			:key="item.key"
		>
			<i v-if="switchType == 'icon'" class="uni-icon " :class="item.value"></i>
			<view v-if="switchType == 'text'">{{ item.value }}</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'YJYSwitch',
	props: {
		defaultValue: {
			type: Number,
			default: 0
		},
		itemIndex: {
			type: Number,
			default: 0
		},
		highColor: {
			type: String,
			default: '#30C58D'
		},
		defaultColor: {
			type: String,
			default: '#FFFFFF'
		},
		switchType: {
			type: String,
			default: 'text'
		},
		switchList: {
			type: Array,
			default: [
				{
					key: 0,
					value: '是'
				},
				{
					key: 1,
					value: '否'
				}
			]
		}
	},
	data() {
		return {
			switchArr: [],
		};
	},
	methods: {
		selectItem(swithcSelectItem) {
			
			//如果当前点击的和当前选中的不一样，才调用切换方法
			if (this.defaultValue != swithcSelectItem.key) {
				this.$emit('switchFunction', { swithcSelectItem, ...{index:this.itemIndex} });
			}
		}
	},
	created() {
		for (let i = 0; i < 2; i++) {
			const arrItem = {
				key: this.switchList[i].key,
				value: this.switchList[i].value
			};
			 
			this.switchArr.push(arrItem);
		}
	}
};
</script>

<style lang="scss" scoped>
.yjy-switch-container {
	padding: 2upx;
	display: flex;
	flex-direction: row;
	border-radius: 100upx;
	border: 4upx solid $uni-color-primary;
	padding: 6upx;
}
.yjy-switch-item {
	color: $uni-color-primary;
	font-size: 30upx;
	width: 60upx;
	height: 44upx;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.4s ease-in-out;
}
.yjy-switch-selected {
	color: #ffffff;
	border-radius: 40upx;
	background: $uni-color-primary;
}

.yjy-switch-item i {
	font-size: $uni-font-size-lg;
}
</style>
