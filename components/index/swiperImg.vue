<template>
	<view class="swiperImg">
		<swiper 
			indicator-dots="true" 
			indicator-active-color="#008DFF"
			autoplay="true" 
			circular="true" 
			interval="1000"
			class="swiper"
			>
			<block v-for="(item,index) in activityList.galleries" :key="index">
				<swiper-item>
					<image :src="item.img_url_text"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="zai" @click="zai(num)">
			<view class="z_icon icon iconfont icon-xin1"></view>
			<view class="z_num">{{num}}</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0,
			}
		},
		methods:{
			zai(num){
				if(num==0){
					this.num+=1
				}else{
					this.num-=1
				}
			}
		},
		props:{
			activityList:Object
		}
	}
</script>

<style lang="scss">
	.swiperImg{
		position: relative;
		height: 200px;
		.swiper{
			height: 100%;
		}
		image{
			width: 100%;
			height: 100%;
		}
		.zai{
			display: flex;
			position: absolute;
			bottom:10px;
			right: 0px;
			width: 48px;
			height: 28px;
			line-height: 28px;
			padding: 0 6px;
			background-color: #008DFF;
			border-radius:5px 0 0 5px;
			.z_icon{
				font-size: 18px;
				color: #FFFFFF;
			}
			.z_num{
				font-size: 12px;
				color: #FFFFFF;
				margin-left: 10px;
			}
		}
		.active{
			color: #FF0000;
		}
	}
	
</style>
