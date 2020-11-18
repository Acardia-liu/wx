<template>
	<view>
		<scroll-view>
			<view>
				<view class="last">
					<view class="lastBox">
						<image class="image" mode="aspectFill" :src="lastDetailDataList.headimg_url_show" />
						<view clas="in-box-l">
							<view class="content-box-text-l">{{lastDetailDataList.nickname==null?defaultName:lastDetailDataList.nickname}}</view>
							<view class="content-box-text-la">{{lastDetailDataList.create_times}}</view>
						</view>
					</view>
					<view class="in-text">
						{{lastDetailDataList.content}}
					</view>
					<view v-show="lastDetailDataList.img_urls_show != 0">
						<image class="last-image" mode="aspectFill" :src="lastDetailDataList.img_urls_show" />
					</view>

					<view class="address" v-show="lastDetailDataList.address!==null&&lastDetailDataList.address!==''">
						<image class="image-address" src="/static/images/discovery/icon-address.png" mode="aspectFill"></image>
						<view class="address-font">{{lastDetailDataList.address}}</view>
					</view>
				</view>
			</view>
			<view>
				<view class="check">
					<view class="checkContext">是否公开</view>
					<switch :checked="is_public==1?true:false" @change="switchChange" color="#30C58D" style="transform:scale(0.8);margin-right: 20rpx;" />
				</view>
				<view class="textBar">
					<view class="textContext">评论</view>
					<view class="img-box">
						<image class="image-tubiao" src="/static/images/discovery/icon-chakan2.png" mode="aspectFill">{{lastDetailDataList.look_num}}</image>
						<image class="image-tubiao" src="/static/images/discovery/icon-dianzan.png" mode="aspectFill">{{lastDetailDataList.like_num}}</image>
					</view>
				</view>
				<view class="example-body" v-for="item in DetailDataList" :key="item.id">
					<view class="image-box">
						<image class="image" mode="aspectFill" :src="item.headimg_url_show" />
						<view class="in-box">
							<view class="content-box-text">{{item.nickname}}</view>
							<view class="content-box-texta">{{item.create_time_text}}</view>
						</view>
					</view>
					<view class="content-box">
						<view class="content-box-textb">{{item.content}}</view>
					</view>
					<view class="block"></view>
				</view>
				<view class="comment-box">
					<input v-model="inputValue" class="comment" type="text" placeholder="说点什么吧..." style="text-indent: 10rpx;"></input>
					<view class="last-box">
						<image class="image-smile" src="/static/images/discovery/icon-smile.png"></image>
						<view class="font" @click="postComment()">发送</view>
					</view>
				</view>
			</view>
		</scroll-view>
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
		data() {
			return {
				inputValue: "",
				lastDetailDataList: [],
				DetailDataList: [],
				releaseDynamic: [],
				publicDynamic: 0,
				defaultName: "系统默认赋值",
				flag: false,
				flag_check: 1,
				current: 0,
				id_num: 0,
				id_comment: 0,
				is_public: 1,
				is_exist: false,
				id: 0,
				vip_user_id: 0,
				like_num: 0,
				current_id: 0
			};
		},
		onLoad(option) {
			// this.getActivityType(),
			// 	uni.getSystemInfo({
			// 		success: function(res) {
			// 			// console.log(res.windowHeight);
			// 			this.height_Num = res.windowHeight + 100
			// 			console.log(this.height_Num)
			// 		}
			// 	});
			this.id = option.id
			this.vip_user_id = option.vip_user_id
			this.getActivityType()
			console.log(option.id + "+++++++++++++");

		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.DetailDataList.length);
			// this.current_id = 1
			// this.followDataListD = []
			setTimeout(() => {
				this.getActivityType(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		onShareAppMessage(e) {
			let title = '+++分享成功+++'
			return {
				title: title,
				path: 'pages/user/trends/mydetails'
			}
		},
		// onReachBottom() {
		// 	console.log("触底了")
		// 	this.current_id++
		// 	this.getActivityType()
		// },
		methods: {
			switchChange(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
				if (e.target.value == true) {
					this.is_public = 1
				} else {
					this.is_public = 0
				}
				let that = this;
				let id = that.id_comment;
				let is_public = that.is_public;
				console.log(that.id);
				console.log(that.is_public);
				uni.showLoading({
					title: that.$t('loading')
				});
				that.$request.send(
					'vip/Find/publicDynamic', {
						id: that.id,
						is_public: that.is_public
					},
					data => {
						if (data.code == 1) {
							// data.data = this.is_public
							if (e.target.value == true) {
								that.is_public = 1
							} else {
								that.is_public = 0
							}

						}
						that.is_public = data.data
					}
				);

			},
			postComment() {
				let that = this;
				let obj = that.releaseDynamic;
				let id = this.id_comment;
				uni.showLoading({
					title: that.$t('loading')
				});
				// let id = this.id
				that.$request.send(
					'vip/Find/releaseDynamic', {
						dynamic_id: id,
						content: that.inputValue
					},
					data => {
						if (data.code == 1) {
							that.releaseDynamic = data.data;
							console.log(that.releaseDynamic);
						}
					}
				);
			},
			clickCard() {
				console.log("++++++++++");
			},
			getActivityType() {
				uni.showLoading({
					title: this.$t('loading')
				});
				// let id = this.id

				this.$request.send(
					'vip/Find/getDynamicDetail', {
						current: this.current_id,
						id: this.id
					},
					data => {
						if (data.code == 1) {
							this.DetailDataList = data.data.comment_list;
							this.lastDetailDataList = data.data
							this.like_num = data.data.like_num
							this.is_exist = data.data.is_exist
							this.id_comment = data.data.id
							this.is_public = data.data.is_public
							// console.log(data)
							console.log(this.DetailDataList);
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	page {
		margin-bottom: 50px;
	}

	.example-body {
		display: block;
		padding: 2px 0;
		border-bottom: #EEE9E9 1px solid;
		background-color: #FFFFFF;
		// margin-bottom: 10px;
	}

	.last {
		background-color: #FFFFFF;
	}

	.example-box {
		margin: 12px 0;
	}

	.lastBox {
		// border-top: #EDEDED 3px solid;
		display: flex;
		background-color: #FFFFFF;
	}

	.content-box-text-l {
		margin-top: 15px;
		margin-left: 5px;
		font-size: 16px;
	}

	.content-box-text-la {
		margin-top: 5px;
		margin-left: 5px;
		font-size: 24rpx;
		margin-bottom: 20px;
		color: #3f454b;
	}

	.mini-button {
		width: 80px;
		height: 100%;
		font-size: 12px;
		margin-left: 250rpx;
		margin-top: 22px;
		color: #FFFFFF;
		// font-color: #FFFFFF;
		// background-color: #30C58D;
		border-radius: 18px;
		// border: 2px solid #30C58D;
	}

	.check {
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-bottom: #FFFFFF 1px solid;
		margin-top: 10px;
		border-top: #FFFFFF 4px solid;
		padding-bottom: 10px;
		border-bottom: 1px solid #ecebe7;
	}

	.checkContext {
		width: 100%;
		flex-direction: row;
		margin-left: 15px;
		margin-top: 10px;

	}

	.textBar {
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		border-bottom: solid 1px #E8E8E8;
	}

	.textContext {
		width: 100%;
		flex-direction: row;
		margin-left: 15px;
		margin-top: 10px;
		font-weight: bold;
		
	}

	.img-box {
		display: flex;
		margin-top: 8px;
		margin-right: 20px;
		margin-block-end: 10px;
		margin-block-start: 10px;
	}

	.image-box {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: row;
		/* #endif */
		height: 100%;
		width: 100%;
		overflow: hidden;

	}

	.in-box {
		margin: 10px;
	}

	.in-text {
		margin-left: 15px;
		padding-bottom: 15px;
		margin-bottom: 10px;
		background-color: #FFFFFF;
	}

	.address {
		display: flex;
		color: #008DDF;
		font-size: 12px;
		margin-left: 15px;
		margin-top: 15px;
		margin-bottom: 15px;
	}

	.address-font {
		font-size: 12px;
	}

	.image-address {
		margin-bottom: 10px;
		max-width: 22px;
		max-height: 17px;
	}

	.image-tubiao {
		max-width: 22px;
		max-height: 22px;

		margin-left: 15px;
		flex: 1;
	}

	.image {
		max-width: 45px;
		max-height: 45px;
		margin-top: 10px;
		margin-left: 15px;
		flex: 1;
		border-radius: 45rpx;
		// border-radius: 100px 100px 	100px 100px;
	}

	.last-image {
		max-width: 450px;
		max-height: 450px;
		margin-top: 8px;
		margin-left: 15px;
	}

	.content-box {
		padding-top: 20rpx;
	}

	.block {
		// margin-top: 40px;
		// padding-top: 100px;
		// margin-top: -60px;
	}

	.content-box-texta {
		font-size: 12px;
		line-height: 15px;
		padding-top: 11px;
		color: #8B8386;
	}

	.content-box-text {
		font-size: 14px;
		line-height: 100%;
	}

	.content-box-textb {
		font-size: 14px;
		line-height: 22px;
		margin-left: 70px;
		margin-bottom: 22px;
	}

	.comment-box {
		display: flex;
		background-color: #f7f8fa;
		height: 55px;
		width: 100%;
		position: fixed;
		bottom: var(--window-bottom, 0);
		box-shadow:5px 5px 10px rgba(0,0,0,0.6);
	}

	.comment {
		margin-top: 10rpx;
		margin-left: 30rpx;
		padding-left: 20rpx;
		width: 540rpx;
		height: 80rpx;
		border-radius: 36rpx;
		background-color: #FFFFFF;
	
		font-size: 14px;
	}

	.last-box {
		display: flex;
		margin-top: 32rpx;
		margin-left: 12rpx;
	}

	.image-smile {
		width: 26px;
		height: 26px;
		margin-right: 5px;
	}

	.font {
		margin-top: 2rpx;
		color: #323233;
	}
</style>
