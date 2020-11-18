<template>
	<view>
		<view class="nav-out">
			<view class="box nav-top">
				<!-- 搜索框 -->
				<view class="nav-list">
					<view class="icon iconfont icon-saoma nav-icon-saoma"></view>
					<view class="nav-list-search">
						<view class="icon iconfont icon-ziyuan nav-search-ziyuan"></view>
						<input type="text" placeholder="请输入搜索关键词" class="nav-search-input" @input="showIcon" v-model="input" />
						<view class="icon iconfont icon-cuo nav-search-cuo" v-if="flag" @click="clearInput(input)"></view>
					</view>
					<view class="nav-list-button">
						<text @click="searchData">搜索</text>
					</view>
				</view>
				<!-- 顶部导航 -->
				<top-bars :topBars="topBars" :topIndex="topIndex" @toptap="toptab"></top-bars>
			</view>
		</view>

		<view class="box">
			<view class="scroll-Y-out">
				<scroll-view scroll-y="true" class="scroll-Y" :style="{height:Yheight+'px'}" @scrolltolower="onReach">
					<view class="newActivity">
						<image src="../../static/images/index/clock.ed00555d.gif"></image>
						<view class="newFont">长期报名测试活动</view>
						<view class="newNum">2</view>
						<view class="newIcon icon iconfont icon-icon-test3"></view>
					</view>
					<!-- 滑动导航 -->
					<tab-tap :getDataList="getDataList" :tabIndex="tabIndex" @tabtap="tabtap"></tab-tap>
					<!-- 活动列表 -->
					<view v-for="(item,index) in followDataList" :key="index" @click="activityList(index)">
						<scoll-view-item :item="item" :index="index" :curStartTime="item.details_activity_end_time_text"></scoll-view-item>
						<view>
						</view>
					</view>
					<view class="noDate" v-if="(followDataList.length) == 0 ? true : false">
						<image src="../../static/images/index/none.png"></image>
					</view>
					<!-- 上拉加载 -->
					<view class="isOver" v-if="flag2">没有更多数据了</view>

				</scroll-view>
			</view>
		</view>
	</view>
</template>

<!-- swiper-box
 list
 -->


