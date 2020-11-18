<template>
	<view>
		<view v-if="followDataListD.length==0?'flag':''">
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
		<view class="example-body" v-for="(item,index) in followDataListD" :key="index">
			<uni-card :isShadow="true" :title="item.nickname==null?defaultName:item.nickname" :subTitle="item.create_times" mode="title"
			 :thumbnail="item.headimg_url_show" note="true" @click="clickCardD(index)">
				<view>
					<view class="content-box-texta">{{item.content}}</view>
					<view class="image-box" v-show="item.img_urls_show.length !== 0">
						<image class="image" mode="aspectFill" :src="item.img_urls_show" />
					</view>
					<view class="content-box">
						<!-- <view>用户id为+++++++{{item.id}}+++</view> -->
						<view class="content-box-text">{{item.address}}</view>
					</view>
				</view>
				<template slot="footer">
					<view class="footer-box">
						<view @click.stop="footerClickD(index)" class="dibulan">
							<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-dianzan.png" mode="aspectFill"></image>
							<view class="footer-box__item">
								{{item.like_num}}
							</view>
						</view>
						<view @click.stop="footerClickB(item.id)" class="dibulan">
							<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-pinglun.png" mode="aspectFill"></image>
							<view class="footer-box__item">
								{{item.comments_num}}
							</view>
						</view>
						<view @click.stop="footerClickB(item.id)" class="dibulan">
							<image style="margin-right: 10rpx;" class="image-tupian" src="/static/images/discovery/icon-chakan2.png" mode="aspectFill"></image>
							<view class="footer-box__item">
								{{item.look_num}}
							</view>
						</view>
						<view @click.stop="footerClickB(item.id)" class="dibulan">
							<view v-if="item.is_public==1" class="check_IsPublic">{{show}}</view>
							<view v-if="item.is_public!=1" class="check_IsPublic" style="color: #f5a300;">{{noshow}}</view>
						</view>
					</view>
				</template>
			</uni-card>
		</view>
		<view class="isOver" v-if="flag">没有更多数据了</view>
	</view>
</template>

<script>
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	export default {
		components: {
			uniCard,
			uniSection
		},
		onShow() {
			this.getActivityTypeD()
		},
		onLoad() {
			this.getActivityTypeD()
		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.followDataListD.length);
			// this.current_id = 1
			// this.followDataListD = []
			setTimeout(() => {
				this.getActivityTypeD(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		onReachBottom() {
			console.log(this.followDataListD.length);
			if(this.followDataListD.length==this.total){
				return this.flag = true
			}
			this.getActivityTypeD()
			console.log("触底了");
		},
		data() {
			return {
				current_id: 1,
				total:1,
				show:"公开",
				noshow:"隐藏",
				flag:false,
				followDataListD: []
			}
		},
		methods: {
			getActivityTypeD() {
				uni.showLoading({
					title: this.$t('loading')
				});

				this.$request.send(
					'vip/Find/getDynamicList', {
						current: this.current_id,
						type: 3
					},
					data => {
						if (data.code == 1) {
							if (this.current_id == 1) {
								this.followDataListD = []
							}
							this.followDataListD = [...this.followDataListD, ...data.data.list];
							this.total = data.data.page.total
							// console.log(data)
							// console.log(this.followDataList)
							console.log("+++++++++++++++++++++++");
							console.log(this.followDataListD);
						}
					}
				);

			},
			clickCardD(index) {
				let obj = this.followDataListD[index];
				let id = obj.id;
				let time = obj.create_times;
				let is_public = obj.is_public;
				uni.navigateTo({
					// url: "/pages/discovery/detail?id=" + id
					// url: "/pages/discovery/detail",
					url: "/pages/user/trends/mydetails?id=" + id + "&is_public=" + is_public
					// url: "/pages/discovery/focus"
					// url: "/pages/login/login"
				})
			},
			footerClickD(index) {
				let that = this;
				let id = that.followDataListD[index].id;
				that.$request.send(
					'vip/User/userFollow', {
						id: that.id,
						type: 3
					},
					data => {
						if (data.code == 1) {
							if (data.data.exist == true) {
								that.followDataListD[index].like_num += 1;

							} else {
								that.followDataListD[index].like_num -= 1;
							}
							// this.followDataList = [...this.followDataList, ...data.data.list];
							//this.count = data.data
							// console.log(data)
							// console.log(this.followDataList)
						}
					}
				);

			},
			footerClickB(id) {
				uni.navigateTo({
					url: "/pages/user/trends/mydetails?id=" + id
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/common/uni-nvue.scss';

	.contentA {

		.tradeA {
			display: flex;
			justify-content: space-around;
			font-size: 14px;
			background-color: #FFFFFF;
			line-height: 38px;

			.textsA {
				text-align: center;
				width: 24%;
			}

			.active {
				border-bottom: 4upx solid #008DFF;
			}


		}
	}

	.example-body {
		uni-card {
			display: flex;
		}
	}

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #efeff4;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 1px 0;
	}

	.example-box {
		margin: 12px 0;
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		height: 350rpx;
		overflow: hidden;
	}

	.image {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.content-box-texta {
		font-size: 14px;
		line-height: 15px;
		padding-bottom: 20rpx;
		color: #1D2023;
	}

	.content-box-text {
		font-size: 12px;
		line-height: 22px;
		color: #30C58D;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 2px 0;
		font-size: 12px;
		color: #666;
	}

	.check_IsPublic {
		display: flex;
		width: 30px;
		color: #40ca96;
		font-size: 12px;
	}

	.footer-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

	}

	.dibulan {
		display: flex;
		margin-left: 10px;
		margin-right: 40px;

	}

	.footer-box__item {
		align-items: center;
		font-size: 13px;
		color: #666;
	}

	.image-tupian {
		max-width: 40rpx;
		max-height: 40rpx;
	}

	.isOver {
		width: 100%;
		height: 45px;
		margin-top: 46rpx;
		background-color: #efeff4;
		line-height: 45px;
		text-align: center;
		font-size: 14px;
		color: #606c71;
	}
</style>
