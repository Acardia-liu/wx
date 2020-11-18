<template>
	<view>
		<uni-segmented-control class="title" :current="current" :values="items" @clickItem="onClickItem" style-type="text"></uni-segmented-control>

		<scroll-view>
			<view class="cardA" v-if="current === 0">
				<view v-if="ContainerUser.length==0?'flag':''">
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
				<view class="one-box" v-for="(item,index) in ContainerUser" :key="index">
					<view class="two-box">
						<image class="image" :src="item.headimg_url_show==''?defaultImage:item.headimg_url_show" mode="aspectFill" />
						<view class="content">{{item.nickname==null?defaultName:item.nickname}}</view>
					</view>
					<button class="button" @click="confirm(index)" plain="true">取消关注</button>
				</view>
			</view>
			<view class="cardB" v-if="current === 1">
				<view v-if="UserActivity.length==0?'flag':''">
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
				<view class="act_item" v-for="(content,index) in UserActivity" :key="index"  @click.stop="toActivityList(index)">
					<view>
						<view v-show="content.is_join" style="
						position: absolute;
						z-index: 2;
						margin-left: 28rpx;
						margin-top: 18rpx;
						width: 92rpx;
						height: 40rpx;
						  color: #FFFFFF;
						  background-color: #008dff;
						   border-radius: 10rpx;
							font-size: 24rpx;
							text-align:center;">{{content.is_join==false?'':'已参与'}}</view>
						<image :src="content.cover_img_show" class="image-style" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="tit">
							{{content.activity_name}}
						</view>
						<view class="info">
							<image src="/static/images/activity/shijian.png"></image>
							<text >活动时间：{{content.activity_start_time_text}}</text>
						</view>
						<view class="big-box">
							<view class="act-status" :style="{'background-color':statusColor[content.sign_status]}">
								<span class="font">
									{{content.sign_status==3?'已结束':'进行中'}}
								</span>
							</view>
							<button @click.stop="confirmAct(index)" class="mini-button" type="default" size="mini" plain="true">取消关注</button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniTag from "@/components/uni-tag/uni-tag.vue"
	import Modal from '@/components/x-modal/x-modal'
	export default {
		components: {
			uniSegmentedControl,
			uniTag,
			Modal
		},
		data() {
			return {
				show: false,
				items: ['关注的人', '关注的活动'],
				current: 0,
				ContainerUser: [],
				UserActivity: [],
				statusColor: {
					"3": "#969799", //已结束
					"2": "#30c58D" //进行中
				},
				defaultName: "系统默认赋值",
				defaultImage: '/static/images/discovery/icon-default.png'
			}
		},
		onLoad() {
			this.getFocusList(),
			this.getUserActivity()

		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			console.log(this.ContainerUser.length);
			console.log(this.UserActivity.length);
			this.current_id = 1
			// this.ContainerUser = []
			// this.UserActivity = []
			setTimeout(() => {
				this.getFocusList(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
			setTimeout(() => {
				this.getUserActivity(() => {
					uni.stopPullDownRefresh()
				})
			}, 800)
		},
		methods: {
			toActivityList(index){
				this.$request.send(
					'vip/User/getUserActivity', {
						current: 1,
						size: 6
					},
					data => {
						if (data.code == 1) {
							this.UserActivity = data.data.list;
						}
							this.activity_id = data.data.list[index].activity_id
					}
				);
				uni.navigateTo({
					url:"/pages/index/activityList?id="+this.activity_id
				})
			},
			confirm(index) {
				let that=this;
				uni.showModal({
				    title: '提示',
				    content: '确定取消关注',
				    success: function (res) {
				        if (res.confirm) {
						   let obj = that.ContainerUser[index];
						   let id = obj.follow_vip_user_id;
						   console.log("++++++++");
						   console.log(index);
						   console.log(id);
						   that.$request.send(
						   	'vip/User/userFollow', {
						   		id: id,
						   		type: 2
						   	},
						   	data => {
						   		if (data.code == 1) {
						   			that.ContainerUser.splice(index, 1)
						   		}
						   	}
						   );   
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			confirmAct(index) {
				let that=this;
				uni.showModal({
				    title: '提示',
				    content: '确定取消关注',
				    success: function (res) {
				        if (res.confirm) {
						   let obj = that.UserActivity[index];
						   let id = obj.activity_id;
						   console.log("++++++++");
						   console.log(index);
						   console.log(id);
						   that.$request.send(
						   	'vip/User/userFollow', {
						   		id: id,
						   		type: 1
						   	},
						   	data => {
						   		if (data.code == 1) {
						   			that.UserActivity.splice(index, 1)
						   		}
						   	}
						   );   
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			// ActivityClick(index) {
				// let obj = this.ContainerUser[index];
				// let id = obj.id;
				// console.log("++++++++");
				// console.log(index);
				// this.$request.send(
				// 	'vip/Activity/getDetails', {
				// 		id: id,
				// 		type: 2
				// 	},
				// 	data => {
				// 		if (data.code == 1) {
				// 			if (data.data.count == 0) {
				// 				// console.log(data.data);
				// 				// data.data.exist=false
				// 				this.ContainerUser.splice(index, 1)
				// 				data.code = 0
				// 			}

				// 			console.log(data.data);
				// 			// this.followDataList = [...this.followDataList, ...data.data.list];
				// 			//this.count = data.data
				// 			// console.log(data)
				// 			// console.log(this.followDataList)
				// 		}
				// 	}
				// );
			// },
			unActivity(index) {
				this.show = !this.show
			},
			unFollow(index) {
				this.show = !this.show
				console.log(index);
			},
			getFocusList() {
				uni.showLoading({
					title: this.$t('loading')
				});
				// let id = this.id

				this.$request.send(
					'vip/User/getFindContainerUser', {
						current: this.current_id,
						size: 6
					},
					data => {
						if (data.code == 1) {
							this.ContainerUser = data.data.list;
							console.log(this.ContainerUser);
						}
					}
				);
			},
			getUserActivity() {
				uni.showLoading({
					title: this.$t('loading')
				});
				// let id = this.id

				this.$request.send(
					'vip/User/getUserActivity', {
						current: 1,
						size: 6
					},
					data => {
						if (data.code == 1) {
							this.UserActivity = data.data.list;
						}
							this.activity_id = data.data.list.activity_id
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	// justify-content: flex-start;
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #f0f0f0;
		min-height: 100%;
		height: auto;
	}

	.title  /deep/ .values{
		font-size: 12px;
	}

	.cardA {
		background-color: #FFFFFF;
		margin-bottom: 100px;
		margin-top: 13px;

		.one-box {
			display: flex;
			justify-content: space-between;
			border-bottom: solid 1px #E8E8E8;

			.two-box {
				display: flex;
			
				.image {
					max-width: 45px;
					max-height: 45px;
					margin-top: 10px;
					margin-left: 15px;
					border-radius: 45rpx;
				}

				.content {
					margin-top: 21px;
					margin-left: 10px;
					min-width: 140px;
					height: 50px;
				}
			}

			.button {
				width: 100px;
				height: 100%;
				font-size: 12px;
				margin-top: 16px;
				color: #008DFF;
				// background-color: #30C58D;
				border: 1px solid #008DFF;
				border-radius: 6rpx;
			}	
		}

	}

	.act_item {
		background-color: #FFFFFF;
		border-radius: 10px;
		margin: 20rpx auto;
		display: flex;
		width: 93%;
		height: 90px;
		box-shadow:5px 5px 10px rgba(0,0,0,0.2);
		.image-style {
			max-width: 120px;
			max-height: 90px;
			border-radius: 10rpx 0 0 10rpx;
		}

		.right {
			margin: auto 18rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.tit {
				margin-bottom: 10rpx;
				font-weight: bold;
				font-size: 27rpx;
			}

			.info {
				image {
					width: 26rpx;
					height: 26rpx;
				}

				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 10rpx;
				}
			}

			.big-box {
				display: flex;
				
				.act-status {
					
					margin-top: 10rpx;
					padding-bottom: 5rpx;
					text-align: center;
					border-radius: 10rpx;
					width: 45px;
					.font {
						font-size: 24rpx;
						color: #FFFFFF;
					}
				}

				.mini-button {
					width: 80px;
					margin-top: 3px;
					font-size: 11px;
					margin-left: 80px;
					color: #008DFF;
					// font-color: #FFFFFF;
					// background-color: #30C58D;
					border: 1px solid #008DFF;
					border-radius: 4rpx;
				}
			}
		}
	}
</style>
