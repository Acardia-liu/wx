<template>
	<!-- <view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<view class="price">
				<text>￥{{item.sell_price}}</text>
				<text>￥{{item.market_price}}</text>
			</view>
			<view class="name">
				{{item.title}}
			</view>
		</view>
	</view> -->
	<view class="details_list">
		<scroll-view>
			<view class="details_item" v-for="item in details" :key="item.id" @click="navigator(item.id)">
				<view v-if="followList.length==0?'flag':''">
					<image src="/static/images/equipment/equipment.png" style="
				max-width: 120px;
				max-height: 120px;
				margin: 300rpx 250rpx 150rpx ;
				position: fixed;
				">
						<view style="
				position: fixed;
				margin:560rpx 284rpx 0; 
				color:#8A8A8A ;">暂无更多数据
						</view>
					</image>
				</view>
				</uni-section>
				<view class="example-body" v-for="item in followList" :key="item.id">
					<uni-card :isShadow="true" :title="item.nickname" :subTitle="item.create_times" mode="title" :thumbnail="item.headimg_url_show"
					 extra="图片" note="true" @click="clickCard">
						<view>
							<view class="image-box" v-show="item.img_urls_show.length != 0">
								<image class="image" mode="aspectFill" :src="item.img_urls_show" />
							</view>
							<view class="content-box">
								<view class="content-box">
									<view class="content-box-texta">{{item.content}}</view>
									<view class="content-box-text">{{item.address}}</view>
								</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ['details'],
		methods: {
			navigator(id) {
				this.$emit("disItemClick", id)
			}
		}
	}
</script>

<style lang="scss">
	.details_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.details_item {
			background: #fff;
			width: 355rpx;
			margin: 20rpx 0 5rpx 0;
			padding: 15rpx;
			box-sizing: border-box;

			image {
				width: 80%;
				height: 150px;
				display: block;
				margin: auto;
			}

			.price {
				color: #007AFF;
				font-size: 36rpx;
				margin: 15rpx 0;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}

			.name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}
</style>
