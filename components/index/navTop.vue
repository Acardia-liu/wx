<template>
	<!-- 顶部导航 -->
	<view class="nav-top-list">
		<block v-for="(topBar,pindex) in topBars" :key="pindex">
			<view class="nav-list-bar">
				<view class="nav-bar" :class="topIndex==pindex?'active':''" @click="toptab(pindex,topBar.id)">
					{{topBar.name}}
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		//name:"topBars",
		data() {
			return {
			}
		},
		props:{
			topBars:Array,
			topIndex:Number,
			id:Number
		},
		methods: {
			toptab(pindex,pid) {
				this.$emit('toptap',pindex,pid)
				// console.log(pid)
				
			}
		}
	}
</script>

<style lang="scss">
	// 顶部导航
	.nav-top-list {
		display: flex;
		flex: 1;
		flex-direction: row;
		overflow: hidden;
		height: calc(100%-44px);
		text-align: center;
	
		.nav-list-bar {
			width: 150rpx;
	
			.nav-bar {
				height: 40px;
				line-height: 40px;
				display: inline-block;
				font-size: 15px;
				color: #7D7E80;
			}
	
			.active {
				border-bottom: 6rpx solid #007AFF;
				color: black;
			}
		}
	}
</style>
