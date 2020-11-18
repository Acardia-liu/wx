<template>
	<view class="dialog-layout">
		<view class="">
			<view class="uni-title" @click="languageSwitch">{{ title }}</view>
		</view>
		<scroll-view class="scroll-view_H" scroll-y="true">
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in itemsArr" :key="item.value">
						<view><radio :value="item.value" :checked="item.value === currentSelect" /></view>
						<view>{{ item.name }}</view>
					</label>
				</radio-group>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	name: 'YJYDialogSelect',
	props: {
		title: {
			type: String,
			default: 'Title'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		itemIndex: {
			type: Number,
			default: 0
		},
		confirmlText: {
			type: String,
			default: '确认'
		},
		dialogSelectData: {
			type: Object,
			default: {
				type: 'dialog',
				items: [],
				currentSelect: ''
			}
		}
	},
	inject: ['popup'],
	data() {
		return {
			itemsArr: [],
			currentSelect: ''
		};
	},
	methods: {
		radioChange(swithcSelectItem) {
			//如果当前点击的和当前选中的不一样，才调用切换方法
			this.$emit('switchFunction', { swithcSelectItem, ...{ index: this.itemIndex } });
			//关闭弹窗
			this.popup.close();
		}
	},
	created() {
		this.itemsArr = this.dialogSelectData.items;
		this.currentSelect = this.dialogSelectData.currentSelect;
	}
};
</script>

<style lang="scss" scoped>
.dialog-layout {
	width: 500upx;
	// height: 500upx;
	padding-bottom: 40upx;
	background-color: #ffffff;
	border-radius: 20upx;
	.uni-title {
		text-align: center;
	}

	.uni-list:after {
		height: 0 !important;
	}
	
	.scroll-view_H{
		max-height: 500upx;
	}
}
</style>
