<template>
	<view>
		<view class="first-box">
			<view　class="one-box">
				<view class="number">
					<view class="one">{{Gift.actJoinNum}}</view>
					<view class="two">{{Gift.vipUserNum}}</view>
					<view class="three">{{Gift.giftsNum}}</view>
				</view>
				<view class="introduce">
					<view>参加活动</view>
					<view>送礼人数</view>
					<view>礼物总数</view>
				</view>
			</view>
		</view>
		<view class="second-box">
			<view　class="two-box" v-for="(item,index) in GiftsList" :key="index">
				<view class="three-box">
					<view class="content-box">
						<image class="image" :src="item.headimg_url_text"></image>
						<view class="font-box">
							<view class="name">{{item.nickname}}
								<view style=
								"font-size: 14px;
								 color: #888888;
								 margin-left: 5px;
								 margin-top: 1.5px;">送给了我</view>
							</view>
							<view class="time">{{item.create_time_text}}</view>
						</view>

					</view>
					<view class="image-box">
						<view class="gift-box">
							<image class="images" :src="item.gift_icon_text"></image>
							<view class="gift-number">x{{item.number}}</view>
						</view>
						<view class="gift-font">{{item.giftname}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current_id: 1,
				GiftsList: [],
				Gift:[]
			}
		},
		onLoad() {
			this.getGiftsList()
		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.GiftsList.length);
			this.current_id = 1
			// this.GiftsList = []
			setTimeout(() => {
				this.getGiftsList(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		methods: {
			getGiftsList() {
				uni.showLoading({
					title: this.$t('loading')
				});
				this.$request.send(
					'vip/User/getGift', {
						current: this.current_id,
						size: 8
					},
					data => {
						if (data.code == 1) {
							if(this.current_id==1){
								this.GiftsList = []
							}
							this.Gift = data.data
							this.GiftsList = data.data.list;
							// console.log(data)
							console.log(this.GiftsList);
						}
					}
				);
			},
		}
	}
</script>

<style lang="scss">
	.first-box {
		display: flex;
		justify-content: space-around;
		padding-top: 14px;
		background-color: #FFFFFF;
		padding-bottom: 14px;
		border-bottom: solid 10px #E8E8E8;

		.one-box {
			width: 346px;
			height: 85px;
			border-radius: 8px;
			display: flex;
			flex-direction: column;
			background-color: #008DFF;

			.number {
				display: flex;
				margin-top: 20px;
				justify-content: space-around;
				color: #FFFFFF;

				.one {
					font-size: 18px;
				}

				.two {
					font-size: 18px;
				}

				.three {
					font-size: 18px;
				}
			}

			.introduce {
				display: flex;
				justify-content: space-around;
				font-size: 18px;
				color: #FFFFFF;
			}
		}
	}

	.second-box {
		background-color: #FFFFFF;

		.two-box {
			.three-box {
				display: flex;
				justify-content: space-between;
				border-bottom: solid 1px #E8E8E8;
				padding-top: 10px;
				padding-bottom: 10px;
				margin-left: 15px;

				.content-box {
					display: flex;

					.image {
						width: 50px;
						height: 50px;
						border-radius: 50%;
					}

					.font-box {
						margin-left: 15px;
						margin-top: 7px;

						.name {
							display: flex;
							padding-left: 5px;
							font-size: 16px;
							padding-bottom: 5px;
						}

						.time {
							font-size: 12px;
							color: #888888;
						}
					}
				}

				.image-box {
					.gift-box {
						display: flex;
						margin-bottom: 3px;
						margin-right: 20px;
						.gift-number{
							font-size: 12px;
							width: 19px;
							height: 19px;
							margin-top: 5px;
							margin-left: 5px;
							border-radius: 5px;
							color: #1afb0a;
							background-color: #deffe7;
						}
						.images {
							width: 30px;
							height: 30px;
							border-radius: 50%;
						}
					}
					.gift-font{
						font-size: 12px;
					}

				}


			}
		}
	}
</style>
