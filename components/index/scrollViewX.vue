<template>
	<view class="scroll-view-out">
		<scroll-view class="scroll-view_H" scroll-x="true" scroll-with-animation :scroll-left="tabLeft">
			<block v-for="(tab,bindex) in getDataList" :key="tab.id">
				<view class="scroll-view-item_H">
					<view :class="tabIndex==bindex?'bactive':''" @click="tabtap(bindex,tab.id)">
						{{tab.type_name}}
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabLeft:0
			}
		},
		props:{
			getDataList:Array,
			tabIndex: Number,
		},
		methods:{
			tabtap(bindex,bid) {
				this.$emit("tabtap",bindex,bid)
				// console.log(bid)
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-out {
		height: 44px;
		display: flex;
		overflow: hidden;
	
		.scroll-view_H {
			height: 50px;
			line-height: 50px;
			white-space: nowrap; // 滚动必须加的属性
			margin: 5px 0;
	
			.scroll-view-item_H {
				height: 30px;
				width: 160rpx;
				line-height: 30px;
				font-size: 15px;
				color: #008DFF;
				font-weight: 500;
				text-align: center;
				border: 1px solid #008DFF;
				border-radius: 5px;
				margin-right: 40rpx;
				display: inline-block;
				vertical-align: top;
	
				.bactive {
					background-color: #008DFF;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