<script>
	import topBars from "../../components/index/navTop.vue"
	import tabtap from "../../components/index/scrollViewX.vue"
	import scrollViewItem from "../../components/index/scrollViewItem.vue"
	export default {
		components: {
			"tab-tap": tabtap,
			"top-bars": topBars,
			"scoll-view-item": scrollViewItem,
		},
		data() {
			return {
				time:0,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				flag: false,
				flag2: false,
				input: '',
				topIndex: 0,
				tabIndex: 0,
				Yheight: 300,
				activity_type_id: -1,
				type_id: -2,
				search_key_word: '',
				current: 1,
				size:6,
				topBars: [{
						name: "全部",
						id: -2
					},
					{
						name: "报名中",
						id: 5
					},
					{
						name: "进行中",
						id: 1
					},
					{
						name: "预告",
						id: 4
					},
					{
						name: "历史",
						id: 2
					}
				],
				followDataList: [],
				getDataList: [],
				id: 0,
			}
		},
		onLoad() {
			uni.getSystemInfo({
					success: (res) => {
						let height = res.windowHeight - 95
						this.Yheight = height
					}
				}),
				this.getActivityType()
			this.getList()
		},
		onPullDownRefresh() {
			console.log("下拉刷新了")
			this.current = 1
			this.followDataList = []
			setTimeout(() => {
				this.getActivityType(() => {
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			//上拉加载
			onReach() {
				if (this.followDataList.length < this.current *this.size) return this.flag2 = true
				this.current++
				this.getNewList()

			},
			showIcon() {
				if (this.input == "") {
					this.flag = false
					uni.showToast({
						title: '请输入搜索关键词',
						icon: 'none',
						duration: 2000,

					})
				} else {
					this.flag = true
				}
			},
			clearInput(input) {
				this.input = ''
				this.flag = false
				this.search_key_word = ''
				uni.showToast({
					title: '请输入搜索关键词',
					icon: 'none',
					duration: 2000,

				})
			},
			toptab(pindex, pid) {
				this.topIndex = pindex
				this.type_id = pid
				this.getActivityType()
			},
			tabtap(bindex, bid) {
				this.tabIndex = bindex
				this.activity_type_id = bid
				this.getActivityType()
			},
			//搜索
			searchData() {
				this.search_key_word = this.input
				this.current = 1
				this.getActivityType()
				
			},

			//获取图文数据
			getActivityType() {
				this.$request.send(
					'vip/Activity/getList', {
						type_id: this.type_id,
						activity_type_id: this.activity_type_id,
						search_key_word: this.search_key_word,
						current: this.current,
						size:this.size

					},
					res => {
						if (res.code == 1) {
							this.followDataList = res.data.list
						}
					},
					null,
					false,
					'GET'
				);
			},
			getNewList() {
				this.$request.send(
					'vip/Activity/getList', {
						type_id: this.type_id,
						activity_type_id: this.activity_type_id,
						search_key_word: this.search_key_word,
						current: this.current,

					},
					res => {
						if (res.code == 1) {
							console.log(res);
							this.followDataList = [...this.followDataList, ...res.data.list]
						}
					},
					null,
					false,
					'GET'
				);
			},
			//获取滑动按钮
			getList() {
				this.$request.send(
					'vip/ActivityType/getList', {

					},
					res => {
						if (res.code == "success") {
							this.getDataList = res.data
							// console.log(res)
						}
					},
					null,
					false,
					'GET'
				);
			},

			activityList(index) {
				let id = this.followDataList[index].id
				// console.log()
				uni.navigateTo({
					url: './activityList?id=' + id
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 700rpx;
		margin: 0 auto;
	}

	.nav-out {
		width: 100%;
		height: 89px;
		background-color: #FFFFFF;

		.nav-top {


			// 搜索框
			.nav-list {
				display: flex;
				width: 100%;
				height: 44px;
				line-height: 44px;
				border-bottom: 1px solid #D6D6D6;

				.nav-icon-saoma {
					font-size: 26px;
					color: #7F7F7F;
					margin-right: 10px;
				}

				.nav-list-search {
					margin: auto 0;
					display: flex;
					width: 515rpx;
					height: 34px;
					line-height: 34px;
					background-color: #F7F9F8;
					border-radius: 17px;

					.nav-search-ziyuan {
						font-size: 15px;
						margin: 0 10px 0 10px;
						color: #7F7F7F;
					}

					.nav-search-input {
						width: 400rpx;
						height: 24px;
						line-height: 24px;
						margin: auto 0;
						font-size: 15px;
					}

					.nav-search-cuo {
						font-size: 15px;
						color: #7F7F7F;
						width: 40px;
						height: 34px;
						text-align: center;
					}
				}

				.nav-list-button {
					margin-left: 13px;
					width: 40px;
					height: 44px;
					line-height: 44px;
					font-size: 15px;
					color: #343435;
					text-align: center;
				}
			}
		}
	}


	// 上下滑动
	.scroll-Y-out {
		.scroll-Y {
			width: 100%;
			.newActivity{
				position: relative;
				display: flex;
				align-items: center;
				height: 40px;
				background-color: #008DFF;
				margin: 5px 5px 10px;
				padding: 0px 15px;
				border-radius: 5px;
				image{
					height: 24px;
					width: 24px;
					border-radius: 50%;
				}
				.newFont{
					float: left;
					font-size: 14px;
					color:#FFFFFF;
					margin-left: 10px;
				}
				.newNum{
					position: absolute;
					top: 8px;
					right: 27px;
					width: 21px;
					height: 21px;
					line-height: 21px;
					border-radius: 50%;
					background-color: #FFFFFF;
					color: #F08888;
					font-size: 12px;
					text-align: center;
				
				}
				.newIcon{
					position: absolute;
					top: 8px;
					right: 10px;
					font-size: 18px;
					color: #FFFFFF;
				}
			}
			.noDate{
				width: 100%;
				image{
					width: 100%;
				}
			}
			.isOver {
				width: 100%;
				height: 45px;
				margin-top: 15px;
				background-color: #F2F2F2;
				line-height: 45px;
				text-align: center;
				font-size: 14px;
				color: #000000;
			}
		}
	}
</style>
